import Link from "next/link";
import styles from "./index.module.scss";
import Image from "next/image";

const TOPICS = [
  {
    icon: "01",
    path: "/",
    title: "団員募集",
  },
  {
    icon: "03",
    path: "/topics/business",
    title: "勧誘募集",
  },
  {
    icon: "04",
    path: "/topics/technology",
    title: "固定募集",
  },
  {
    icon: "05",
    path: "/topics/entertainment",
    title: "質問募集",
  },
  {
    icon: "06",
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
             
                <a id ={`${topic.path}`}>
                  <span>
                   
                  </span>
                  <button>
                  <span>{topic.title}</span>
                  </button>
                </a>
      
            </li>
          );
        })}
      </ul>
    </section>
  );
};

export default Nav;