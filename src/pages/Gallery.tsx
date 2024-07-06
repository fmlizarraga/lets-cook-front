
import { Button } from 'primereact/button';

import GalleryItem from "../components/GalleryItem";

export default function Gallery() {
  return (
    <>
    <section className="gallery-content" >
        <h2>Food Blog</h2>
        <div className="gallery-container">
            <GalleryItem />
        </div>
        <div className="gallery-action-container">
            <Button>All Posts</Button>
        </div>
    </section>
    <section className="about"></section>
    </>
  )
}
