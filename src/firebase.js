import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyC7pPHat89pfJclL8iGRy7pMSY9rKAYHMw",
  authDomain: "feedback-form-12305.firebaseapp.com",
  projectId: "feedback-form-12305",
  storageBucket: "feedback-form-12305.appspot.com",
  messagingSenderId: "405936073090",
  appId: "1:405936073090:web:e8ae96d73615553a6bc79b",
  measurementId: "G-QQYLB5JL45"
};



// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
