import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import React from 'react';
import DataDisplayfight from '@/components/BBSfight/DataDisplayPage';



export default function Home() {
 
  return (
    <MainLayout>
      {/* <Head>
        
        
      </Head>  */}
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
      
      </MainLayout>
    )
  }