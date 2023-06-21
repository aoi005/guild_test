import { collection, getDocs, getFirestore } from 'firebase/firestore'
import '../firebase/init'

export type Book = { //Book要素の各データ型を先に指定
    id: string
    title: string
    author: string
    price: number
  }
  
  export async function getBooks(): Promise<Book[]> {
    const books = new Array<Book>() //配列booksを定義し取得
    const db = getFirestore() //データベースをfirestoreに定義
    const booksSnapshot = await getDocs(collection(db, '/books'))
    //
  
    booksSnapshot.forEach((doc) => {
      const book = doc.data() as Book
      books.push({ ...book, id: doc.id })
    })
  
    return books
  }