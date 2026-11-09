/* Salami Khata online account settings.
   Leave this as null and the app works in guest mode only.
   After creating the Firebase project, replace null with the config object
   from Firebase console → Project settings → Your apps → Web app, for example:

   window.SALAMI_FIREBASE_CONFIG = {
     apiKey: "...",
     authDomain: "your-project.firebaseapp.com",
     projectId: "your-project",
     storageBucket: "your-project.appspot.com",
     messagingSenderId: "...",
     appId: "..."
   };

   These values are not secret: they identify the project, and the Firestore
   security rules (firestore.rules) are what keep each person's data private. */
window.SALAMI_FIREBASE_CONFIG = null;
