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
