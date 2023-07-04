import { runTransaction, doc, setDoc } from "firebase/firestore";
import db from '../firebase';

export async function CreateId(collectionId: string , documentId: string){

    const sfDocRef = doc(db, collectionId, documentId);
    try {
        await runTransaction(db, async (transaction) => {
            const snap = await transaction.get(sfDocRef);

            if (!snap.exists()) {//undefinedの場合のエラーを防ぐ
                throw "Document does not exist!";
            }
            const currentUserId = snap.data().userId;

            if (typeof currentUserId !== 'number') {//number型でない場合のエラーを防ぐ
                throw "Invalid user ID!";
            }
            

            await transaction.set(sfDocRef, {//setDocはだめらしい
                userId: currentUserId + 1,
            });
        });

        console.log("Transaction completed successfully.");
    } catch (e) {
        console.error("Transaction failed: ", e);
    }
}
