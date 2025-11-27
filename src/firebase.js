import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAbigWHtFf10leF7ybYzUr-rAHhfA1BoGg",
    authDomain: "freelance-os-87fbe.firebaseapp.com",
    projectId: "freelance-os-87fbe",
    storageBucket: "freelance-os-87fbe.firebasestorage.app",
    messagingSenderId: "370765229020",
    appId: "1:370765229020:web:e3d63e273afeda0df73d19"
};

import { GoogleAuthProvider } from "firebase/auth";

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider();
export const db = getFirestore(app);
