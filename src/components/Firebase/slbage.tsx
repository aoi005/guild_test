// useFirestoreData.ts

import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore';

// Firebaseの設定と型定義

interface FirestoreData {
  id: string;
  title: string;
  name: string;
  tag : string;
  detail: string;
}

const firebaseConfig = {
    apiKey: "AIzaSyAL2k3eiGWuVfvxZd2-1QrzPZzYUunPdSU",
    authDomain: "conpas-93e54.firebaseapp.com",
    projectId: "conpas-93e54",
    storageBucket: "conpas-93e54.appspot.com",
    messagingSenderId: "989467913511",
    appId: "1:989467913511:web:30efac48507ccec4768d02",
    measurementId: "G-5JSSYVBJR0"
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