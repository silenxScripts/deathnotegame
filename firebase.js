import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyDerwTqTbt6cls5d7YzzZpS6Ku-0gSt18c",
    authDomain: "stackmax-66dcf.firebaseapp.com",
    projectId: "stackmax-66dcf",
    storageBucket: "stackmax-66dcf.appspot.com",
    messagingSenderId: "712298307533",
    appId: "1:712298307533:web:6c47dd136695ebdf51ee84",
    measurementId: "G-SY45XXCX2J"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)