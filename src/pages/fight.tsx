import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import React from 'react';
import DataDisplayfight from '@/components/BBSfight/DataDisplayPage';
import Load from '@/components/loadicon/loading';
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
       <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} >
        
      
        <DataDisplayfight/>
       
        
        </div>
      </div>
      
      <Load/>
      </MainLayout>
    )
  }