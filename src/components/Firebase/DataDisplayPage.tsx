import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
import styles from './index.module.scss';
import Description from '../detail/description';
//import { TagDisplay } from './tagsort'

// Firebaseの設定と型定義

interface TagFields {
  [key: string]: boolean;
}

interface FirestoreData {
  id: string;
  title: string;
  name: string;
  detail: string;
  time:number;
  tag: TagFields;
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
const tagList: string[] = ['Able', 'Bravo', 'Charley','Delta','Echo']; 





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
          const { title, name,time,detail, tag } = doc.data();
          fetchedData.push({
            id: doc.id,
            title,
            name,
            time,
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
        // タグが既に選択されている場合は削除
        return prevSelectedTags.filter((tag) => tag !== tagName);
      } else {
        // タグが選択されていない場合は追加
        return [...prevSelectedTags, tagName];
      }
    });
  };

 

  const filteredData = data
  .sort((a, b) => b.time - a.time) // timeプロパティで降順ソート
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
      <h1>Data Display</h1>

      <div className='Tagsellect'>
        Selected Tags: {selectedTags.join(', ')}
      </div>

      <div>
        {tagList.map((tag) => (
          <button key={tag} onClick={() => handleTagSelect(tag)}  className='Tagsellect'>
            Toggle {tag}
          </button>
        ))}
      </div>

      {filteredData.map((item) => (
        <ul className="itemflex" key={item.id}>
          <article className={styles.bbs__main}>
            {/* {item.id} */}
            <div className={styles.titlebox}>
              <h3>
                Title: {item.title} 
              </h3>
            </div>
            <div>
              <h5>name: {item.name}</h5>
              <br></br>
               <p>{item.detail}</p>
              <br></br>
            </div>
            <div>
              Tags:
              {Object.entries(item.tag)
                .sort(customSort)
                .map(([tagName, tagValue]) => {
                  if (tagValue) {
                    return <span key={tagName}>{tagName} </span>;
                  }
                  return null;
                })}
            </div>

            <p>{getStrTime(item.time)}</p>

            <Description  detail={item.detail}/>

          </article>
        </ul>
      ))}
    </div>
  );
}