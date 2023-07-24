import Image from "next/image";
import { Inter } from "next/font/google";
import MainLayout from '../layouts'
import Head from "next/head";
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import DataDisplaysolicit from "@/components/BBSsolicit/DataDisplayPage";
import Load from "@/components/loadicon/loading";



const inter = Inter({ subsets: ["latin"] });

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
        
          <DataDisplaysolicit />
      
       
        </div>
      </div>
      
    <Load/>
    </MainLayout>
  )
}
