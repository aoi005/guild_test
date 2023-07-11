import React, { useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, doc, setDoc } from 'firebase/firestore';


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

function AddReply({ postId }: AddReplyProps) {
  const [newReply, setNewReply] = useState({ repid: '', name: '', msg: '' });

  const handleFormChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setNewReply((prevReply) => ({
      ...prevReply,
      [name]: value,
    }));
  };

  const addReply = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    try {
      const app = initializeApp(firebaseConfig);
      const db = getFirestore(app);

      const docRef = doc(db, 'posts', postId);

      await setDoc(
        docRef,
        {
          reply: {
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
    <form onSubmit={addReply} >
      <input
        type="text"
        name="repid"
        value={newReply.repid}
        onChange={handleFormChange}
        placeholder="Reply ID"
      />
      <input
        type="text"
        name="name"
        value={newReply.name}
        onChange={handleFormChange}
        placeholder="Name"
      />
      <input
        type="text"
        name="msg"
        value={newReply.msg}
        onChange={handleFormChange}
        placeholder="Message"
      />
      <button type="submit">Add Reply</button>
    </form>
  );
}

export default AddReply;