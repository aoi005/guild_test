import React, { useState } from "react";
import { useFirestoreUpload } from "./Dataupload";
import styles from "./index.module.scss";
import firebase from "firebase/app";
import "firebase/firestore";
import { Timestamp } from "firebase/firestore";

interface TagFields {
  [tagName: string]: boolean;
}

interface FirestoreData {
    id: string;
    title: string;
    name: string;
    detail: string;
    strT:number;
    time:Date;
    limit:Date;
    tag: TagFields;
  }

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

export default function ChangeForm({
  id,
  title,
  name,
  detail,
  time,
  tag,
  limit,
  strT,
}: FirestoreData) {
  const { uploadData, uploadStatus } = useFirestoreUpload();
  const [formData, setFormData] = useState<FirestoreData>({
    id: id,
    title: title,
    name: name,
    detail: detail,
    strT:strT,
    time:time,
    limit:limit,
    tag: tag,
  });

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    uploadData(formData);
    setFormData((prevFormData) => ({
      ...prevFormData,
      id: "",
      title: "",
      name: "",
      tag: {},
      detail: "",
      time:time,
      strT:strT,
      limit:limit,
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
      <h1>Data Change</h1>
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

          if (key === "id" || key === "time" || key === "strT" || key === "limit") {
            return (
              <input
                key={key}
                type="text"
                value={value}
                readOnly // 読み取り専用に設定
                placeholder={key}
                className={styles.hidetext}
              />
            );
          }

          return (
            <input
              key={key}
              type={typeof value === "number" ? "number" : "text"}
              value={value}
              onChange={(e) =>
                setFormData({ ...formData, [key]: e.target.value })
              }
              placeholder={key}
            />
          );

    //       <div>
    //       <input    
    //         type="text"
    //         value={formData.id}
    //         onChange={(e) => setFormData({ ...formData, id: e.target.value })}
    //         placeholder="プレイヤーID"
    //       /><br></br>

    //       <input
    //         type="text"
    //         value={formData.title}
    //         onChange={(e) => setFormData({ ...formData, title: e.target.value })}
    //         placeholder="タイトル"
    //       /><br></br>

    //       <input
    //         type="text"
    //         value={formData.name}
    //         onChange={(e) => setFormData({ ...formData, name: e.target.value })}
    //         placeholder="ギルド名"
    //       /><br></br>

    //       <textarea
    //         style={{ width: '90%', height: '200px', resize: 'vertical' }}
    //         wrap="hard"
    //         value={formData.detail}
    //         onChange={(e) => setFormData({ ...formData, detail: e.target.value })}
    //         placeholder="詳細文"
    //       /><br></br> 

    //   </div>

        })}

        

        <button type="submit">編集を適用</button>
      </form>

      {uploadStatus === "Success" && <p>{} formed!</p>}
      {uploadStatus === "Error" && <p>Upload failed!</p>}
    </div>
  );
}