//import { useFirestoreUpload } from './useFirestoreUpload';

import React, { useState } from 'react';

import { initializeApp } from "firebase/app";
import { getFirestore, doc, setDoc } from 'firebase/firestore';


interface TagFields {
  [tagName: string]: boolean;
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


const tags: string[] = ["Able", "Bravo", "Charlie", "Delta"]; 
  // タグ名のリスト。ここを編集するだけで数、名前を変更可能。

const initialTags: TagFields = {
  Able: false,
  Bravo: false,
  Charley: false,
  Delta: false,
  // 追加したタグにも初期値を設定してください。
};


  export function useFirestoreUpload() { //データ投稿側関数
    const [uploadStatus, setUploadStatus] = useState<string>('');
    const [formData, setFormData] = useState<FirestoreData>({
      id: '',
      title: '',
      author: '',
      price: 0,
      tag:initialTags,
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
      tag: initialTags,
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
    tag: initialTags,
  });

  

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData(formData);
    setFormData({
      id: '',
      title: '',
      author: '',
      price: 0,
      tag: {},
    });
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
        {Object.entries(formData).map(([key, value]) => {
          if (key === "tag") {
            return (
              <div key={key}>
                {tags.map((tagName) => (
                  <label key={tagName}>
                    {tagName}:
                    <input
                      type="checkbox"
                      name={tagName}
                      checked={formData.tag[tagName] || false}
                      onChange={handleCheckboxChange}
                    />
                  </label>
                ))}
              </div>
            );
          }

          return (
            <input
              key={key}
              type={typeof value === "number" ? "number" : "text"}
              value={value}
              onChange={(e) => setFormData({ ...formData, [key]: e.target.value })}
              placeholder={key}
            />
          );
        })}

        <button type="submit">データを追加/更新</button>
      </form>
      <br />
      {uploadStatus === 'Success' && <p>Upload successful!</p>}
      {uploadStatus === 'Error' && <p>Upload failed!</p>}
    </div>
  );
}
