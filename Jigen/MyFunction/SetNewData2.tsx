import { doc, setDoc, getDoc } from "firebase/firestore";
import db from '../firebase';

export async function SetNewData(collectionId: string ,aaa:string,bbb:string,ccc:string,tagString:string[]){

    const sfDocRef = doc(db, '0', '0');
    
    try {
        const snap = await getDoc(sfDocRef);

        if (!snap.exists()) {//undefinedの場合のエラーを防ぐ
            throw "Document does not exist!";
        }

        const currentUserId = snap.data().usersId;
        
        console.log(currentUserId);
        console.log(currentUserId+1);

        
        
        await setDoc(sfDocRef, {

            usersId: currentUserId + 1,
            
        });

        await setDoc(doc(db, collectionId,String(currentUserId+ 1 )), {
            aaa: aaa,
            bbb: bbb,
            ccc: ccc,
            tagString: tagString,
            //tag: tag,
        });

        console.log("Data added successfully.");
    } catch (e) {
        console.error("Error adding document: ", e);
    }
}
