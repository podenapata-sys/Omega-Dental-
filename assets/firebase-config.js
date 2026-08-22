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

/* Google OAuth Web client ID for the "Backup to Drive" button (drive.file scope only —
   the app can only touch files it creates). Leave empty to hide the Drive button. */
window.OMEGA_GOOGLE_CLIENT_ID = "1086374684130-lbbk3nm75ekp9alubf211lvb162m0i3l.apps.googleusercontent.com";

