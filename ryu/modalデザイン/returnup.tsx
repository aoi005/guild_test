//src/components/Firebase/returnup.tsx
//テキストボックスデザイン変更。ヘッダーとのかぶりを修正。

import React, { useState, useRef } from 'react';
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


const tags: string[] = ["初心者歓迎", "エンジョイ", "ガチ", "ギルミ","Discord","少人数",
                        "固定多め","カスタム多め","無言加入可",
                        "朝","昼","夕方","夜","深夜"]; 

const initialTags: TagFields = {
  初心者歓迎: false,
  エンジョイ: false,
  ガチ: false,
  ギルミ: false,
  Discord: false,
  少人数: false,
  固定多め: false,
  カスタム多め: false,
  無言加入可: false,
  朝: false,
  昼: false,
  夕方: false,
  夜: false,
  深夜: false,
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

//追加　入力でテキストエリア大きさ変える
const textareaRef = useRef<HTMLTextAreaElement |null>(null);

const TextareaHeight = () => {
  if (textareaRef.current) {
    textareaRef.current.style.height = "auto";
    textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`;
  }
};
//ここまで



  return (
    //ここから投稿内容
    <div className={styles.bbs}>
      <h3 className=''>投稿内容</h3>
      <form onSubmit={handleSubmit} className={styles.formlayout}>
      {Object.entries(formData).map(([key, value]) => {
          if (key === "tag") {
            return (
              <div key={key} className={styles.tagGrid}>
                {tags.map((tagName) => (
                 
                  <label key={tagName}>
                    <input
                      type="checkbox"
                      name={tagName}
                      checked={formData.tag[tagName] || false}
                      onChange={handleCheckboxChange}
                    />
                    {tagName}
                  </label>
                  
                ))}
              </div>
            );
          }
      })}
  

      {/* 修正 */}
      <div>
          <label htmlFor="" className={styles.label}>PLAYER ID</label>
          <input    
            type="text"
            className={styles.textbox}
            maxLength={11}//文字数制限出来ない
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            placeholder="プレイヤーID"
          />
          
          <label htmlFor="" className={styles.label}>TITLE</label>
          <input
            type="text"
            className={styles.textbox}
            maxLength={11}
            value={formData.title}
            onChange={(e) => setFormData({ ...formData, title: e.target.value })}
            placeholder="タイトル"
          />
       
          <label htmlFor="" className={styles.label}>GUILD NAME</label>
          <input
            type="text"
            className={styles.textbox}
            maxLength={11}
            value={formData.name}
            onChange={(e) => setFormData({ ...formData, name: e.target.value })}
            placeholder="ギルド名"
          />
          <label htmlFor="" className={styles.label}>DETAIL</label>


          <textarea
            className={`${styles.textarea} ${styles.resize}`}
            
            wrap="hard"
            ref={textareaRef}
            value={formData.detail}
            // maxLength={100}//文字数制限されない
            onChange={(e) => {
            setFormData({ ...formData, detail: e.target.value });
            TextareaHeight();}} //
            placeholder="詳細文"
          /> 
          {/* <p>{formData.detail.length}/100</p> */}
          {/* 文字数カウント 改行までカウントされる */}
          <br/>
      </div>


        <button type="submit" className={styles.button}>データを追加/更新</button>
      </form>
      
      {uploadStatus === 'Success' && <p>{} formed!</p>}
      {uploadStatus === 'Error' && <p>Upload failed!</p>}
    </div>
    //ここまで投稿内容
  );
}