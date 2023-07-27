import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
  apiKey: "AIzaSyArI5idod8yviqjsXcfwBZM2-6rASod_M0",
  authDomain: "feedback-form-it.firebaseapp.com",
  projectId: "feedback-form-it",
  storageBucket: "feedback-form-it.appspot.com",
  messagingSenderId: "68027050672",
  appId: "1:68027050672:web:1dfa36cc5546d51da56975",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const db = getFirestore(app);
