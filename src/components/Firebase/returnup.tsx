import React, { useState } from 'react';
import { useFirestoreUpload } from './Dataupload';
import styles from "./index.module.scss";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';



interface TagFields {
  [tagName: string]: boolean;
  }

interface FirestoreData {
  id: string;
  title: string;
  name: string;
  tag: TagFields;
  detail: string;
  strT:number;
  time: Date;
  limit:Date;
}


const currentTime = new Date();
const limitTime = new Date(currentTime.getTime()+(14 * 24 * 60 * 60 * 1000));


const tags: string[] = ["Able", "Bravo", "Charlie", "Delta"]; 

const initialTags: TagFields = {
  Able: false,
  Bravo: false,
  Charley: false,
  Delta: false,
  // 追加したタグにも初期値を設定してください。
};

export default function UploadForm() {
  const { uploadData, uploadStatus } = useFirestoreUpload();
  const [formData, setFormData] = useState<FirestoreData>({
    id: '',
    title: '',
    name: '',
    tag:  initialTags,
    detail: '',
    strT:currentTime.getTime(),
    time: currentTime,
    limit:limitTime,
    // time: new Date(),
  });
  console.log(formData.time)

const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData(formData);
    // const currentTime = new Date().toLocaleString();
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: '',
      title: '',
      name: '',
      tag: {},
      detail: '',
      strT:currentTime.getTime(),
      time: currentTime,
      limit:limitTime,
    }));
    
    console.log(formData.time)
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
      })}
  
      <div>
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

          <textarea
            style={{ width: '150%', height: '200px', resize: 'vertical' }}
            wrap="hard"
            value={formData.detail}
            onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
            placeholder="詳細文"
          /><br></br> 
          
      </div>


        <button type="submit">データを追加/更新</button>
      </form>
      
      {uploadStatus === 'Success' && <p>{} formed!</p>}
      {uploadStatus === 'Error' && <p>Upload failed!</p>}
    </div>
  );
}