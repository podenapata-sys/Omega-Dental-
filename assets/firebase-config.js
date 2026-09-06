/* Omega Dental — Firebase web config.
   These web keys are safe to be public; data access is controlled by Firestore
   security rules (see dashboard setup notes). Leave apiKey empty to disable
   Firebase entirely (booking still works via WhatsApp; dashboard works locally). */
window.OMEGA_FB = {
  apiKey: "AIzaSyAFZ5H71ER66H7T_L4d_QX7x6c7-kBHQYg",
  authDomain: "omega-dendal.firebaseapp.com",
  projectId: "omega-dendal",
  storageBucket: "omega-dendal.firebasestorage.app",
  messagingSenderId: "1086374684130",
  appId: "1:1086374684130:web:49b1f449211609b273c5bb"
};

/* App Check reCAPTCHA SITE KEY. Public by design — it ships to every visitor's
   browser, exactly like apiKey above. The matching SECRET key lives only in the
   Firebase console and must never appear in this repo.

   This is the CLASSIC reCAPTCHA v3 key, and it is paired with ReCaptchaV3Provider
   in assets/booking-cloud.js. The two must match: a reCAPTCHA ENTERPRISE key needs
   ReCaptchaEnterpriseProvider instead, and mixing them fails every token — silently,
   because omegaSaveBooking swallows its errors, so bookings would just stop arriving
   with nothing shown on screen. Enterprise is also a billed Cloud product; the clinic
   is on Spark and does not need it.

   The key's domain list (google.com/recaptcha/admin) must include every host the site
   is served from. It has podenapata-sys.github.io today — ADD THE NEW DOMAIN THERE
   BEFORE the migration, or every booking dies the moment the address changes.

   Leave empty to skip App Check entirely (then App Check must be "Unenforce" in the
   console). Turn enforcement on only after this key is live and Firebase Console ->
   App Check -> Request metrics shows verified requests arriving. */
window.OMEGA_APPCHECK_KEY = "6LckIK0tAAAAAMcb1q4NeL63HOwEfyw1PsYRHULX";

/* Google OAuth Web client ID for the "Backup to Drive" button (drive.file scope only —
   the app can only touch files it creates). Leave empty to hide the Drive button. */
window.OMEGA_GOOGLE_CLIENT_ID = "1086374684130-lbbk3nm75ekp9alubf211lvb162m0i3l.apps.googleusercontent.com";

/* Booking alerts by email. Paste the Web app URL from tools/booking-alert.gs, and
   the same token you set inside that script. Leave OMEGA_ALERT_URL empty to turn
   alerts off — bookings still save to the dashboard and still open WhatsApp. */
window.OMEGA_ALERT_URL   = "https://script.google.com/macros/s/AKfycbzvljB_AMWHtE6-EP8fw1Rbtj7hNnvqf3MRTzs27Oe6kfwjCMHRZnKowVbB2X2reN8e/exec";
window.OMEGA_ALERT_TOKEN = "Omega.JS";
