import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import BBS from '../components/BBS';
//import GroupsIcon from '@mui/icons-material/Groups';
import FORM from '@/components/FORM';
import db from '@/firebase';
import { useEffect, useState } from 'react';
import AppData from '@/components/BBS/databox';
import App from 'next/app';


import {GetData} from '../MyFunction/GetData';
import {MyType} from '../MyFunction/GetData';


export default function Home() {
  
  
  const [data, setData] = useState<MyType[]>([]);

  useEffect(() => {
    GetData("users","123").then(gotData => {
      setData(gotData);
    }).catch(error => {
      console.error("Error fetching data: ", error);
    });
  }, []);

/*GetData().then(usersArray => {
  setData(usersArray); // logs the result array to the console
}).catch(error => {
  console.error("Error fetching data: ", error);
});
*/
  return (
    <MainLayout>
      <Head>
        {/* Meta data */}
      </Head>
      <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} >
          
          {data.map((item, index) => (
            <div key={index}>
              <p>{item.aaa}</p> 
              <p>{item.bbb}</p>
              <p>{item.ccc}</p>
              
            </div>
          ))}
          <AppData />
        </div>
      </div>
    </MainLayout>
  )
}
