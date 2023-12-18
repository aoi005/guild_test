import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc,Timestamp,onSnapshot } from 'firebase/firestore';
import styles from './index.module.scss';
import firebase from "firebase/compat/app";
import Hensyu from "../detail/hensyu";
import Descriptionquestion from '../detail/descriptionquestion';

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

const getStrTime = (time: string | number | Date) => {
  let t = new Date(time);
  return `${t.getFullYear()}/${
    t.getMonth() + 1
  }/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
};



// タグ名のリスト。ここを編集するだけで数、名前を変更可能。
const tagList: string[] = ["初心者", "デッキ","立ち回り",
                            "アタッカー","ガンナー","タンク","スプリンター",]; 



export function useFirestoreData() {
  const [data, setData] = useState<FirestoreData[]>([]);
  const [documentCount, setDocumentCount] = useState<number>(0);

  useEffect(() => {
    const APP = initializeApp(firebaseConfig);
    const db = getFirestore(APP);

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'question'));
        const fetchedData: FirestoreData[] = [];

        querySnapshot.forEach((doc) => {
          const { title,pas, name,strT,time,limit,detail, tag,reply } = doc.data();
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

        if (fetchedData.length === 0) {
          // データが存在しない場合の処理
          setData([]); // 空のデータ配列を設定
        }

        setData(fetchedData);
        setDocumentCount(querySnapshot.size);//リプライカウンターのアウトプットはここ
      } catch (error) {
        console.error('Error fetching Firestore data:', error);
      }
    };

    const unsubscribe = onSnapshot(collection(db, "question"), (snapshot) => {
      fetchData();
    });

    return () => unsubscribe();
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

export default function DataDisplayQuestion() {
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

        <div className={styles.resetbtnarea}>
          <h4>タグ絞り込み</h4>
          <button className={styles.resetbtn} onClick = {()=>{setSelectedTags([]);}}>
            タグリセット
          </button>
        </div>
 
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
        // <ul className="itemflex" >
          <article className={styles.bbs__main} key={item.id}>
            <div className={styles.titlebox} key={item.id}>
              <h3 key={item.id}>
                 {item.title} {/*タイトル*/}
              </h3>
            </div>
            <div>
              <h5>PlayerName: {item.name}</h5>
              <br></br>
               <p key={item.id} className={styles.text}>{item.detail}</p>
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
                <Descriptionquestion detail={item.detail} reply={item.reply} postid={item.id}/>
              </div>

          
              <Hensyu
                id={item.id}
                pas={item.pas}
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

              <div>リプライ数：{Object.keys(item.reply).length}</div>
              
          </article>
        
        // </ul>
      ))}



     <h4>ページ{page+1}/{maximumPage}</h4>
                                                                                        {/*ページ1のとき'　．．．'ボタンを表示、そうでなければ`⇐ 前の十件`ボタンを表示*/}
      <button className={styles.pagebtn} onClick={() => {PageChange(-1); scrollToTop()}}>{page === 0 ? '　．．．' : `⇐ 前の十件`}</button>

      {/* ページが最大のとき、"次の十件"ボタンを非表示にする */}
      {page !==maximumPage-1 && (<button  className={styles.pagebtn} onClick={() =>{PageChange(1); scrollToTop()}}>次の十件　⇒</button>)}     
  </div>





  );
}