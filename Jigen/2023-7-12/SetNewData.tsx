import { runTransaction, doc,getDoc ,setDoc} from "firebase/firestore";
import db from '../firebase';
//import { set } from "mongoose";
const collectionId = "SetNewData";
const aaa = "aaa";
const bbb = "bbb";
const ccc = "ccc";


export async function SetNewData(){

    const sfDocRef = doc(db, 'currentId','currentId');
    
    const snap = await getDoc(sfDocRef);
    

    if (!snap.exists()) {
                setDoc(sfDocRef, {usersId: 0});
                
                throw "Document'currentId' does not exist! Create 'currentId' and set 0.";        
}/**/

    try {
        await runTransaction(db, async (transaction) => {
            
            const newId:number = Number(snap.data().usersId) + 1;
            
            const newDocRef = doc(db, collectionId,String(newId).padStart(8, '0'));
            transaction.set(newDocRef, {
                aaa: "id = " + newId,
                bbb: bbb,
                ccc: ccc,
                
            });
            
                transaction.update(sfDocRef, {
                    usersId: newId,
                });
            
            console.log("Add to "+collectionId+" "+String(newId).padStart(8, '0'));

        });

        console.log("Transaction completed successfully.");
    } catch (e) {
        console.error("Transaction failed: ", e);
    }/**/
}
