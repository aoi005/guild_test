import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import BBS from '../components/BBS'
import GroupsIcon from '@mui/icons-material/Groups';
import FORM from '@/components/FORM';


export default function Home() {
 
  return (
    <MainLayout>
      <Head>
        
        
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
        {/* <FORM/> */}
       
        </div>
      </div>
      
  
    </MainLayout>
  )
}

