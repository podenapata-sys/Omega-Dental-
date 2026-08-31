/* Omega Dental — send website enquiries to Firestore so they appear live in the
   admin dashboard's "Website Bookings" panel.

   This used to be an inline module in book.html, which meant only the booking
   page could reach Firestore. The homepage's "Request a Free Callback" form had
   nowhere to put the number it collected, so every callback request was lost the
   moment the visitor closed WhatsApp. Sharing one file gives both pages the same
   path with no duplicated bootstrap to drift apart.

   Callbacks are written to the SAME `bookings` collection as appointments, on
   purpose: the published Firestore rules already allow a public create there and
   nowhere else, and the dashboard already renders that collection. A separate
   collection would need new rules published by the owner and new dashboard code.
   `kind` tells the two apart for anyone querying later.

   Fails silently throughout. If Firebase is unreachable, blocked, or not yet
   configured, the WhatsApp hand-off still happens exactly as before. */
(async () => {
  try {
    const cfg = window.OMEGA_FB;
    if (!cfg || !cfg.apiKey) return;

    const { initializeApp } = await import("https://www.gstatic.com/firebasejs/12.18.0/firebase-app.js");
    const { getFirestore, collection, addDoc, serverTimestamp } =
      await import("https://www.gstatic.com/firebasejs/12.18.0/firebase-firestore.js");

    const fbApp = initializeApp(cfg);

    // App Check (only if a reCAPTCHA v3 site key is configured) — must come before Firestore
    const acKey = (window.OMEGA_APPCHECK_KEY || "").trim();
    if (acKey) {
      try {
        const acMod = await import("https://www.gstatic.com/firebasejs/12.18.0/firebase-app-check.js");
        acMod.initializeAppCheck(fbApp, {
          provider: new acMod.ReCaptchaV3Provider(acKey),
          isTokenAutoRefreshEnabled: true
        });
      } catch (e) { /* App Check unavailable — enforcement must be off */ }
    }

    const db = getFirestore(fbApp);

    window.omegaSaveBooking = async (data) => {
      try {
        await addDoc(collection(db, "bookings"), {
          name: data.name || "", phone: data.phone || "", service: data.service || "",
          date: data.date || "", dateISO: data.dateISO || "",
          time: data.time || "", note: data.msg || "",
          emergency: !!data.emerg, status: "new", source: "website",
          kind: data.kind || "appointment",
          createdAt: serverTimestamp()
        });
      } catch (e) { /* offline / rules — the enquiry already went via WhatsApp */ }
    };
  } catch (e) { /* SDK blocked — everything still works via WhatsApp */ }
})();
