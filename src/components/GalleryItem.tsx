import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Post, getNTagsAsStrings } from '../interfaces';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';

import styles from './GalleryItem.module.css';
import { useNavigate } from 'react-router-dom';

type PropsTypes = {
  post: Post;
  className: string;
};

export function GalleryItem({ post, className }: PropsTypes) {
  const tagsToShow = getNTagsAsStrings(post.tags, 3);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/blog/posts/" + post.id);
  };

  const header = (
    <img src={post.featuredImage} alt={post.title} onClick={handleCardClick} />
  );

  const postHeader = (
    <>
      <div className={styles.postMetadata}>
        <Avatar 
          icon="pi pi-user"
          size="normal"
          shape="circle"
        />
        <div className={styles.postMetaText}>
          <span className={styles.authorName}>{post.author.name}</span>
          <span className={styles.postDate}>{new Date(post.timeStamp).toLocaleDateString()}</span>
        </div>
      </div>
      <span className={styles.postTitle} onClick={handleCardClick} >{post.title}</span>
    </>
  );

  const postFooter = (
    <div className={styles.postFooterContent}>
      <div className={styles.tagContainer}>
        { tagsToShow.map(tag => (<Tag key={tag} value={tag} icon="pi pi-tag" rounded></Tag>) )}
      </div>
      <div className={styles.likesContainer}>
        <i className='pi pi-heart-fill' style={{fontSize: '1.8rem', color: 'var(--red-400)'}} >
          <Badge value={post.likes} size='normal' style={{
            transform: 'translate(-1.65rem, -0.45rem)',
            backgroundColor: '#00000000',
            color: 'white',
            fontSize: '1.2rem'
          }} >
          </Badge>
        </i>
      </div>
    </div>
  );

  return (
    <Card
      className={className}
      title={ postHeader } 
      subTitle={ post.summary }
      header={header}
      footer={postFooter}
      pt={{
        body: {className: styles.galleryItemBody},
        header: {className: styles.galleryItemPicture}
      }}
    >
      <p>
        {post.body}
      </p>
    </Card>
  )
};
