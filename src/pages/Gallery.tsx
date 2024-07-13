import { useEffect } from "react";
import { GalleryItem } from "../components";
import { useBlogStore } from '../hooks';
import { Link } from 'react-router-dom';
import styles from './Gallery.module.css';

export function Gallery() {
  const { posts, loadPosts } = useBlogStore();
  useEffect(() => {
    try {
        loadPosts();
    } catch (error) {
        if(error instanceof Error) console.error(error);
    }
}, []);

  return (
    <>
      <section className={styles.galleryContent}>
        <h2>Food Blog</h2>
        <div className={styles.galleryContainer}>
          {posts.map(post => (
            <GalleryItem
            key={'post' + post.id}
            post={post}
            classNames={{card: styles.galleryItem, image: styles.galleryItemPicture}}
            />
          ))}
        </div>
        <div className={styles.galleryActionContainer}>
          <Link className='p-button' to='/blog'>All Posts</Link>
        </div>
      </section>
      <section className={styles.about}></section>
    </>
  );
}
