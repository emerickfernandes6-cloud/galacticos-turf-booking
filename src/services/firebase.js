import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyBwIHjKQEkNbWTbegIpBaPJ4hJW40Aih9U",
  authDomain: "galacticos-turf.firebaseapp.com",
  projectId: "galacticos-turf",
  storageBucket: "galacticos-turf.firebasestorage.app",
  messagingSenderId: "1052144912109",
  appId: "1:1052144912109:web:dd7ec61134e3d9cb1e6ee4",
};

const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);