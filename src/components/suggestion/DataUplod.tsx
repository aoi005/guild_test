import { initializeApp } from "firebase/app";
import { useState } from 'react';
import { getFirestore, doc, setDoc, Timestamp, serverTimestamp, limit } from 'firebase/firestore';


interface FirestoreData {
  id: string;
  detail: string;
  strT:number;
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


const currentTime = new Date();
const limitTime = new Date(currentTime.getTime()+(14 * 24 * 60 * 60 * 1000));



export function useFirestoreUpload() {
    const [uploadStatus, setUploadStatus] = useState<string>('');

    const [formData, setFormData] = useState<FirestoreData>({
        id: '',
        detail: '',
        strT:currentTime.getTime(),
        time:currentTime,
        limit: limitTime,
      });
  
    const uploadData = async (formData: FirestoreData) => {
      try {
        const app = initializeApp(firebaseConfig);
        const db = getFirestore(app);
  
        await setDoc(doc(db, 'suggestion', formData.id), {
            detail: formData.detail,
            strT:formData.strT,
            time:formData.time,
            limit:formData.limit,
          });
  
        setUploadStatus('Success');

        setFormData((prevData) => ({
            ...prevData,
            id: '',
            detail: '',
            strT:currentTime.getTime(),
            time:currentTime,
            limit: limitTime,
          }));

      } catch (error) {
        setUploadStatus('Error');
        console.error('Error uploading document:', error);
      }
    };
      return { formData, setFormData, uploadData, uploadStatus };
   
  }