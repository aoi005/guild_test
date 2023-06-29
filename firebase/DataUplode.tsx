//import { useFirestoreUpload } from './useFirestoreUpload';

import React, { useState } from 'react';

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from 'firebase/firestore';


interface TagFields {
  Able: boolean;
  Bravo: boolean;
  Charley: boolean;
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


  export function useFirestoreUpload() { //データ投稿側関数
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [formData, setFormData] = useState<FirestoreData>({
      id: '',
      title: '',
      author: '',
      price: 0,
      tag: { Able: false, Bravo: false, Charley: false }
    });

    const uploadData = async (formData: FirestoreData) => {
      try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
  
        await setDoc(doc(db, 'books', formData.id), {
            title: formData.title,
            author: formData.author,
            price: formData.price,
            tag: formData.tag,
          });
  
        setUploadStatus('Success');
      
        setFormData((prevData) => ({
      ...prevData,
      id: '',
      title: '',
      author: '',
      price: 0,
      tag: { Able: false, Bravo: false, Charley: false }
    }));
      } catch (error) {
        setUploadStatus('Error');
        console.error('Error uploading document:', error);
      }
    };
  
    return { formData, setFormData, uploadData, uploadStatus };
  }


export default function UploadForm() {  //フォーム入力側関数(onsubmitで送信)

  const { uploadData, uploadStatus } = useFirestoreUpload();
  const [formData, setFormData] = useState<FirestoreData>({
    id: '',
    title: '',
    author: '',
    price: 0,
    tag: { Able: false, Bravo: false, Charley: false },
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData(formData);
    setFormData((prevData) => ({
      ...prevData,
      id: '',
      title: '',
      author: '',
      price: 0,
      tag: { Able: false, Bravo: false, Charley: false }
    }));
  };

  const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, checked } = e.target;

    setFormData((prevData) => ({
      ...prevData,
      tag: {
        ...prevData.tag,
        [name]: checked,
      },
    }));
  };

  return (
    <div>
      <h2>Data Upload</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          placeholder="Document ID"
        />
        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="Title"
        />
        <input
          type="text"
          value={formData.author}
          onChange={(e) => setFormData({ ...formData, author: e.target.value })}
          placeholder="Author"
        />
        <input
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: Number(e.target.value) })}
          placeholder="Price"
        />

      <label>
          Able:
          <input
            type="checkbox"
            name="Able"
            checked={formData.tag.Able}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Bravo:
          <input
            type="checkbox"
            name="Bravo"
            checked={formData.tag.Bravo}
            onChange={handleCheckboxChange}
          />
        </label>
        <label>
          Charley:
          <input
            type="checkbox"
            name="Charley"
            checked={formData.tag.Charley}
            onChange={handleCheckboxChange}
          />
        </label>

        <button type="submit">データを追加/更新</button>
      </form>
      <br></br>
      {uploadStatus === 'Success' && <p>Upload successful!</p>}
      {uploadStatus === 'Error' && <p>Upload failed!</p>}
    </div>
  );
}