// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxR88M8Ei8x_sILBVt2YI61MuZfJf2emk",
  authDomain: "budgeting-app-1253f.firebaseapp.com",
  projectId: "budgeting-app-1253f",
  storageBucket: "budgeting-app-1253f.appspot.com",
  messagingSenderId: "135191628078",
  appId: "1:135191628078:web:50562de5b3fd8295fad2bf",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initiliaze Cloud Firestore
export const db = getFirestore();
