import { initializeApp, getApps, getApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const apiKey = process.env.NEXT_PUBLIC_FIREBASE_API_KEY;
const hasValidKey = apiKey && typeof apiKey === "string" && apiKey.length > 10 && apiKey !== "demo-key";

const firebaseConfig = {
  apiKey: hasValidKey ? apiKey : "AIzaSyDummyKeyForBuildPrerender12345678",
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN || "sololeveling-demo.firebaseapp.com",
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID || "sololeveling-demo",
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET || "sololeveling-demo.appspot.com",
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID || "123456789012",
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID || "1:123456789012:web:abcdef1234567890"
};

let app: any;
let auth: any;
let db: any;

try {
  app = !getApps().length ? initializeApp(firebaseConfig) : getApp();
  auth = getAuth(app);
  db = getFirestore(app);
} catch (err) {
  console.warn("Firebase SSR/offline fallback active:", err);
  auth = {
    onAuthStateChanged: (cb: any) => { cb(null); return () => {}; },
    currentUser: null
  };
  db = {};
}

export { auth, db };
export default app;
