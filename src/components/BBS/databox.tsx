import styles from './index.module.scss'
import FORM from '@/components/FORM';
import db from '@/firebase';
import  React, { useEffect, useState } from 'react';
import { collection,getDocs } from 'firebase/firestore';
import { DocumentData } from 'firebase/firestore';
import Detai from '@/components/detail';
import Description from '../detail/description';

function AppData(){
    const [posts, setPosts] = useState<DocumentData[]>([]);
  
    useEffect(() => {
      const fetchPosts = async () => {
        try {
          // データ取得
          const postData = collection(db, 'posts');
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

// SomeComponentコンポーネント
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
                    {Array.isArray(post.tag) ? (
                      post.tag.map((tag, tagIndex) => (
                        <div key={tagIndex} className={styles.tagbox}>
                          {tag}
                        </div>
                      ))
                    ) : (
                      <div className={styles.tagbox}>{post.tag}</div>
                    )}
            </div>
                      
            <Description  detail={post.detail}/>

          </div>
        </article>
      ))}
      </ul>
    </section>
  );
}

export default AppData;

