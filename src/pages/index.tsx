/*import { useState, useEffect } from 'react';

export default function Home() {
  const [users, setUsers] = useState([]);
  useEffect(() => {
    const fetchUsers = async () => {
      const response = await fetch('/api/users');
      const data = await response.json();
      setUsers(data.users);
    };
    fetchUsers();
  }, []);

  return (
    <div>
      <ul>
        {users.map((user) => (
          <li key={user.id}>{user.name}</li>
        ))}
      </ul>
    </div>
  );
}*/

import type { NextPage } from 'next'
import { getApp, FirebaseApp } from 'firebase/app'
import { getFirestore, Firestore } from 'firebase/firestore'
import { BookTable } from '../components/BookTable'

const Home: NextPage = () => {
  const app: FirebaseApp = getApp()
  const firestore: Firestore = getFirestore()
  return (
  <>
    <ul>
      <li>name = {app.name}</li>
      <li>appId = {app.options.appId}</li>
      <li>apiKey = {app.options.apiKey}</li>

    </ul>

    <BookTable />
    </>
  )
}

export default Home

/*
export default function Home(){
  return(<>
  <nav>
    <ul>
      <li><a href="http://localhost:3000/">Top</a></li>
      <li><a href="#">投稿</a></li>
      <li><a href="#">検索</a></li>
    </ul>
  </nav>

  <div className="menu">
    <ul>
      <li><a href="#">メンバー募集</a></li>
      <li><a href="#">勧誘待ち</a></li>
      <li><a href="#">固定募集</a></li>
      <li><a href="#">質問</a></li>
      <li><a href="#">HELP</a></li>
    </ul> 
  </div>
    
  <main>
    <div className="main">
      {/*<h1><a href='http://localhost:3000/about'>link付き</a></h1>/}
      <h1>・勧誘待ち一覧</h1>
      {/*<p>改行の問題、ヨシ!</p>/}

      <div className="prethings">
        <h1>

        </h1>
      </div>
    
    </div>  

  </main>

  </>
  )
}
*/