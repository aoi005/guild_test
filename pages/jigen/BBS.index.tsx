import styles from "./index.module.scss";
//import moment from "moment";
import Props from "../types";
import { articleData } from "./articleData";
import Detail from '@/components/detail';
import {Article} from './Article'





const BBS: React.FC = () => {
  return (
    <section className={styles.bbs}>
      <ul className={styles.bbs__heading}>
      <Article/>
        {/*articleData.map((bbs, index) => {
            return<Article/>;
      
        })*/}
      </ul>
     
    </section>
  );
};

export default BBS;
/*
const BBS: React.FC = () => {
  return (
    <section className={styles.bbs}>
      <ul className={styles.bbs__heading}>
        {articleData.map((bbs, index) => {
          return (
            <article className={styles.bbs__main}>
              <Article/>
          
          <div key={bbs.id} >
             <div className={styles.bbs__title}>
                <a id ={`${bbs.path}`}>
                  
                <h2>{bbs.title}</h2>

                  <p>{bbs.detail}</p>

                 <button>
                 
                    <div>{bbs.tag}</div>
                 
                  </button>
                  <Detail   />
                  


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

export default BBS;/* */
