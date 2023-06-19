import styles from "./index.module.scss";
import Image from "next/image";
import React, { Component } from "react";
import Link from "next/link";
import WidgetsIcon from '@mui/icons-material/Widgets';
import Popup from '../../components/Popupmenu';



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
              <span style={{ fontWeight: 50 }}> メンバー募集</span>
              </div>
           }
        </h1>
      <button >
        <Popup />
         </button>


      <div>
        <button>
        <a  className="btn-square-so-pop"
            href="http://localhost:3000/search"
            // target=""
            // rel="noopener noreferrer"
            >
             
              検索
              
        </a>
        </button>
      </div>
      </header>
    </section>
  );
}

export default Header;