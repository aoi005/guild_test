//src/components/Firebase/DataDisplayPage.tsx
//投稿一覧のページ遷移ボタンを状況に応じて変化させる。
//タグ絞り込みボタン押したときに1ページ目に飛ぶように変更。

import React, { useRef ,useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, Timestamp } from 'firebase/firestore';
import styles from './index.module.scss';
import Description from '../detail/description';
import firebase from "firebase/compat/app";



interface TagFields {
  [key: string]: boolean;
}

interface FirestoreData {
  id: string;
  title: string;
  name: string;
  detail: string;
  strT:number;
  time:Timestamp;
  limit:Date;
  tag: TagFields;
}

const firebaseConfig = {
  apiKey: "AIzaSyBE6W2TXtedCPj5ZoKQu2WIyVEBOMD0BIg",
  authDomain: "test-nextjs-d6670.firebaseapp.com",
  projectId: "test-nextjs-d6670",
  storageBucket: "test-nextjs-d6670.appspot.com",
  messagingSenderId: "531537153080",
  appId: "1:531537153080:web:5b1656e3c43845d1baeacd",
  measurementId: "G-KYVPHJTMQX"
};

const getStrTime = (time: string | number | Date) => {
  let t = new Date(time);
  return `${t.getFullYear()}/${
    t.getMonth() + 1
  }/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
};



// タグ名のリスト。ここを編集するだけで数、名前を変更可能。
const tagList: string[] = ["初心者歓迎", "エンジョイ", "ガチ", "ギルミ","Discord","少人数",
                            "固定多め","カスタム多め","無言加入可",
                            "朝","昼","夕方","夜","深夜"]; 



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
          const { title, name,strT,time,limit,detail, tag } = doc.data();
          fetchedData.push({
            id: doc.id,
            title,
            name,
            strT,
            time,
            limit,
            detail,
            tag,
          });
        });

        setData(fetchedData);
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    fetchData();
  }, []);

  return data;
}

const sortPriority: { [key: string]: number } = {
  Able: 1,
  Bravo: 2,
  Charley: 3,
};

const customSort = ([a]: [string, boolean], [b]: [string, boolean]) => {
  const priorityA = sortPriority[a] || Infinity;
  const priorityB = sortPriority[b] || Infinity;

  return priorityA - priorityB;
};

export default function DataDisplayPage() {
  const data = useFirestoreData();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagSelect = (tagName: string) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagName)) {
        
        return prevSelectedTags.filter((tag) => tag !== tagName);
      } else {
        
        return [...prevSelectedTags, tagName];
      }
    });
  };


  const [page, setPage] = useState(0);
  


  const PageChange = (count:any) => {
    setPage((prevPage) => {
      const newPage = prevPage + count;
      const maxPage = Math.floor(filteredData.length / 10);

      if (newPage < 0 || newPage > maxPage) {
        
        return prevPage;
      } else {
        return newPage;
      }
    });
  };



  
  const scrollToTop=()=>{
    window.scrollTo({
      top:0,
      
      behavior: 'smooth', 
    });
  };



  const filteredData = data
  .sort((a, b) =>(b.strT - a.strT)) 
  .filter((item) => {
    
    if (selectedTags.length === 0) {
      return true;
    }

    return selectedTags.every((tag) =>item.tag && item.tag[tag]);
  });


  
  const maximumPage = Math.floor(filteredData.length / 10)  +1  ;//追加：最大ページ数。投稿34件なら4ページ

  return (
// ここからメンバー募集の画面
 <div>      
                                                                                        {/*ページ1のとき'　．．．'ボタンを表示、そうでなければ`⇐ 前の十件`ボタンを表示*/}
      <button className={styles.pagebtn} onClick={() => {PageChange(-1); scrollToTop()}}>{page === 0 ? '　．．．' : `⇐ 前の十件`}</button>     

      {/* ページが最大のとき、"次の十件"ボタンを非表示にする */}
      {page !==maximumPage-1 && (<button  className={styles.pagebtn} onClick={() =>{PageChange(1); scrollToTop()}}>次の十件　⇒</button>)}

      {/* 現在のページ/最大ページを表示。　　　投稿件数の総数を表示。 */}
      <h4>ページ{page+1}/{maximumPage}　　　{filteredData.length}件表示</h4>

      <h4>タグ絞り込み</h4>

      <div className={styles.tagGrid2}>
              {tagList.map((tag) => (
                <div key={tag} >
                  <label className={styles.tagselectarea2}>
                      <input
                        type="checkbox"
                        checked={selectedTags.includes(tag)}
                        onChange={() => {
                          handleTagSelect(tag);
                          setPage(0);//追加：タグ選択するたびに1ページ目に戻す
                        }}
                        className={styles.checkbtn3}
                    />
                    <span className={styles.tagnamesize}>{tag}</span>
                  </label>
                </div>
              ))}
      </div>

      {filteredData.slice(page * 10, (page + 1) * 10).map((item) => (
          <article className={styles.bbs__main} key={item.id}>
            <div className={styles.titlebox} key={item.id}>
              <h3 key={item.id}>
                 {item.title} 
              </h3>
            </div>
            <div>
              <h5>Guildname: {item.name}</h5>
              <br></br>
              <p key={item.id} className={styles.text}>{item.detail}</p>
              <br></br>
            </div>
            <div>
              タグ：
              {item.tag && Object.entries(item.tag)
                .sort(customSort)
                .map(([tagName, tagValue]) => {
                  if (tagValue) {
                    return <span key={tagName} className={styles.tagbox} >{tagName} </span>;
                  }
                  return null;
                })}
            </div>

            <p>投稿日時：{getStrTime(item.strT)}</p>

            <Description  detail={item.detail}/>
  
            
          </article>
      ))}

      
      <h4>ページ{page+1}/{maximumPage}</h4>
      
                                                                                        {/*ページ1のとき'　．．．'ボタンを表示、そうでなければ`⇐ 前の十件`ボタンを表示*/}
      <button className={styles.pagebtn} onClick={() => {PageChange(-1); scrollToTop()}}>{page === 0 ? '　．．．' : `⇐ 前の十件`}</button>

      {/* ページが最大のとき、"次の十件"ボタンを非表示にする */}
      {page !==maximumPage-1 && (<button  className={styles.pagebtn} onClick={() =>{PageChange(1); scrollToTop()}}>次の十件　⇒</button>)}     
  </div>
// ここまでメンバー募集の画面


  );
  };
