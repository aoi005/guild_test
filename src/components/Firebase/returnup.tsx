import React, { useState } from 'react';
import { useFirestoreUpload } from './Dataupload';
import styles from "./index.module.scss";
import firebase from 'firebase/app';
import 'firebase/firestore';


interface TagFields {
    Able: boolean;
    Bravo: boolean;
    Charley: boolean;
  }

interface FirestoreData {
  id: string;
  title: string;
  name: string;
  tag: TagFields;
  detail: string;
  time:string;
//   time: Date;
}

export default function UploadForm() {
  const { uploadData, uploadStatus } = useFirestoreUpload();
  const [formData, setFormData] = useState<FirestoreData>({
    id: '',
    title: '',
    name: '',
    tag:  { Able: false, Bravo: false, Charley: false },
    detail: '',
    time:new Date().toLocaleString(),
    // time: new Date(),
  });

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const currentTime = new Date().toLocaleString();
    setFormData((prevFormData) => ({
      ...prevFormData,
      time: currentTime,
    }));
    uploadData(formData);

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
          value={formData.detail}
          onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
          placeholder="詳細文"
        /><br></br>
   
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
        <br></br>
       
        
        <button type="submit">データを追加/更新</button>
      </form>
      
      {uploadStatus === 'Success' && <p>{formData.time} formed!</p>}
      {uploadStatus === 'Error' && <p>Upload failed!</p>}
    </div>
  );
}