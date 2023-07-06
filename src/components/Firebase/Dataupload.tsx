import { initializeApp } from "firebase/app";
import { useState } from 'react';
import { getFirestore, doc, setDoc, Timestamp, serverTimestamp, limit } from 'firebase/firestore';


interface TagFields {
  [tagName: string]: boolean;
  }

interface FirestoreData {
  id: string;
  title: string;
  name: string;
  detail: string;
  strT:number;
  tag: TagFields;
  time:Date;
  limit:Date;
}

const firebaseConfig = {
    apiKey: "AIzaSyAL2k3eiGWuVfvxZd2-1QrzPZzYUunPdSU",
    authDomain: "conpas-93e54.firebaseapp.com",
    projectId: "conpas-93e54",
    storageBucket: "conpas-93e54.appspot.com",
    messagingSenderId: "989467913511",
    appId: "1:989467913511:web:30efac48507ccec4768d02",
    measurementId: "G-5JSSYVBJR0"
};

const initialTags: TagFields = {
  初心者歓迎: false,
  エンジョイ: false,
  ガチ: false,
  ギルミ: false,
  Discord: false,
  小人数: false,
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


const currentTime = new Date();
const limitTime = new Date(currentTime.getTime()+(14 * 24 * 60 * 60 * 1000));



export function useFirestoreUpload() {
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const [formData, setFormData] = useState<FirestoreData>({
        id: '',
        title: '',
        name: '',
        detail: '',
        strT:currentTime.getTime(),
        time:currentTime,
        limit: limitTime,
        tag: initialTags,
      });
  
    const uploadData = async (formData: FirestoreData) => {
      try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
  
        await setDoc(doc(db, 'posts', formData.id), {
            title: formData.title,
            name: formData.name,
            detail: formData.detail,
            tag: formData.tag,
            strT:formData.strT,
            time:formData.time,
            limit:formData.limit,
          });
  
        setUploadStatus('Success');

        setFormData((prevData) => ({
            ...prevData,
            id: '',
            title: '',
            name: '',
            detail: '',
            strT:currentTime.getTime(),
            time:currentTime,
            limit: limitTime,
            tag: initialTags,
          }));

      } catch (error) {
        setUploadStatus('Error');
        console.error('Error uploading document:', error);
      }
    };
      return { formData, setFormData, uploadData, uploadStatus };
   
  }