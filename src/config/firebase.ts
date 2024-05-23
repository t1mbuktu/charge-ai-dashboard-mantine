import { initializeApp } from "firebase/app";
import { GoogleAuthProvider, getAuth } from "firebase/auth";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
  apiKey: "AIzaSyB3DU6Vembf_RjL_XLrqwMrfwwg9pVKaXE",
  authDomain: "chargeai-a7e25.firebaseapp.com",
  projectId: "chargeai-a7e25",
  storageBucket: "chargeai-a7e25.appspot.com",
  messagingSenderId: "834968680176",
  appId: "1:834968680176:web:1461a6cac2db080b49f435",
  measurementId: "G-ZXXGDTNHTZ"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

export const db = getFirestore(app);
