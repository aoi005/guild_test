// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from 'firebase/firestore';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyDeT3DgOkSe0PsJm8xu9lueT4CQz_EGirE",
  authDomain: "predate-032.firebaseapp.com",
  projectId: "predate-032",
  storageBucket: "predate-032.appspot.com",
  messagingSenderId: "590392707099",
  appId: "1:590392707099:web:906574ccb256290add10be",
  measurementId: "G-FTVDCJRC4X"
};

export default firebaseConfig;

// Initialize Firebase
const app = initializeApp(firebaseConfig);
//const analytics = getAnalytics(app);

export const db = getFirestore(app);
//export default db;
