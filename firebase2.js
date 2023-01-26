import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore'

const firebaseConfig = {
    apiKey: "AIzaSyCJ17IaX2crOgn1QjbA66BKM-Ly5wwh50E",
    authDomain: "dewath-nwote.firebaseapp.com",
    projectId: "dewath-nwote",
    storageBucket: "dewath-nwote.appspot.com",
    messagingSenderId: "702853223512",
    appId: "1:702853223512:web:b5b27fe472d4ea9415e62d",
    measurementId: "G-NBK7JL9D23"
};

export const app = initializeApp(firebaseConfig);
export const db = getFirestore(app)