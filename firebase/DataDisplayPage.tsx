// DataDisplayPage.tsx

import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs } from 'firebase/firestore';
//import { TagDisplay } from './tagsort'

// Firebaseの設定と型定義

interface TagFields {
  [key: string]: boolean;
}

interface FirestoreData {
  id: string;
  title: string;
  author: string;
  price: number;
  tag: TagFields;
}

const firebaseConfig = {
    apiKey: "AIzaSyDeT3DgOkSe0PsJm8xu9lueT4CQz_EGirE",
    authDomain: "predate-032.firebaseapp.com",
    projectId: "predate-032",
    storageBucket: "predate-032.appspot.com",
    messagingSenderId: "590392707099",
    appId: "1:590392707099:web:906574ccb256290add10be",
    measurementId: "G-FTVDCJRC4X"
};



// タグ名のリスト。ここを編集するだけで数、名前を変更可能。
const tagList: string[] = ['Able', 'Bravo', 'Charley','Delta','Echo']; 




export function useFirestoreData() {
  const [data, setData] = useState<FirestoreData[]>([]);

  useEffect(() => {
    const app = initializeApp(firebaseConfig);
    const db = getFirestore(app);

    const fetchData = async () => {
      try {
        const querySnapshot = await getDocs(collection(db, 'books'));
        const fetchedData: FirestoreData[] = [];

        querySnapshot.forEach((doc) => {
          const { title, author, price, tag } = doc.data();
          fetchedData.push({
            id: doc.id,
            title,
            author,
            price,
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

  const filteredData = data.filter((item) => {
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
          <li>
            {item.id}
            <div>
              <a>
                Title: {item.title} / Author: {item.author} / Price: {item.price}
              </a>
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
          </li>
        </ul>
      ))}
    </div>
  );
}

