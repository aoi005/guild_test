import styles from "./index.module.scss";
import Image from "next/image";
import React, { Component } from "react";
import Link from "next/link";
import Popup from '../../components/Popupmenu';
import Popupsearch from "@/components/Popupserach";



function Header() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header__icon} >
        <Image
                      src="/space.png"
                      alt=""
                      loading="eager"
                      width={33}
                      height={33}
                      priority
                    />
          
        </div>
        <h1 style={{ letterSpacing: "0px", textAlign: "start" }}>
          {
            <div>
              <span style={{ fontWeight: 250 }}>Guild</span>
              <span style={{ fontWeight: 100 }}>Board</span>
             
              </div>
           }
        </h1>
        
        <Popup />

   
       
        {/* <Popupsearch/> */}

        <div className={styles.wantformbtn}>
        
        <a　 href='https://forms.gle/qZpFuNix9nzbYKXeA'>匿名要望フォーム</a>
        
          
        </div>
      </header>
    </section>
  );
}

export default Header;