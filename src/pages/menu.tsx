import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import Script from 'next/script';


export default function Home() {
 
  return (
    <MainLayout>
      <head>  
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2205391985510668"
        crossOrigin="anonymous"
      />
      </head>
      <body>
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
      </body>
  
    </MainLayout>
  )
}

