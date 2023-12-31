import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import DataDisplayQuestion from '@/components/BBSquestion/DataDisplayPage';
import React from 'react';
import Load from '@/components/loadicon/loading';
import Script from 'next/script';

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

          <DataDisplayQuestion/>

        </div>
      </div>
      
    <Load/>
    </MainLayout>
  )
}