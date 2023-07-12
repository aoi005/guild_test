import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc,Timestamp } from 'firebase/firestore';
import styles from './index.module.scss';
import Description from '../detail/description';
import firebase from "firebase/compat/app";
import Hensyu from "../detail/hensyu";

// Firebaseの設定と型定義

interface TagFields {
  [key: string]: boolean;
}

interface FirestoreData {
  id: string;
  pas:string;
  title: string;
  name: string;
  detail: string;
  strT:number;
  time:Date;
  limit:Date;
  tag: TagFields;
  reply: {[repid: string]:rep};
}


interface rep{
  name: string;
  msg: string;
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

const getStrTime = (time: string | number | Date) => {
  let t = new Date(time);
  return `${t.getFullYear()}/${
    t.getMonth() + 1
  }/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
};



// タグ名のリスト。ここを編集するだけで数、名前を変更可能。
const tagList: string[] = ["初心者歓迎", "エンジョイ", "ガチ", "ギルミ","Discord","少人数",
                            "固定","カスタム","無言加入可","無言退出可",
                            "朝","昼","夕方","夜","深夜"]; 



export function useFirestoreData() {
  const [data, setData] = useState<FirestoreData[]>([]);

  useEffect(() => {
    const APP = initializeApp(firebaseConfig);
    const db = getFirestore(APP);

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'solicit'));
        const fetchedData: FirestoreData[] = [];

        querySnapshot.forEach((doc) => {
          const { title, pas,name,strT,time,limit,detail, tag,reply } = doc.data();
          const formattedReply = reply ? reply : {}; // nullやundefinedの場合に空オブジェクトに設定する
          
          fetchedData.push({
            id: doc.id,
            pas,
            title,
            name,
            strT,
            time,
            limit,
            detail,
            tag,
            reply:formattedReply
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

export default function DataDisplaysolicit() {
  const data = useFirestoreData();
  const [selectedTags, setSelectedTags] = useState<string[]>([]);

  const handleTagSelect = (tagName: string) => {
    setSelectedTags((prevSelectedTags) => {
      if (prevSelectedTags.includes(tagName)) {
        // タグが既に選択されている場合は削除
        return prevSelectedTags.filter((tag) => tag !== tagName);
      } else {
        // タグが選択されていない場合は追加
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
        // ページ範囲外なら移動しません！
        return prevPage;
      } else {
        return newPage;
      }
    });
  };


  const scrollToTop=()=>{
    window.scrollTo({
      top:0,
      //behavior: 'auto', // 一瞬でスクロールする場合
      behavior: 'smooth', // スムーズにスクロールする場合
    });
  };


  const filteredData = data
  .sort((a, b) =>(b.strT - a.strT)) // timeプロパティで降順ソート
  .filter((item) => {
    
    if (selectedTags.length === 0) {
      // 選択されたタグがない場合はすべてのデータを表示
      return true;
    }

    // 選択されたタグに一致するデータのみ表示
    return selectedTags.every((tag) => item.tag[tag]);
  });










  return (
<div>


      <button className={styles.pagebtn} onClick={() => {PageChange(-1)}}>⇐　前の十件</button>
      <button  className={styles.pagebtn} onClick={() => PageChange(1)}>次の十件　⇒</button>
      <h4>ページ{page+1}</h4>

    <div className={styles.resetbtnarea}>
      <h4>タグ絞り込み</h4>
      <button className={styles.resetbtn} onClick = {()=>{setSelectedTags([]);}}>
            選択リセット
        </button>
    </div>

      {/* <div className='Tagsellect'>
        タグ絞り込み: {selectedTags.join(', ')}
      </div> */}




<div className={styles.tagGrid2}>
        {tagList.map((tag) => (
          <div key={tag} >
          <label className={styles.tagselectarea2}>
            <input
              type="checkbox"
              checked={selectedTags.includes(tag)}
              onChange={() => handleTagSelect(tag)}
              className={styles.checkbtn3}
          />
          <span className={styles.tagnamesize}>{tag}</span>
          </label>
    </div>
  ))}
</div>

      {/* <div>
        {tagList.map((tag) => (
          <button key={tag} onClick={() => handleTagSelect(tag)}  className='Tagsellect'>
            Toggle {tag}
          </button>
        ))}
      </div> */}

      

    

      {filteredData.slice(page * 10, (page + 1) * 10).map((item) => (
        // <ul className="itemflex" >
          <article className={styles.bbs__main} key={item.id}>
            <div className={styles.titlebox} key={item.id}>
              <h3 key={item.id}>
                 {item.title} {/*タイトル*/}
              </h3>
            </div>
            <div>
              <h5>Guildname: {item.name}</h5>
              <br></br>
               <p key={item.id}>{item.detail}</p>
              <br></br>
            </div>
            <div>
              タグ：
              {Object.entries(item.tag)
                .sort(customSort)
                .map(([tagName, tagValue]) => {
                  if (tagValue) {
                    return <span key={tagName} className={styles.tagbox} >{tagName} </span>;
                  }
                  return null;
                })}
            </div>

            <p>投稿日時：{getStrTime(item.strT)}</p>

            <div className={styles.bordmenu}>

              <div className={styles.detaillay}>
                <Description  detail={item.detail} reply={item.reply} postid={item.id}/>
              </div>

          
              <Hensyu
                id={item.id}
                pas={item.id}
                title={item.title}
                name={item.name}
                detail={item.detail}
                strT={item.strT}
                time={item.time}
                limit={item.limit}
                tag={item.tag}
                reply={item.reply}
              />

            </div>

          
  
            
          </article>
        
        // </ul>
      ))}



      <h4>ページ{page+1}</h4>

      {/* ボタンでpagechange関数と一緒にscrolltotop関数も動く */}
      <button className={styles.pagebtn} onClick={() => {PageChange(-1); scrollToTop()}}>⇐　前の十件</button>
      <button  className={styles.pagebtn} onClick={() =>{PageChange(1); scrollToTop()}}>次の十件　⇒</button>  
      </div>



  );
}