import Head from 'next/head'/* header で動いてる　よく分からん*/
import MainLayout from '../layouts'
import styles from '../styles/Home.module.scss'
import Nav from "../components/nav";
import BBS from '../components/BBS'
import GroupsIcon from '@mui/icons-material/Groups';


export default function search() {
 
  return (
    <MainLayout>
      <Head>
        
        
      </Head>
       <div className={styles.contents}>
        <div className={styles.nav}>
          <nav>
            <Nav />
          </nav>
        </div>
        <div className={styles.blank} />
        <div className={styles.main} >
        
        <BBS />
        <div className="z-10 w-full max-w-5xl items-center justify-between font-mono text-base lg:flex">
        <p className="fixed left-0 top-0 flex w-full justify-center border-b border-gray-300 bg-gradient-to-b from-zinc-200 pb-6 pt-8 backdrop-blur-2xl dark:border-neutral-800 dark:bg-zinc-800/30 dark:from-inherit lg:fixed left-0 top-0 lg:static  lg:border lg:bg-gray-200 lg:dark:bg-zinc-800/30">
          メンバー募集&nbsp;
        </p>
      </div>

      <div className="mx-auto max-w-2xl px-4 my-10 ">
        <form>
          <div className="flex-col">
            <label htmlFor="name">ギルド名</label>
            <input
              className="w-full"
              type="text"
              autoComplete="off"
              id="neme"
            />
          </div>
          <div className="flex-col">
            <label htmlFor="detail">詳細</label>
            <textarea
              rows={6}
              className="w-full"
              required
              name="detail"
            ></textarea>
          </div>
          <div className="grid grid-cols-12 md:grid-cols-8">
            <div className="block">
              <label>aa</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>bb</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>cc</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>dd</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>ee</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>ff</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>gg</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>hh</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>ii</label>
              <input type="checkbox"></input>
            </div>
            <div className="flex-row">
              <label>jj</label>
              <input type="checkbox"></input>
            </div>
          </div>
        </form>
        <button
          className="my-2 border-2 border-blue-400 rounded-md bg-blue-200
                           hover:bg-blue-400"
        >
          投稿
        </button>
      </div>
       
        </div>
      </div>
      
  
    </MainLayout>
  )
}