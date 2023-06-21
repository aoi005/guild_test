import styles from "./index.module.scss";
import moment from "moment";
import Props from "../types";
import { articleData } from "./articleData";
import { tagData } from "./tagdata";
import Detai from '@/components/detail';
import { Value } from "sass";
const mongoose = require("mongoose");





// mongoose.connect(
//   "mongodb+srv://walabimoti0628:oit.guild@cluster0.r0ggqrq.mongodb.net/conpas?retryWrites=true&w=majority"
//   ).then(()=>console.log("running"));

const picked = articleData.map(item => articleData[5]);


const BBS: React.FC = () => {
  return (
    <section className={styles.bbs}>
      <ul className={styles.bbs__heading}>
        {articleData.map((bbs, index) => {
          return (
            <article className={styles.bbs__main}>
          
            <div key={bbs.id} >
             
                <a  className={`${bbs.path}`}>
                  
                <div className={styles.titlebox}>  
                  <h3 >{bbs.title}</h3>
                </div>

                <div className={styles.detailbox}>
                  <h5>{bbs.guildname}</h5>
                  <p>{bbs.detail}</p>
                </div>
                 
                {/* {picked.map((t:string, index:number) => {
                  return (
                    <div key={bbs.id} > */}
                    <div className={styles.tagbox}>{bbs.tag}</div>
                    {/* </div>
                        )
                  })}
                       */
                       }
                  <Detai />
                  


                </a>
              
            </div>
     
            </article>
          );{/* return*/}
        })};{/* articledata*/}      </ul>
     
    </section>
  );//return
};//1

export default BBS;