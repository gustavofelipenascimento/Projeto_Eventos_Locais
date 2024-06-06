import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
    apiKey: "AIzaSyDbgXFy579lJlPCtdNKzqPdbOXz2J4Om-M",
    authDomain: "evento-c272f.firebaseapp.com",
    projectId: "evento-c272f",
    storageBucket: "evento-c272f.appspot.com",
    messagingSenderId: "719602703618",
    appId: "1:719602703618:web:77546c3c2630a546f1f61b",
    measurementId: "G-PEW134VTPQ"
  };
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
