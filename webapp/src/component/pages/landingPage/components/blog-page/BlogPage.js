// components/BlogPage.js

import React from 'react';
import styles from './BlogPage.module.css'; 
import { blogData } from '../../webData';
import Link from 'next/link';

const BlogPage = () => {
  return (
    <div className={styles.blogPage}>
        <h2>Featured News</h2>
      {blogData.slice(0, 3).map((post) => (
        <div key={post.id} className={styles.blogPost}>
          <h3 className={styles.postTitle}>{post.title}</h3>
          <p className={styles.postContent}>{post.content.slice(0, 140)}</p> 
          <Link href="#" className={styles.readMoreLink}>
            Read More
          </Link>
        </div> 
      ))}
    </div>
  );
};

export default BlogPage;
