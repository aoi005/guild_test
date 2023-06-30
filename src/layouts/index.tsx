import Header from "./header/index"
import styles from "./index.module.scss";


type LayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
    
      <Header />
      
      <div className={styles.background}>
 
       <main className={styles.main}>
        {children}
        </main>



        {/* <div className={styles.area}>
          <ul className={styles.circles}>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
            <li></li>
          </ul>
        </div>
 */}

      </div>
     
      

    </>
  );
}

export default MainLayout;