import styles from "./index.module.scss";
import moment from "moment";
import Props from "../types";
import { articleData } from "./articleData";
import Detai from '@/components/detail';
const mongoose = require("mongoose");



// mongoose.connect(
//   "mongodb+srv://walabimoti0628:oit.guild@cluster0.r0ggqrq.mongodb.net/conpas?retryWrites=true&w=majority"
//   ).then(()=>console.log("running"));



const BBS: React.FC = () => {
  return (
    <section className={styles.bbs}>
      <ul className={styles.bbs__heading}>
        {articleData.map((bbs, index) => {
          return (
            <article className={styles.bbs__main}>
          
            <div key={bbs.id} >
             
                <a id ={`${bbs.path}`}>
                  
                <div className={styles.titlebox}>  
                  <h3 >{bbs.title}</h3>
                </div>

                <div className={styles.detailbox}>
                  <p>{bbs.detail}</p>
                </div>
                 
                    <div className={styles.tagbox}>{bbs.tag}</div>
                 
                  
                  <Detai  />
                  


                </a>
              
            </div>
     
            </article>
          );
        })}
      </ul>
     
    </section>
  );
};

export default BBS;