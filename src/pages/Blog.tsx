import { Link } from "react-router-dom";
import { GalleryItem } from "../components";
import { useBlogStore } from "../hooks";
import styles from './Blog.module.css';
import galleryItemStyles from './BlogItem.module.css';

export function Blog() {
  const { posts } = useBlogStore();
  return (
    <>
      <div className={styles.blogContainer}>
        <h2>All Posts</h2>
        <div className={styles.blogHeader}>
          <ul>
            <li><Link to="/blog">All Posts</Link></li>
            <li><Link to="/categories/quick-easy">Quick & Easy</Link></li>
            <li><Link to="/categories/vegetarian">Vegetarian</Link></li>
            <li><Link to="/categories/main-course">Main Course</Link></li>
          </ul>
        </div>
        <section className={styles.galleryContainer}>
          {posts.map(post => (
            <GalleryItem
            key={'post' + post.id}
            post={post}
            className={galleryItemStyles.galleryItem}
            />
          ))}
        </section>
      </div>
    </>
  );
}
