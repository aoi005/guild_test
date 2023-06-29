import { collection, onSnapshot } from "firebase/firestore";
import React, { useEffect, useState } from "react";
import db from "./firebase";

interface Post {
  title: string;
  detail: string;
  created_at: Date;
  tags: string[];
}

const getStrTime = (time: string | number | Date) => {
  let t = new Date(time);
  return `${t.getFullYear()}/${
    t.getMonth() + 1
  }/${t.getDate()} ${t.getHours()}:${t.getMinutes()}:${t.getSeconds()}`;
};

const AllPosts = () => {
  const [posts, setPosts] = useState<Post[]>([]);

  useEffect(() => {
    const unsubscribe = onSnapshot(collection(db, "posts"), (posts) => {
      const sortedPosts = posts.docs
        .map((post) => {
          const postData = post.data() as Post;
          return {
            ...postData,
            created_at: new Date(postData.created_at),
          };
        })
        .sort((a, b) => b.created_at.getTime() - a.created_at.getTime());

      setPosts(sortedPosts);
    });
    return () => unsubscribe();
  }, []);

  return (
    <>
      <p>投稿一覧</p>
      {posts.map((post) => (
        <div className="post" key={post.title}>
          <div className="title">タイトル：{post.title}</div>
          <div className="content">内容：{post.detail}</div>
          <div className="created_at">
            投稿日：{getStrTime(post.created_at)}
          </div>
          
        </div>
      ))}
    </>
  );
};

export default AllPosts;