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
 
       <main className={styles.main}>{children}</main>

      </div>
     
      

    </>
  );
}

export default MainLayout;