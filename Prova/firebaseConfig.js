import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth"
import { getFirestore } from "firebase/firestore"

const firebaseConfig = {

    apiKey: "AIzaSyCWT3dze0yL26jb0qg-ib0y07zzn7tHUJY",
    authDomain: "prova-mat.firebaseapp.com",
    projectId: "prova-mat",
    storageBucket: "prova-mat.appspot.com",
    messagingSenderId: "93493897640",
    appId: "1:93493897640:web:4c2a8439505384744ad59d"

};


// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Exports auth and firestore
export const app_auth = getAuth(app);
export const app_db = getFirestore(app);

