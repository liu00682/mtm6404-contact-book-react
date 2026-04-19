import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyApQY7xnn81Uaci9aYtnrZ2PTo8EHVVeHo",
  authDomain: "contact-book-a0415.firebaseapp.com",
  projectId: "contact-book-a0415",
  storageBucket: "contact-book-a0415.firebasestorage.app",
  messagingSenderId: "981473399943",
  appId: "1:981473399943:web:0c402880e0376efa201422",
};

const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;