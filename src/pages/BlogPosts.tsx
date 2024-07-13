import { BlogNav, GalleryItem } from "../components";
import { useBlogStore } from "../hooks";

import styles from './BlogPosts.module.css';

export function BlogPosts() {
  const { posts } = useBlogStore();
  return (
    <>
      <div className={styles.blogContainer}>
        <h2>All Posts</h2>
        <BlogNav />
        <section className={styles.galleryContainer}>
          {posts.map(post => (
            <GalleryItem
            key={'post' + post.id}
            post={post}
            className={styles.galleryItem}
            />
          ))}
        </section>
      </div>
    </>
  );
}
