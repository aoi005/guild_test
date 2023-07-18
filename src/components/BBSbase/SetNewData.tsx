import { runTransaction, doc,getDoc ,setDoc, DocumentData} from "firebase/firestore";
import db from '../../firebase';
import { FirestoreData } from "./returnup";


//import { set } from "mongoose";
const collectionId = "posts";

//（共）fight （メ）posts （勧）solicit （疑）question疑

export async function SetNewData(firestoreData: FirestoreData,collectionId :string,storageCollectionId: string  ) {
    const storageDocId: string =collectionId + "Id";

    const storageDocRef = doc(db, storageCollectionId, storageDocId);
    
    const snap = await getDoc(storageDocRef);
    

    if (!snap.exists()) {
                setDoc(storageDocRef, {[storageDocId]: 0});
                
                throw "Document"+storageDocId +"does not exist! Create "+ storageDocId+" and set 0.";        
}/**/

    try {
        await runTransaction(db, async (transaction) => {
            
            const newId:number = Number(snap.data()[storageDocId]) + 1;//snap.data().storageDocId
            
            const newDocRef = doc(db, collectionId,String(newId).padStart(8, '0'));
            transaction.set(newDocRef,  firestoreData );
            
                transaction.update(storageDocRef, {
                    [storageDocId]: newId,
                });
            
            console.log("Add to "+collectionId+" "+String(newId).padStart(8, '0'));

        });

        console.log("Transaction completed successfully.");
    } catch (e) {
        console.error("Transaction failed: ", e);
    }/**/
}
