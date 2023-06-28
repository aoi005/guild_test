import React, { useState } from 'react';
import { useFirestoreUpload } from './Dataupload';
import styles from "./index.module.scss";


interface FirestoreData {
    id: string;
    title: string;
    name: string;
    tag: string;
    detail: string;
  }

export default function UploadForm() {
  const { uploadData, uploadStatus } =  useFirestoreUpload();
  const [formData, setFormData] = useState<FirestoreData>({
    id: '',
    title: '',
    name: '',
    tag: '',
    detail: "",
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData(formData);
  };

  return (
    <div>
      <h1>Data Upload</h1>
      <form onSubmit={handleSubmit} className={styles.formlayout}>
        <input 
          type="text"
          value={formData.id}
          onChange={(e) => setFormData({ ...formData, id: e.target.value })}
          placeholder="プレイヤーID"
        /><br></br>

        <input
          type="text"
          value={formData.title}
          onChange={(e) => setFormData({ ...formData, title: e.target.value })}
          placeholder="タイトル"
        /><br></br>
  
        <input
          type="text"
          value={formData.name}
          onChange={(e) => setFormData({ ...formData, name: e.target.value })}
          placeholder="プレイヤー名"
        /><br></br>
   
        <input
          type="text"
          value={formData.tag}
          onChange={(e) => setFormData({ ...formData, tag: e.target.value })}
          placeholder="タグ"
        /><br></br>
       
        <input
          type="text"
          value={formData.detail}
          onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
          placeholder="詳細文"
        /><br></br>
        <button type="submit">データを追加/更新</button>
      </form>
      
      {uploadStatus === 'Success' && <p>Upload successful!</p>}
      {uploadStatus === 'Error' && <p>Upload failed!</p>}
    </div>
  );
}