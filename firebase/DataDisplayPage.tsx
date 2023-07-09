// DataDisplayPage.tsx
import React, { useEffect, useState } from 'react';
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, getDocs, doc, setDoc} from 'firebase/firestore';

import 'firebase/firestore';

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
  reply: {[repid: string]:rep};
}

interface rep{
  name: string;
  msg: string;
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





//メイン分野表示(上位側フィールド内容)
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
          const { title, author, price, tag, reply } = doc.data();
          const id = doc.id;
          const formattedReply = reply ? reply : {}; // nullやundefinedの場合に空オブジェクトに設定する
          fetchedData.push({
            id,
            title,
            author,
            price,
            tag,
            reply:formattedReply,
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

//タグソート
const customSort = ([a]: [string, boolean], [b]: [string, boolean]) => {
  const priorityA = sortPriority[a] || Infinity;
  const priorityB = sortPriority[b] || Infinity;

  return priorityA - priorityB;
};


//タグ絞り込み検索
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

//リプ追加

//replyフォーム内容定義
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
    //appとdbは汎用なのでfunction外で定義するのはアリかも。最悪initとか_app.tsxで定義しといてimportするのが楽？

    const docRef = doc(db, 'books', id);

    await setDoc(
      docRef,
      {
        reply: {
          ...(data.find((item) => item.id === id)?.reply || {}), // 既存の返信を取得し、なければ空オブジェクトに設定
          [newReply.repid]: {
            name: newReply.name,
            msg: newReply.msg,
          },
        },
      },
      { merge: true } // 既存のデータとマージするために merge オプションを使用
    );

    setNewReply({ repid: '', name: '', msg: '' });//フォーム内文字削除。
  } catch (error) {
    console.error('Error adding reply:', error);
  }
};



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
            <div>
            Replies:
              {Object.entries(item.reply).map(([repid, reply]) => (
                <div key={repid}>
                  ID: {repid} / Name: {reply.name} / Message: {reply.msg}
                </div>
              ))}
            </div>
            <form onSubmit={(e) => addReply(e, item.id)}>
              <input type="hidden" name="itemId" value={item.id} />
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
          </li>
        </ul>
      ))}
    </div>
  );
}
