import React, { useState } from 'react';
import { useFirestoreUpload } from './Dataupload';
import styles from "./index.module.scss";
import firebase from 'firebase/app';
import 'firebase/firestore';


interface TagFields {
  [tagName: string]: boolean;
  }

interface FirestoreData {
  id: string;
  title: string;
  name: string;
  tag: TagFields;
  detail: string;
  // time:string;
  time: number;
}


const currentTime = new Date().getTime();

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
    time: currentTime,
    // time: new Date(),
  });

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
      time: currentTime,
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

        

        {/* {*/  
        //   type="text"
        //   value={formData.id}
        //   onChange={(e) => setFormData({ ...formData, id: e.target.value })}
        //   placeholder="プレイヤーID"
        // /><br></br>

      /*}

        // <input *
        //   type="text"
        //   value={formData.title}
        //   onChange={(e) => setFormData({ ...formData, title: e.target.value })}
        //   placeholder="タイトル"
        // /><br></br>
  
        // <input
        //   type="text"
        //   value={formData.name}
        //   onChange={(e) => setFormData({ ...formData, name: e.target.value })}
        //   placeholder="プレイヤー名"
        // /><br></br>

        // {/* <input
        //   type="text"
        //   value={formData.detail}
        //   onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
        //   placeholder="詳細文"
        // /><br></br> *

        // <textarea
        //     style={{ width: '150%', height: '200x', resize: 'vertical' }}
        //     wrap="hard"
        //     //   type="text"
        //     value={formData.detail}
        //     onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
        //     placeholder="詳細文"
        // /><br></br>
   
        // <label>
        //   Able:
        //   <input
        //     type="checkbox"
        //     name="Able"
        //     checked={formData.tag.Able}
        //     onChange={handleCheckboxChange}
        //   />
        // </label>

        // <label>
        //   Bravo:
        //   <input
        //     type="checkbox"
        //     name="Bravo"
        //     checked={formData.tag.Bravo}
        //     onChange={handleCheckboxChange}
        //   />
        // </label>

        // <label>
        //   Charley:
        //   <input
        //     type="checkbox"
        //     name="Charley"
        //     checked={formData.tag.Charley}
        //     onChange={handleCheckboxChange}
        //   />
        // </label>
        // <br></br>

        // );
     */}
       
        
        <button type="submit">データを追加/更新</button>
      </form>
      
      {uploadStatus === 'Success' && <p>{formData.time} formed!</p>}
      {uploadStatus === 'Error' && <p>Upload failed!</p>}
    </div>
  );
}