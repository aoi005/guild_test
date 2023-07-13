import React, { useEffect, useState } from 'react';
import Modal from 'react-modal';
import styles from "./index.module.scss";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Timestamp } from 'firebase/firestore';
import AddReplyquestion from './AddReplypost';





interface DescriptionProps {
  detail: string;
  postid: string;
  reply: { [repid: string]: rep };
}

interface TagFields {
  [key: string]: boolean;
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
  reply: { [repid: string]: rep };
}

interface rep {
  name: string;
  msg: string;
  strT:number;
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

export function useFirestoreData() {
  const [data, setData] = useState<FirestoreData[]>([]);

  useEffect(() => {
    const APP = initializeApp(firebaseConfig);
    const db = getFirestore(APP);

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'posts'));
        const fetchedData: FirestoreData[] = [];
    
        querySnapshot.forEach((doc) => {
          const { title, name, strT, time, limit, detail, tag, reply } = doc.data();
          fetchedData.push({
            id: doc.id,
            title,
            name,
            strT,
            time,
            limit,
            detail,
            tag,
            reply,
          });
        });
    
        setData([]);
        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData();
  }, []);

  return data;
}



function Descriptionquestion({ detail,reply,postid }: DescriptionProps) {
  const [modalIsOpen, setIsOpen] = useState(false);
  

  function openModal() {
    setIsOpen(true);
  }

  function closeModal() {
    setIsOpen(false);
  }

  const sortedReply = Object.entries(reply).sort(
    ([_, repA], [__, repB]) =>repA.strT - repB.strT
  );

  

  return (
    <div style={{  overflowY: 'auto' }} className={styles.formbox}>
      <button onClick={openModal} className={styles.detailbtn}>
        詳細・リプライを表示
      </button>
      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} className={styles.detailarea}>
 
      <div className={styles.modalContent}> 

        <h2>詳細</h2>
        <p className={styles.detailbox}>{detail}</p>

        <h3> リプライ　</h3>
          <div >
          {sortedReply.map(([repid, rep]) => (
              <div key={repid} className={styles.replen}>
                <div className={styles.namearea}>
                  <p className={styles.namearea}>Name: {rep.name}</p>
                </div>
                <p　className={styles.msgarea}>{rep.msg}</p>
              </div>
            ))}
          </div>
    
          <div className={styles.repinputarea}>
            <AddReplyquestion postId={postid}></AddReplyquestion>
          </div>
       

          <button onClick={closeModal} className={styles.closebtn}>
          閉じる
        </button>
 
      </div>  

      </Modal>

    </div>
  );
}

export default Descriptionquestion;