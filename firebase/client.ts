import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";

const firebaseConfig = {
    apiKey: "AIzaSyDeT3DgOkSe0PsJm8xu9lueT4CQz_EGirE",
    authDomain: "predate-032.firebaseapp.com",
    projectId: "predate-032",
    storageBucket: "predate-032.appspot.com",
    messagingSenderId: "590392707099",
    appId: "1:590392707099:web:906574ccb256290add10be",
    measurementId: "G-FTVDCJRC4X"
};

const app = initializeApp(firebaseConfig);

// 必要な機能をインポート
/*
import { getAnalytics } from 'firebase/analytics';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import { getAuth } from 'firebase/auth';
import { getFunctions } from 'firebase/functions';

if (!getApps()?.length) {
  // Firebaseアプリの初期化
  initializeApp(firebaseConfig);
}

// 他ファイルで使うために機能をエクスポート

export const analytics = getAnalytics();
export const db = getFirestore();
export const storage = getStorage();
export const auth = getAuth();
export const funcions = getFunctions();*/