// src/firebase.jsx
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
  apiKey: "AIzaSyAPdLZrplZeK3cYxewj6aldtIzMIfXJSTw",
  authDomain: "timelinex-160e5.firebaseapp.com",
  projectId: "timelinex-160e5",
  storageBucket: "timelinex-160e5.appspot.com",
  messagingSenderId: "890362794681",
  appId: "1:890362794681:web:af5c54af819c582e4e0168",
  measurementId: "G-0G1DYLBB05",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Auth + Google
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();

// 🔥 Function to handle Google login
export const signInWithGoogle = async () => {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    return result.user; // contains email, name, photo, uid, etc.
  } catch (error) {
    console.error("Google Sign-in Error:", error);
    throw error;
  }
};

// Optional analytics
let analytics;
if (typeof window !== "undefined") {
  analytics = getAnalytics(app);
}
export { analytics };
