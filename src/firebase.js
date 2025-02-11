import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
    apiKey: "AIzaSyAd64o_qFunGUi3-rQ0uUlVzHu1SJhk5lY",
    authDomain: "to-do-list-auth-c58d3.firebaseapp.com",
    projectId: "to-do-list-auth-c58d3",
    storageBucket: "to-do-list-auth-c58d3.firebasestorage.app",
    messagingSenderId: "978403657505",
    appId: "1:978403657505:web:49d080cf9437206703a060",
    measurementId: "G-YHFZJ5KYJZ"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const googleProvider = new GoogleAuthProvider(app);
export const db = getFirestore(app);