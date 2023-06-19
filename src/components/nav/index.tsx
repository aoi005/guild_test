import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";
import React from "react";




const TOPICS = [
  {
    icon: "/megaphone.png",
    path: "/",
    title: "団員募集",
  },
  {
    icon: "/planning.png",
    path: "/form",
    title: "勧誘募集",
  },
  {
    icon: "/swords.png",
    path: "/topics/technology",
    title: "固定募集",
  },
  {
    icon: "/question-mark.png",
    path: "/topics/entertainment",
    title: "質問募集",
  },
  {
    icon: "/menu.png",
    path: "/topics/sports",
    title: "使いかた",
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
                <a
                 className="pointer-events-none flex place-items-center"
                href={`${topic.path}`}
                // target=""
                rel="noopener noreferrer"
          >
                {/* <Link href ={`${topic.path}`}> */}

                <button>
                  <Image
                      src={topic.icon}
                      alt=""
                      loading="eager"
                      width={33}
                      height={33}
                      priority
                    />
                    <span>{topic.title}</span>
                  </button>
                  </a>
                {/* </Link> */}
              </div>
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Nav;