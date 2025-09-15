// src/firebase.jsx
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";

// Your Firebase configuration object
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCz-Bzn-Cb6iI7aqVs0wg_1qVxPiZmxtMk",
  authDomain: "timelinex1-15907.firebaseapp.com",
  projectId: "timelinex1-15907",
  storageBucket: "timelinex1-15907.firebasestorage.app",
  messagingSenderId: "282410845236",
  appId: "1:282410845236:web:13822b805b374dd7043661"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Set up authentication
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// Function to handle Google Sign-In
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // contains user info like email, name, etc.
  } catch (error) {
    console.error("Google Sign-in Error code:", error.code);
    console.error("Google Sign-in Error message:", error.message);
    throw error;
  }
};
