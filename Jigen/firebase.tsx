// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
/*const firebaseConfig = {
  apiKey: "AIzaSyAL2k3eiGWuVfvxZd2-1QrzPZzYUunPdSU",
  authDomain: "conpas-93e54.firebaseapp.com",
  projectId: "conpas-93e54",
  storageBucket: "conpas-93e54.appspot.com",
  messagingSenderId: "989467913511",
  appId: "1:989467913511:web:30efac48507ccec4768d02",
  measurementId: "G-5JSSYVBJR0"
};/*Aoi*/
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
let analytics;

if (typeof window !== "undefined") {
  // クライアントサイドのみで実行されるコード
  analytics = getAnalytics(app);
}

export default db;