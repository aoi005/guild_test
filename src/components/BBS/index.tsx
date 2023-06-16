import styles from "./index.module.scss";
import moment from "moment";
import Props from "../types";
import { articleData } from "./articleData";
import Detai from '@/components/detail';


const BBS: React.FC = () => {
  return (
    <section className={styles.bbs}>
      <ul className={styles.bbs__heading}>
        {articleData.map((bbs, index) => {
          return (
            <article className={styles.bbs__main}>
          
            <div key={bbs.id} >
             <div className={styles.bbs__title}>
                <a id ={`${bbs.path}`}>
                  
                <h2>{bbs.title}</h2>

                  <p>{bbs.detail}</p>

                 <button>
                 
                    <div>{bbs.tag}</div>
                 
                  </button>
                  <Detai   />
                  


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