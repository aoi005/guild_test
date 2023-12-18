import { initializeApp } from "firebase/app";
import { useState } from 'react';
import { getFirestore, doc, setDoc, Timestamp, serverTimestamp, limit } from 'firebase/firestore';
import Twitter from 'twitter-lite';

interface TagFields {
  [tagName: string]: boolean;
  }

interface FirestoreData {
  id: string;
  pas:string;
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


// const tweetData = async (text:string) => {
//   const twitterClient = new Twitter({
//     subdomain: "api", // "api" for tweet posting
//     consumer_key: '6vHU83FmWr7lPumzWObgkd7I1',
//     consumer_secret: '0Au9wsJ1lFeaZw9lwIHmu7IQu60l5fyC7EEbIw3ANr6J1s3IoO',
//     access_token_key: '1678327012904292352-s8NlBmpgmiuZjSnY7mMJkcmaMAL0zD',
//     access_token_secret: 'j4zMCW0MsGBbFoutu62qJMCyicLrmZdH0X7zB3FunJiq4',
//   });

//   try {
//     const tweet = await twitterClient.post('statuses/update', {
//       status: text,
//     });
//     console.log('Tweet posted:', tweet.text);
//   } catch (error) {
//     console.error('Error posting tweet:', error);
//   }
// };

// export { tweetData };


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


const currentTime = new Date();
const limitTime = new Date(currentTime.getTime()+(14 * 24 * 60 * 60 * 1000));



  //collectionId = （共）fight （メ）posts || member （勧）solicit （疑）question疑
export function useFirestoreUpload(collectionId:string) {

    const [uploadStatus, setUploadStatus] = useState<string>('');

    const [formData, setFormData] = useState<FirestoreData>({
        id: '',
        pas:'',
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
  
        await setDoc(doc(db, collectionId, formData.id), {
            title: formData.title,
            pas:formData.pas,
            name: formData.name,
            detail: formData.detail,
            tag: formData.tag,
            strT:formData.strT,
            time:formData.time,
            limit:formData.limit,
          });
  
        setUploadStatus('Success');

        // const tweetText = `#コンパス\nギルド名：${formData.name}\n${formData.detail}`;
        // await tweetData(tweetText);

        setFormData((prevData) => ({
            ...prevData,
            id: '',
            pas:'',
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