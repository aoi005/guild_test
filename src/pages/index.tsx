import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import AppData from '@/components/BBS/databox';
import DataDisplayPage from '@/components/Firebase/DataDisplayPage';





export default function Home() {
 
  return (
    <MainLayout>
      <Head>
      <div><title>＃コンパスギルドメンバー募集掲示板</title></div>
        
      </Head>
      
       <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
      
        <div className={styles.main} >


       
        <DataDisplayPage/>

        
        {/* <AllPosts/> */}
        {/* <AppData /> */}
        
        
        {/* <BBS /> */}
   
       
        </div>
      </div>
      
  
    </MainLayout>
  )
}

