import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import BBS from '../components/BBS'


export default function Home() {
 
  return (
    <MainLayout>
      <Head>
        <h2>Gulid Borad</h2>
      </Head>
       <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} >
        
        <BBS />
       
        </div>
      </div>
      
  
    </MainLayout>
  )
}

