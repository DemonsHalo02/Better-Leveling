import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY || "AIzaSyDC6ewPj9EWsP3Hmz0cUv_Hn4j3fE3fkR8",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "nick-crosson-art.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "nick-crosson-art",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "nick-crosson-art.firebasestorage.app",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "85362447083",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:85362447083:web:ee153196657f9e346324ae"
};

let app: any;
let auth: any;
let db: any;
let storage: any;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
  storage = getStorage(app);
} catch (err) {
  console.warn("Firebase SSR/offline fallback active:", err);
  auth = {
    onAuthStateChanged: (cb: any) => { cb(null); return () => {}; },
    currentUser: null
  };
  db = {};
  storage = null;
}

export { auth, db, storage };
export default app;
