import { useEffect, useState } from 'react';
import { runTransaction } from 'firebase/firestore';
import db from '../firebase'

import { setDoc  ,doc } from "firebase/firestore";//データ追加関数
import { DownChevron } from 'react-select/dist/declarations/src/components/indicators';

var docId = "123456";

export async function SetData(collectionId: string ,aaa:string,bbb:string,ccc:string,tagString:string[]) /*:Promise<string> */{

    try {
        const docRef = await setDoc(doc(db, collectionId,docId), {
          aaa: aaa,
          bbb: bbb,
          ccc: ccc,
          tagString: tagString,
          //tag: tag,
        });
      
        console.log("Document written with ID: ", docId);
      } catch (e) {
        console.error("Error adding document: ", e);
    }/*追加*/
    //return "added Data!";

}
