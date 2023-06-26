import { initializeApp } from "firebase/app";
import { useState } from 'react';
import { getFirestore, doc, setDoc } from 'firebase/firestore';

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


export function useFirestoreUpload() {
    const [uploadStatus, setUploadStatus] = useState<string>('');
  
    const uploadData = async (formData: FirestoreData) => {
      try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
  
        await setDoc(doc(db, 'books', formData.id), {
            title: formData.title,
            author: formData.author,
            price: formData.price,
          });
  
        setUploadStatus('Success');
      } catch (error) {
        setUploadStatus('Error');
        console.error('Error uploading document:', error);
      }
    };
  
    return { uploadData, uploadStatus };
  }