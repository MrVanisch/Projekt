// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';
import { getStorage } from 'firebase/storage';
const firebaseConfig = {
  apiKey: "AIzaSyALr1RncEi5GeBy4Fd7NSYMPoG6_RBOtOU",
  authDomain: "rapmate-d3d1a.firebaseapp.com",
  projectId: "rapmate-d3d1a",
  storageBucket: "rapmate-d3d1a.appspot.com",
  messagingSenderId: "390504904808",
  appId: "1:390504904808:web:00c1e1b8f03452570663dd",
  measurementId: "G-QCCZYH2NMG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);
const db = getFirestore(app);
const storage = getStorage(app);
export { auth, db, analytics,storage };