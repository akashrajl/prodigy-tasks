// src/firebase/config.ts
import { initializeApp, getApps } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCp3jhgHeTn6TpllFaLm6AvmM5X3bX5k7g",
  authDomain: "prodigy-ad.firebaseapp.com",
  projectId: "prodigy-ad",
  storageBucket: "prodigy-ad.appspot.com", // Corrected to standard format
  messagingSenderId: "774432897750",
  appId: "1:774432897750:web:e859bfc44b7ae005f72777",
  measurementId: "G-HCBV7FTBKJ"
};

// Initialize Firebase, checking to prevent reinitialization in Next.js
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const auth = getAuth(app);

export { app, auth };