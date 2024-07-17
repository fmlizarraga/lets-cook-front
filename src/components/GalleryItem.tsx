import { useNavigate } from 'react-router-dom';
import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';
import { Post } from '../interfaces';
import { getNTagsAsStrings, sanitizeHTML } from '../utils/blog';

import styles from './GalleryItem.module.css';

type PropsTypes = {
  post: Post;
  classNames: {
    card: string;
    image: string;
  }
};

export function GalleryItem({ post, classNames }: PropsTypes) {
  const tagsToShow = getNTagsAsStrings(post.tags, 3);

  const navigate = useNavigate();

  const handleCardClick = () => {
    navigate("/blog/" + post.id);
  };

  const header = (
    <img src={post.featuredImage} alt={post.title} onClick={handleCardClick} />
  );

  const postHeader = (
    <>
      <div className={styles.postMetadata}>
        <Avatar
          image={post.author.picture}
          imageAlt={post.author.name}
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
      className={classNames.card}
      title={ postHeader } 
      subTitle={ post.summary }
      header={header}
      footer={postFooter}
      pt={{
        header: {className: classNames.image},
        body: {className: styles.galleryItemBody},
        subTitle: {
          className: styles.postSubTitle,
          onClick: handleCardClick
        },
        content: {style:{paddingTop:0}}
      }}
    >
      <div
        className={styles.postBodyContent}
        dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.body) }}
      />
    </Card>
  )
};
