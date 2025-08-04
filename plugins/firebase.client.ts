import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "XXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXXX",
  authDomain: "database-name-default-rtdb.firebaseapp.com",
  projectId: "database-name-default-rtdb",
  storageBucket: "databasefornameruiforvue.appspot.com",
  messagingSenderId: "111111111111",
  appId: "1:111111111111:web:abcdefghjklmnopqrstuvw"
};

const app = getApps().length ? getApp() : initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);

export { app, auth, db, storage }; // <-- Export the instances

// If you still want to provide for Nuxt:
export default defineNuxtPlugin((nuxtApp) => {
  nuxtApp.provide("firebaseApp", app);
  nuxtApp.provide("firebaseAuth", auth);
  nuxtApp.provide("firebaseDb", db);
  nuxtApp.provide("firebaseStorage", storage);
});