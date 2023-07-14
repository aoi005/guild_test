import styles from "./index.module.scss";



function Load(){
  return (
    <>
      <div className={styles.loading}>
          <div className={styles.loading_img}>
            <span></span>
            <span></span>
            <span></span>
            <span></span>
          </div>
          <div className={styles.loading_text}>
            now loading..
          </div>
      </div>
    </>
  );
}

export default Load;