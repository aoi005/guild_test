import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import BBS from '../components/BBS'
//import GroupsIcon from '@mui/icons-material/Groups';
import FORM from '@/components/FORM';


import db from '../firebase'
import { useEffect,useState } from 'react';
import { collection, getDocs } from "firebase/firestore";//データ取得関数
import { doc, onSnapshot } from "firebase/firestore";//realtimeの関数

import { addDoc } from "firebase/firestore";//データ追加関数




var collectionId = "posts";
const postData = collection(db, collectionId);
const qSnapshot = await getDocs(postData);


try {
  const docRef = await addDoc(collection(db, collectionId), {
    first: "Alan",
    middle: "Mathison",
    last: "Turing",
    born: 1912
  });

  console.log("Document written with ID: ", docRef.id);
} catch (e) {
  console.error("Error adding document: ", e);
}




export default function Home() {
  const [posts, setPosts] = useState<any[]>([]);//<any[]>をつけないとエラーが出る
  useEffect(() => {




    
    //Firestoreからデータを取得し、そのデータを上で作成したstateに保存。
    
    //console.log(postData);
    
    qSnapshot.forEach((doc) => {
      console.log(doc.id, " => ", doc.data());
      setPosts(qSnapshot.docs.map((doc) => ({...doc.data()})));
    });/**/

    

/*
    const unsub = onSnapshot(postData, (post) => {　//データ取得(リアルタイム)
      setPosts(post.docs.map((doc) => ({...doc.data()})));
    });/**/

    /*getDocs(postData).then((Snapshot) => {//データ取得(非リアルタイム)
      setPosts(Snapshot.docs.map((doc) => ({...doc.data()})));
    });/**/
  
  },[]);

  

 

  return (
    <MainLayout>
      <Head>
        
        
      </Head>
       <div className={styles.contents}>
        
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} >
        
          {/* 追加: データが存在する場合に表示 */}
          {posts && posts.map((post, index) => (
            <div key={index}>
              <h2>{post.title}</h2>
              <p>{post.text}</p>
            </div>
          ))}

        <BBS />

        
        {/* <FORM/> */}
       

        </div>
      </div>
      
  
    </MainLayout>
  )
}

