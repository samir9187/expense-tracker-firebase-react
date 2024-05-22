// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyADAloJJN3gr1mNJp3uOOJ5p6huz1xaVo8",
  authDomain: "reactchat-152f4.firebaseapp.com",
  projectId: "reactchat-152f4",
  storageBucket: "reactchat-152f4.appspot.com",
  messagingSenderId: "211471182001",
  appId: "1:211471182001:web:af70de93210fb7023d1a90",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const provider = new GoogleAuthProvider();
export const db = getFirestore(app);

// firebase login
// firebase init
// firebase deploy
