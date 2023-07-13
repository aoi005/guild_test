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
  pas:string;
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


const tags: string[] = ["フリバ","バトアリ","枠埋め", "エンジョイ", "ガチ", "ギルミ","Discord",
                        "固定","カスタム","無言参加可","無言退出可",
                        "アタッカー","ガンナー","タンク","スプリンター",]; 

const initialTags: TagFields = {
  フリバ: false,
  バトアリ: false,
  枠埋め: false,
  エンジョイ: false,
  ガチ: false,
  ギルミ: false,
  Discord: false,
  固定: false,
  カスタム: false,
  無言参加可: false,
  無言退出可: false,
  アタッカー: false,
  ガンナー: false,
  タンク: false,
  スプリンター: false,
  // 追加したタグにも初期値を設定してください。
};



export default function UploadFormFight() {
  const { uploadData, uploadStatus } = useFirestoreUpload();
  const [formData, setFormData] = useState<FirestoreData>({
    id: '',
    pas:'',
    title: '',
    name: '',
    tag:  initialTags,
    detail: '',
    strT:currentTime.getTime(),
    time: currentTime,
    limit:limitTime,
    // time: new Date(),
  });


  const [formErrors, setFormErrors] = useState<string[]>([]); //ここでエラー内容の配列定義。

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
  
      const requiredFields = ['pas', 'title', 'name','detail'];
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
        pas:'',
        title: '',
        name: '',
        tag: {},
        detail: '',
        strT:currentTime.getTime(),
        time: currentTime,
        limit:limitTime,
      }));
      alert('投稿完了しました。パスワードはお忘れないようにお願いします。');
      setFormErrors([]);
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
      <h3>固定募集・投稿内容</h3>
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
  
      <div>
          <input    
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            placeholder="プレイヤーID"
          /><br></br>

          <input
            type="text"
            value={formData.pas}
            onChange={(e) => setFormData({ ...formData, pas: e.target.value })}
            placeholder="パスワード"
          />＊編集時に必要です
          <br></br>

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
            placeholder="部屋番号"
          /><br></br>

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