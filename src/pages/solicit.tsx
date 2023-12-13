import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from '../layouts'
import Head from "next/head";
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import DataDisplaysolicit from "@/components/BBSsolicit/DataDisplayPage";
import Load from "@/components/loadicon/loading";
import Script from "next/script";


const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  return (
    <MainLayout>
      {/* <head>  
      <meta name="google-adsense-account" content="ca-pub-2205391985510668"/> 
      <Script
        async
        src="https://pagead2.googlesyndication.com/pagead/js/adsbygoogle.js?client=ca-pub-2205391985510668"
        crossOrigin="anonymous"
      />
      </head> */}
       <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} >
        
          <DataDisplaysolicit />
      
       
        </div>
      </div>
      
    <Load/>
    </MainLayout>
  )
}
