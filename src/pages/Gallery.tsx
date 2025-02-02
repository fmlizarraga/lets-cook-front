import { useEffect } from "react";
import { GalleryItem } from "../components";
import { useBlogStore, useUIStore } from '../hooks';
import { Link } from 'react-router-dom';
import styles from './Gallery.module.css';

export function Gallery() {
  const { posts, loadPosts } = useBlogStore();
  const {pushMessage} = useUIStore();
  useEffect(() => {
    try {
        loadPosts();
    } catch (error) {
      console.error(error);
      if(error instanceof Error) pushMessage('error', error.message);
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
