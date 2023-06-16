import styles from "./index.module.scss";
import Image from "next/image";
import React, { Component } from "react";
import Link from "next/link";
import WidgetsIcon from '@mui/icons-material/Widgets';
import Popup from '@/components/Popupmenu';

function Header() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header__icon} >
          
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
      <button style={{ letterSpacing: "20px", textAlign: "center" }}>
        <Popup />
        </button>



      <button style={{ letterSpacing: "20px", textAlign: "center"}}>検索</button>
      </header>
    </section>
  );
}

export default Header;