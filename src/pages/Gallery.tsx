import { useEffect } from 'react';
import { Button } from 'primereact/button';
import { GalleryItem } from "../components";

import '../assets/styles/gallery.css';
import { useBlogStore } from '../hooks';

export function Gallery() {
  const { loadPosts, posts } = useBlogStore();

  useEffect(() => {
    loadPosts();
  }, [])
  
  return (
    <>
    <section className="gallery-content" >
        <h2>Food Blog</h2>
        <div className="gallery-container">
          { posts.map( post => (<GalleryItem key={ "post" + post.id} post={post} />)) }
        </div>
        <div className="gallery-action-container">
            <Button>All Posts</Button>
        </div>
    </section>
    <section className="about"></section>
    </>
  )
}
