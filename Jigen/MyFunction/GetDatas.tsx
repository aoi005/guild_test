import { useEffect, useState } from 'react';
import db from '../firebase'

import { doc, getDocs ,collection} from "firebase/firestore";


var collectionId = "users";
var documentId = "123";

export type MyType = [{
    aaa: string;
    bbb: string;
    ccc: string;
}];

export async function GetDatas(collectionId: string): Promise<any[]> {
    const querySnapshot = await getDocs(collection(db, collectionId));
    const posts = querySnapshot.docs.map((doc) => doc.data());
    return posts;
}
/*
export async function GetDatas(collectionId:string ): Promise<any[]> {
   

    const [posts, setPosts] = useState<any[]>([]);//　useState で[状態変数,状態更新関数]を作る。
    
    const querySnapshot = await getDocs(collection(db, "cities"));//Snapshotには瞬間的に切り取ったデータを保存

    querySnapshot.forEach((doc) => {//配列の各要素に対して{}内の関数を実行
      setPosts(querySnapshot.docs.map((doc) => ({...doc.data()})));//状態更新関数を使ってpostsを更新
    });

    
    return posts;
}
*/

/*
import { useEffect, useState } from 'react';
import { GetDatas } from '@/MyFunction/GetData';
import { MyType } from '@/MyFunction/GetData';

export default function Home() {
  const [data, setData] = useState<MyType[]>([]);

  useEffect(() => {
    GetDatas('users').then(gotData => {
      setData(gotData);
    }).catch(error => {
      console.error("Error fetching data: ", error);
    });
  }, []);

  return (
    <div>
      {data.map((item, index) => (
        <div key={index}>
          <p>{item.aaa}</p> 
          <p>{item.bbb}</p>
          <p>{item.ccc}</p>
        </div>
      ))}
    </div>
  )
}
*/
