const { initializeApp } = require('firebase/app');
const { getFirestore, doc, setDoc } = require('firebase/firestore');

const firebaseConfig = {
  apiKey: "AIzaSyDC6ewPj9EWsP3Hmz0cUv_Hn4j3fE3fkR8",
  authDomain: "nick-crosson-art.firebaseapp.com",
  projectId: "nick-crosson-art",
  storageBucket: "nick-crosson-art.firebasestorage.app",
  messagingSenderId: "85362447083",
  appId: "1:85362447083:web:ee153196657f9e346324ae"
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

async function testFirebase() {
  try {
    const docRef = doc(db, 'hunters', 'test@example.com');
    await setDoc(docRef, { test: true });
    console.log("Write succeeded!");
  } catch (error) {
    console.error("Write failed:", error);
  }
}

testFirebase();
