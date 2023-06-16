import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import React from "react";




const TOPICS = [
  {
    icon: "/megaphone.png",
    path: "http://localhost:3000",
    title: "　　　団員募集",
  },
  {
    icon: "/planning.png",
    path: "http://localhost:3000/match",
    title: "　　　勧誘募集",
  },
  {
    icon: "/swords.png",
    path: "http://localhost:3000",
    title: "　　　固定募集",
  },
  {
    icon: "/question-mark.png",
    path: "/form",
    title: "　　　質問募集",
  },
  {
    icon: "/menu.png",
    path: "http://localhost:3000",
    title: "　　　使いかた",
  },
];

const Nav: React.FC = () => {
  return (
    <section className={styles.container}>
      <ul className={styles.contents}>
        {TOPICS.map((topic, index) => {
          return (
            <li key={index} >
              <div id="icon">
               
                

                <button>
                <Link href={`${topic.path}`}>
                  <Image
                      src={topic.icon}
                      alt=""
                      loading="eager"
                      width={33}
                      height={33}
                      priority
                    />
                    <span>{topic.title}</span>
                  </Link>
                  </button>
               
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Nav;