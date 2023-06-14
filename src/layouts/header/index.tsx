import styles from "./index.module.scss";
import Image from "next/image";
import React from "react";
import Link from "next/link";
import WidgetsIcon from '@mui/icons-material/Widgets';

function Header() {
  return (
    <section className={styles.container}>
      <header className={styles.header}>
        <div className={styles.header__icon} >
          
        </div>
        <h1 style={{ letterSpacing: "1px", textAlign: "left" }}>
          {
            <a>
              <span style={{ fontWeight: 250 }}>Guild</span>
              <span style={{ fontWeight: 100 }}>Board</span>
            </a>
           }
        </h1>
      </header>
    </section>
  );
}

export default Header;