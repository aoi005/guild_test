import styles from "./index.module.scss";
import moment from "moment";
import Props from "../types";
import { articleData } from "./articleData";


const BBS: React.FC = () => {
  return (
    <section className={styles.bbs}>
      <ul className={styles.bbs__heading}>
        {articleData.map((bbs, index) => {
          return (
            <article className={styles.bbs__main}>
          
            <div key={index} >
             <div className={styles.bbs__title}>
                <a id ={`${bbs.path}`}>
                  
                  <h2>{bbs.title}</h2>

                  <button>
                  <span>{bbs.tag}</span>
                  </button>
                </a>
              </div>
            </div>
     
            </article>
          );
        })}
      </ul>
     
    </section>
  );
};

export default BBS;