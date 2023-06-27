import { collection, addDoc } from "firebase/firestore"; 
import  db  from '../../firebase';  

export async function addData(collectionId:string, data:any) {
  
  try {
    const docRef = await addDoc(collection(db, collectionId), data);
    console.log("Document written with ID: ", docRef.id);
    return docRef.id;  // Return the ID of the new document
  } catch (e) {
    console.error("Error adding document: ", e);
  }
}
