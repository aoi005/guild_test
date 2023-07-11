import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';
import styles from './index.module.scss';

interface FirestoreData {
  id: string;
  title: string;
  name: string;
  detail: string;
  strT: number;
  time: Date;
  limit: Date;
  tag: TagFields;
  reply: { [repid: string]: rep };
}

interface TagFields {
  [key: string]: boolean;
}

interface rep {
  name: string;
  msg: string;
}

interface AddReplyProps {
  item: FirestoreData;
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

function AddReply({ item }: AddReplyProps) {
    
    if (!item) {
        return null; // もしくはローディングなどの適切なコンテンツを表示
      }

  const [newReply, setNewReply] = useState({ repid: '', name: '', msg: '' });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReply((prevReply) => ({
      ...prevReply,
      [name]: value,
    }));
  };

  const addReply = async (e: React.FormEvent<HTMLFormElement>, id: string) => {
    e.preventDefault();

    try {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const docRef = doc(db, 'posts', id);

      await setDoc(
        docRef,
        {
          reply: {
            ...(item.reply || {}),
            [newReply.repid]: {
              name: newReply.name,
              msg: newReply.msg,
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
    <div>
      <div>
         Replies:
         {item.reply && Object.entries(item.reply).map(([repid, reply]) => (
         <div key={repid} className={styles.repbox}>
              ID: {repid} / Name: {reply.name} / Message: {reply.msg}
            </div>
         ))}
        </div>
      <form onSubmit={(e) => addReply(e, item.id)}>
        {/* <input type="hidden" name="itemId" value={item.id} /> */}
        <label>
          Reply ID:
          <input
            type="text"
            name="repid"
            value={newReply.repid}
            onChange={handleFormChange}
          />
        </label>
        <br />
        <label>
          Name:
          <input
            type="text"
            name="name"
            value={newReply.name}
            onChange={handleFormChange}
          />
        </label>
        <br />
        <label>
          Message:
          <input
            type="text"
            name="msg"
            value={newReply.msg}
            onChange={handleFormChange}
          />
        </label>
        <br />
        <button type="submit">Add Reply</button>
      </form>
    </div>
  );
}

export default AddReply;