import { useEffect, useState } from 'react';
import db from '../firebase'

//import { doc, getDocs ,collection} from "firebase/firestore";
//import { query,where} from "firebase/firestore";
import { addDoc  ,collection, } from "firebase/firestore";//データ追加関数



export async function AddData(collectionId: string ,aaa:string,bbb:string,ccc:string,tagString:string[]) /*:Promise<string> */{

    try {
        const docRef = await addDoc(collection(db, collectionId), {
          aaa: aaa,
          bbb: bbb,
          ccc: ccc,
          tagString: tagString,
          //tag: tag,
        });
      
        console.log("Document written with ID: ", docRef.id);
      } catch (e) {
        console.error("Error adding document: ", e);
    }/*追加*/
    //return "added Data!";

}
