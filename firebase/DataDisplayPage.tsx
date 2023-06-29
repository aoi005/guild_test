// DataDisplayPage.tsx

/* import React from 'react';  //コンポーネント分割後
import { useFirestoreData } from './useFirestoreData';
import { initializeApp } from "firebase/app";
import { useEffect, useState } from 'react';
import { getFirestore, collection, getDocs } from 'firebase/firestore'; */

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import { TagDisplay } from './tagsort'

// Firebaseの設定と型定義

interface TagFields {
  [key: string]: boolean;
}

interface FirestoreData {
  id: string;
  title: string;
  author: string;
  price: number;
  tag: TagFields;
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
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const fetchedData: FirestoreData[] = [];

        querySnapshot.forEach((doc) => {
          const { title, author, price, tag } = doc.data();
          fetchedData.push({
            id: doc.id,
            title,
            author,
            price,
            tag,
          });
        });

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData();
  }, []);

  return data;
}

export default function DataDisplayPage() {
  const data = useFirestoreData();

  return (
    <div>
      <h1>Data Display</h1>
      
      {data.map((item) => (
        <ul className='itemflex' key={item.id}>
          <li>
            {item.id}
            <div>
              <a>
                Title: {item.title} / Author: {item.author} / Price: {item.price}
              </a>
            </div>
            <TagDisplay tag={item.tag} /> {/* ここだけちょっと別処理します。tagsort.tsx参照の事。 */}
          </li>
        </ul>
      ))}
      
    </div>
  );
}