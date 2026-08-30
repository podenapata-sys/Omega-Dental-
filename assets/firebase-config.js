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

/* App Check reCAPTCHA v3 SITE KEY — only needed if App Check enforcement is ON.
   This is NOT part of the Firebase config block above: get it from
   Firebase Console -> Build -> App Check -> Apps -> register the web app with
   reCAPTCHA v3. It looks like "6LcAbCdEf...". Leave empty to skip App Check
   entirely (then App Check must be set to "Unenforce" in the console). */
window.OMEGA_APPCHECK_KEY = "";

/* Google OAuth Web client ID for the "Backup to Drive" button (drive.file scope only —
   the app can only touch files it creates). Leave empty to hide the Drive button. */
window.OMEGA_GOOGLE_CLIENT_ID = "1086374684130-lbbk3nm75ekp9alubf211lvb162m0i3l.apps.googleusercontent.com";

/* Booking alerts by email. Paste the Web app URL from tools/booking-alert.gs, and
   the same token you set inside that script. Leave OMEGA_ALERT_URL empty to turn
   alerts off — bookings still save to the dashboard and still open WhatsApp. */
window.OMEGA_ALERT_URL   = "";
window.OMEGA_ALERT_TOKEN = "";
