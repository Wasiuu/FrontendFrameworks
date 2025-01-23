// firebase.js
import { initializeApp } from 'firebase/app';
import { getFirestore } from 'firebase/firestore';
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
    apiKey: "AIzaSyCR9zDCQ0gg9M8hln8kbUNG7FHojLZls2g",
    authDomain: "frontendapp - 1c63a.firebaseapp.com",
    projectId: "frontendapp-1c63a",
    storageBucket: "frontendapp-1c63a.firebasestorage.app",
    messagingSenderId: "725446194373",
    appId: "1:725446194373:web:eb1c98752279ba8a1a2cac",
    measurementId: "G-Y5WB1JE9EV"
};

const app = initializeApp(firebaseConfig);
export const db = getFirestore(app);
export const auth = getAuth(app);
