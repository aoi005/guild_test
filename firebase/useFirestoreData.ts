// useFirestoreData.ts

import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebaseの設定と型定義

interface FirestoreData {
  id: string;
  title: string;
  author: string;
  price: number;
}

const firebaseConfig = {
    apiKey: "AIzaSyDeT3DgOkSe0PsJm8xu9lueT4CQz_EGirE",
    authDomain: "predate-032.firebaseapp.com",
    projectId: "predate-032",
    storageBucket: "predate-032.appspot.com",
    messagingSenderId: "590392707099",
    appId: "1:590392707099:web:906574ccb256290add10be",
    measurementId: "G-FTVDCJRC4X"
};

export function useFirestoreData() {
  const [data, setData] = useState<FirestoreData[]>([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const fetchData = async () => {
      const snapshot = await getDocs(collection(db, 'books'));
      const firestoreData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }) as FirestoreData);
      setData(firestoreData);
    };

    fetchData();
  }, []);

  return data;
}