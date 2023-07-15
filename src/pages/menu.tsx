import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";


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
        
                 
        <h1>現在準備中です</h1>
        <span></span>恐れ入りますが<a　href='https://twitter.com/conpasguildbord'>こちら</a><span>のTwitterアカウントからご確認ください。</span>
      
        </div>
      </div>
      
  
    </MainLayout>
  )
}

