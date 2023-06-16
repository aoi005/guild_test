import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import BBS from '../components/BBS'
import GroupsIcon from '@mui/icons-material/Groups';
// import Popupmenu from '@/components/Popupmenu';
import Link from "next/link";
import dynamic from 'next/dynamic'
import React from 'react';

export default function Match() {
 
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
        
        <BBS />
        {/* <Popupmenu/> */}
       
        
        </div>
      </div>
      
      </MainLayout>
    )
  }