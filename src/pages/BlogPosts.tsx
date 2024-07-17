import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { BlogNav, GalleryItem } from "../components";
import { useBlogStore } from "../hooks";
import { Post } from "../interfaces";

import styles from './BlogPosts.module.css';

export function BlogPosts() {
  const { posts, setTagsFilter, clearTagsFilter, getFilteredPosts, tagFilter } = useBlogStore();
  const { filter } = useParams();

  const [postsToShow, setPostsToShow] = useState<Post[]>(posts);

  useEffect(() => {
    if (filter) {
      setTagsFilter(filter);
    } else {
      clearTagsFilter();
    }
  }, [filter, setTagsFilter, clearTagsFilter]);

  useEffect(() => {
    if (tagFilter) {
      setPostsToShow(getFilteredPosts());
    } else {
      setPostsToShow(posts);
    }
  }, [tagFilter, posts, getFilteredPosts]);
  

  return (
    <>
      <div className={styles.blogContainer}>
        <h2>All Posts</h2>
        <BlogNav />
        <section className={styles.galleryContainer}>
          {postsToShow.length > 0 ? (
            postsToShow.map(post => (
              <GalleryItem
                key={'post' + post.id}
                post={post}
                classNames={{ card: styles.galleryItem, image: styles.galleryItemPicture }}
              />
            ))
          ) : (
            <h2 style={{ position: 'relative', width: '200%', maxWidth: '960px' }}>No posts found</h2>
          )}
        </section>
      </div>
    </>
  );
}
