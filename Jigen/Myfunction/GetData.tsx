import db from '../firebase'

import { doc, getDoc } from "firebase/firestore";


var collectionId = "users";
var documentId = "123";

export type MyType = {
    aaa: string;
    bbb: string;
    ccc: string;

};

export async function GetData(collectionId:string , documentId:string): Promise<MyType[]> {
    const Array: MyType[] = [];
    const docRef = doc(db, collectionId,documentId);
    const docSnap = await getDoc(docRef);
    
    if (docSnap.exists()) {
      console.log("Document data:", docSnap.data());
      Array.push(docSnap.data() as MyType);
    } else {
      console.log("No document");
    }
    
    return Array;
}

  /*読み出し方 how to use
  import { useEffect, useState } from 'react';
import {GetData} from '@/MyFunction/GetData';
import {MyType} from '@/MyFunction/GetData';


export default function Home() {
  
  
  const [data, setData] = useState<MyType[]>([]);

  useEffect(() => {
    GetData().then(gotData => {
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
