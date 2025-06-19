// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCKW-WUC57Wa-JSrbikXQNHaXc5w99Kzso",
  authDomain: "test-af901.firebaseapp.com",
  projectId: "test-af901",
  storageBucket: "test-af901.firebasestorage.app",
  messagingSenderId: "305242945053",
  appId: "1:305242945053:web:681ce178cd638cd09678f4",
  measurementId: "G-7VKXPK3STD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };

export default defineNuxtPlugin(() => {
  // Plugin setup if needed
});
