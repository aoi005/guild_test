import React, { useState } from 'react';
import { useFirestoreUpload } from './useFirestoreUpload';
import styles from "./index.module.scss";
import firebase from 'firebase/app';
import 'firebase/firestore';
import { Timestamp } from 'firebase/firestore';
import { SetNewData } from './SetNewData';



interface TagFields {
  [tagName: string]: boolean;
  }
 
export interface FirestoreData {
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


const memberTags: string[] = ["初心者歓迎", "エンジョイ", "ガチ", "ギルミ","Discord","少人数",
                            "固定","カスタム","無言加入可","無言退出可",
                            "朝","昼","夕方","夜","深夜"]; 

                        //solicit （疑）question
const fightTags: string[] = ["フリバ","バトアリ","枠埋め", "エンジョイ", "ガチ", "ギルミ","Discord",
                            "固定","カスタム","無言参加可","無言退出可",
                            "アタッカー","ガンナー","タンク","スプリンター",]; 

const questionTags:  string[] = ["初心者", "デッキ","立ち回り",
                            "アタッカー","ガンナー","タンク","スプリンター",];  

                        

/*console.log(initialTags);

/*const initialTags: TagFields = {
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
};/**/


//
interface UploadFormProps {
  collectionId: string;
}


  //collectionId = （共）fight （メ）posts || member （勧）solicit （疑）question疑
export default function UploadForm({ collectionId }: UploadFormProps) {//引数の渡し方～複雑う～

///////////////////////////////////////////////////////////////////////////////////////////////
  //（共）fight （メ）posts || member （勧）solicit （疑）question
  let title = "title is None";
  let tags: string[] = [];

  if (collectionId === "member" || collectionId === "posts") {
     title = "メンバー募集・投稿内容" 
     tags = memberTags;
  }
  else if (collectionId === "fight") {
     title = "フレンド募集・投稿内容" 
     tags = fightTags;
  }
  else if (collectionId === "solicit") {
     title = "勧誘・投稿内容" 
    tags = memberTags;
  }
  else if (collectionId === "question") {

     title = "質問・投稿内容" 
    tags = questionTags;
  }
  

  const initialTags: TagFields = {}

for (let i = 0; i < tags.length; i++) {
    initialTags[tags[i]] = false;
}
///////////////////////////////////////////////////////////////////////////////////////////////////////////////////

  const { uploadData, uploadStatus } = useFirestoreUpload(collectionId);
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
  console.log(formData.time)

/*const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
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
};/**
 * 
 */

  
const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
  e.preventDefault();
  SetNewData(formData,collectionId,"IdStorage");//（共）fight （メ）posts （勧）solicit （疑）question
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
      <h3>{title}</h3>
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
          {/* <input    
            type="text"
            value={formData.id}
            onChange={(e) => setFormData({ ...formData, id: e.target.value })}
            placeholder="プレイヤーID"
          /><br></br> */}

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
            placeholder="名前"
          /><br></br>

          <textarea
            style={{ width: '90%', height: '200px', resize: 'vertical' }}
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