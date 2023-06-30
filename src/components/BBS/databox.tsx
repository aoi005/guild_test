import styles from './index.module.scss'

import db from '@/firebase';
import  React, { useEffect, useState } from 'react';
import { DocumentData } from 'firebase/firestore';

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
  const [filter, setFilter] = useState('');

  const FilterChange = (selectedFilter: string) => {
    setFilter(selectedFilter);
  };

  const filteredPosts = posts.filter((post) => {
   
    if (filter === 'Able') {
      return post.tag.Able === true;
    } else if (filter === 'Bravo') {
      return post.tag.Bravo === true;
    } else if (filter === 'Charley') {
      return post.tag.Charley === true;
    } else {
      return true; // 絞り込み条件がない場合はすべての投稿を表示
    }
  });


  return (
    <section className={styles.bbs}>
      <div>
        <button onClick={() => FilterChange('Able')}>Able</button>
        <button onClick={() => FilterChange('Bravo')}>Bravo</button>
        <button onClick={() => FilterChange('Charley')}>Charley</button>
        <button onClick={() => FilterChange('')}>All</button>
      </div>
      <ul className={styles.bbs__heading}>
      {filteredPosts.map((post) => (
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

