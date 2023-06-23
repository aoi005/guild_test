// Import the functions you need from the SDKs you need

import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";


// TODO: Add SDKs for Firebase products that you want to use

// https://firebase.google.com/docs/web/setup#available-libraries


// Your web app's Firebase configuration

const firebaseConfig = {

    apiKey: "AIzaSyB5IoBbMy9y-PukY9JT--mgjnl6f780VT8",
  
    authDomain: "fir-nodejstest-4913f.firebaseapp.com",
  
    projectId: "fir-nodejstest-4913f",
  
    storageBucket: "fir-nodejstest-4913f.appspot.com",
  
    messagingSenderId: "988931382342",
  
    appId: "1:988931382342:web:064f0fad4f651c4de3be47"
  
  };
  


// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default db;
