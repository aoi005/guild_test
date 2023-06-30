
import { useEffect, useState } from 'react';
import db from '../firebase'

import { doc, getDocs ,collection} from "firebase/firestore";
import { query,where} from "firebase/firestore";



var collectionId = "users";
var documentId = "123";

export type MyType = [{
    aaa: string;
    bbb: string;
    ccc: string;

}];
export async function SearchArrayGetDatas(collectionId: string ,array:any,value:any): Promise<any[]> {

    const q = query(collection(db, collectionId), where(array, "array-contains", value)/**/ );
    const querySnapshot = await getDocs(q);

    const posts = querySnapshot.docs.map((doc) => doc.data());
    return posts;
}
