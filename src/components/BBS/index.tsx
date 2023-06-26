import styles from "./index.module.scss";
import moment from "moment";
import Props from "../types";
// import { AppData } from "../data/databox";
import { articleData } from "./articleData";
import Detai from '@/components/detail';
import { Value } from "sass";
const mongoose = require("mongoose");

// mongoose.connect(
//   "mongodb+srv://walabimoti0628:oit.guild@cluster0.r0ggqrq.mongodb.net/conpas?retryWrites=true&w=majority"
//   ).then(()=>console.log("running"));

// const post = AppData();


const BBS: React.FC = () => {
  return (
    <section className={styles.bbs}>
      <ul className={styles.bbs__heading}>
        {articleData.map((bbs, index) => {
          return (
            <article className={styles.bbs__main} key={index}>
              <div>
                <a className={`${bbs[5]}`}>
                  <div className={styles.titlebox}>
                    <h3>{bbs[2]}</h3>
                  </div>
                  <div className={styles.detailbox}>
                    <h5>ギルド名：{bbs[1]}</h5>
                    <p>{bbs[3]}</p>
                  </div>
                  <div className={styles.tagContainer}>
                    {Array.isArray(bbs[4]) ? (
                      bbs[4].map((tag, tagIndex) => (
                        <div key={tagIndex} className={styles.tagbox}>
                          {tag}
                        </div>
                      ))
                    ) : (
                      <div className={styles.tagbox}>{bbs[4]}</div>
                    )}
                  </div>
                  <Detai />
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
