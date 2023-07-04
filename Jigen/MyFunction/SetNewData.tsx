import { runTransaction, doc,getDoc } from "firebase/firestore";
import db from '../firebase';

export async function SetNewData(collectionId: string ,aaa:string,bbb:string,ccc:string,tagString:string[]){

    const sfDocRef = doc(db, 'currentId','currentId');
    //console.log(sfDocRef);
    
    const snap = await getDoc(sfDocRef);
    

    if (!snap.exists()) {
                throw "Document does not exist!";
            }/**/

    try {
        await runTransaction(db, async (transaction) => {
            
            const newId:number = Number(snap.data().usersId) + 1;
            
            const newDocRef = doc(db, collectionId,String(newId).padStart(8, '0'));
            transaction.set(newDocRef, {
                aaa: aaa,
                bbb: bbb,
                ccc: ccc,
                tagString: tagString,
            });
            
            if (snap.exists()) {
                transaction.update(sfDocRef, {
                    usersId: newId,
                });
            } else {                        //undefinedの場合
                transaction.set(sfDocRef, {
                    usersId: 10000000,
                });
            }
            
            console.log(String(newId).padStart(8, '0'));

        });

        console.log("Transaction completed successfully.");
    } catch (e) {
        console.error("Transaction failed: ", e);
    }/**/
}
