import React, { useState,ChangeEventHandler } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import styles from "./index.module.scss";


interface AddReplyProps {
  postId: string;
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

function generateReplyId() {

  const uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function (c) {
    const r = (Math.random() * 16) | 0,
      v = c === 'x' ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });

  return uuid;
}

function AddReplyquestion({ postId }: AddReplyProps) {
  const [newReply, setNewReply] = useState({ repid: generateReplyId(), name: '', msg: '' });

  const handleFormChange: ChangeEventHandler<HTMLTextAreaElement> = (e) => {
    const { name, value } = e.target;
    setNewReply((prevReply) => ({
      ...prevReply,
      [name]: value,
    }));
  };

  const addReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    const emptyFields = [];


  if (newReply.name === '') {
    emptyFields.push('Name');
  }

  if (newReply.msg === '') {
    emptyFields.push('Message');
  }

  if (emptyFields.length > 0) {
    const fieldsMessage = emptyFields.join(', ');
    alert(`次の内容は必須項目です。: ${fieldsMessage}`);  //エラーアラートここ
    return;
  }

    try {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const docRef = doc(db, 'question', postId);

      await setDoc(
        docRef,
        {
          reply: {
            [newReply.repid]: {
              name: newReply.name,
              msg: newReply.msg,
              strT:currentTime.getTime(),
            },
          },
        },
        { merge: true }
      );

      setNewReply({ repid: '', name: '', msg: '' });
    } catch (error) {
      console.error('Error adding reply:', error);
    }
  };

  return (
    <form onSubmit={addReply} >
     
      <textarea
        name="name"
        value={newReply.name}
        onChange={handleFormChange}
        placeholder="Name"
      />
      <textarea
        name="msg"
        wrap='hard'
        style={{ width: '90%', height: '200px', resize: 'vertical' }}
        value={newReply.msg}
        onChange={handleFormChange}
        placeholder="Message"
      />
          
      <button type="submit" className={styles.addrepbtn}>Add Reply</button>
    </form>
  );
}

export default AddReplyquestion;