import styles from "./index.module.scss";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import WidgetsIcon from '@mui/icons-material/Widgets';
import Popupmenu from '@/components/Popupmenu';

function Header() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header__icon} >
          
        </div>
        <h1 style={{ letterSpacing: "0px", textAlign: "start" }}>
          {
            <a>
              <span style={{ fontWeight: 250 }}>Guild</span>
              <span style={{ fontWeight: 100 }}>Board</span>
              <span style={{ fontWeight: 50 }}> メンバー募集</span>
            </a>
           }
        </h1>
     
        <button style={{ letterSpacing: "20px", textAlign: "center" }} >
             <Link href="http://localhost:3000">
               表題
              </Link>
        </button>
        <button style={{ letterSpacing: "20px", textAlign: "center" }} >
            <Popupmenu />
             {/* <Link href="http://localhost:3000/form">
              
              </Link> */}
        </button>
       
      <button style={{ letterSpacing: "20px", textAlign: "center"}}> 
              {/* <Link href="http://localhost:3000/search"> */}
              検索

              {/* </Link> */}
      </button> 
       
      </header>
    </section>
  );
}

export default Header;