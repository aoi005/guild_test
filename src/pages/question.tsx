import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import DataDisplayQuestion from '@/components/BBSquestion/DataDisplayPage';
import React from 'react';
import Load from '@/components/loadicon/loading';


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

          <DataDisplayQuestion/>

        </div>
      </div>
      
    <Load/>
    </MainLayout>
  )
}