import React, { useState } from 'react';
import { useFirestoreUpload } from './Dataupload';
import styles from "./index.module.scss";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';



interface FirestoreData {
  id: string;
  detail: string;
  strT:number;
  time: Date;
  limit:Date;
}


const currentTime = new Date();
const limitTime = new Date(currentTime.getTime()+(14 * 24 * 60 * 60 * 1000));



export default function UploadForm() {
  const { uploadData, uploadStatus } = useFirestoreUpload();
  const [formData, setFormData] = useState<FirestoreData>({
    id: '',
    detail: '',
    strT:currentTime.getTime(),
    time: currentTime,
    limit:limitTime,
    // time: new Date(),
  });
  console.log(formData.time)

  const [formErrors, setFormErrors] = useState<string[]>([]); //ここでエラー内容の配列定義。

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const requiredFields = ['detail'];
    const errors: string[] = [];

    requiredFields.forEach((field) => {
      if (!formData[field as keyof FirestoreData]) {
        errors.push(field);
      }
    });
  
    if (errors.length > 0) {
      alert(`次の内容は必須項目です。: ${errors.join(', ')}`);
      return;
    }

    uploadData(formData);
    // const currentTime = new Date().toLocaleString();
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: '',
      detail: '',
      strT:currentTime.getTime(),
      time: currentTime,
      limit:limitTime,
    }));
    alert('送信完了しました。ご意見ありがとうございます。');
    setFormErrors([]);
  };


  return (
    <div>
      <form onSubmit={handleSubmit} className={styles.formlayout}>
  
      <div>
          <input    
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            placeholder="件名"
          />
          <br></br>
          <textarea
            style={{ width: '90%', height: '200px', resize: 'vertical' }}
            wrap="hard"
            value={formData.detail}
            onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
            placeholder="詳細文"
          /><br></br> 

      </div>


        <button type="submit" className={styles.formbtn}>投稿送信</button>
      </form>
      
      {uploadStatus === 'Success' && <p>{} formed!</p>}
      {uploadStatus === 'Error' && <p>Upload failed!</p>}
    </div>
  );
}