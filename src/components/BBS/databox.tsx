import styles from './index.module.scss'
import FORM from '@/components/FORM';
import db from '@/firebase';
import  React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';
import Detai from '@/components/detail';
import Description from '../detail/description';
import { query, orderBy, limit,collection,getDocs  } from "firebase/firestore"; 
import { TagDisplay } from '../Firebase/tagsort';

interface TagFields {
  [key: string]: boolean;
}

interface FirestoreData {
  id: string;
  title: string;
  name: string;
  tag: TagFields;
  detail: string;
  time:string;
}

const getStrTime = (time: string | number | Date) => {
  let t = new Date(time);
  return `${t.getFullYear()}/${
    t.getMonth() + 1
  }/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;//ミリ秒データを日付変換
};

function AppData(){
    const [posts, setPosts] = useState<DocumentData[]>([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          // データ取得
          const postData = collection(db, 'posts')
          const snapShot = await getDocs(postData);
          const fetchedPosts = snapShot.docs.map((doc) => doc.data());
          
          setPosts(fetchedPosts);
        } catch (error) {
          console.error('Error fetching posts:', error);
        }
      };
      

      fetchPosts();
    }, []);
  

    return <SomeComponent posts={posts} />;
}

// SomeComponentコンポーネント　実際の表示を行う
function SomeComponent({ posts }: { posts: DocumentData[] }) {
  return (
    <section className={styles.bbs}>
      <ul className={styles.bbs__heading}>
      {posts.map((post) => (
        <article className={styles.bbs__main} key={post.id}>
          <div>
            <div className={styles.titlebox}>
                    <h3>{post.title}</h3>
            </div>

            <div className={styles.detailbox}>
                    <h5>ギルド名：{post.name}</h5>
                    <br></br>
                    <p>詳細文：{post.detail}</p>
                    <br></br>
            </div>

            <div className={styles.tagContainer}>
                  <TagDisplay tag={post.tag} />
                    {/* {Array.isArray(post.tag) ? (
                      post.tag.map((tag, tagIndex) => (
                        <div key={tagIndex} className={styles.tagbox}>
                          {tag}
                        </div>
                      ))
                    ) : (
                      <div className={styles.tagbox}>{post.tag}</div>
                    )} */}
            </div>
                      
            <Description  detail={post.detail}/>

          </div>
          <p>{getStrTime(post.time)}</p>
        </article>
      ))}
      </ul>
    </section>
  );
}

export default AppData;

