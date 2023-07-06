import Header from "../layouts/header/index"
import styles from "./index.module.scss";


type LayoutProps = {
  children: React.ReactNode;
};

function MainLayout({ children }: LayoutProps): JSX.Element {
  return (
    <>
      <Header />
      <div className={styles.background}>
        {/*こことここのscssを変更後にHome.module.scssも変更するべし*/}
        {/* <div className={styles.area}> */}
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
        {/* </div> */}
        <main className={styles.main}>{children}</main>
        
      </div>
    </>
  );
}

export default MainLayout;