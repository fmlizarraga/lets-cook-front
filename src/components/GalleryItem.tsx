import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Post } from '../interfaces';
import { Tag } from 'primereact/tag';
import { Badge } from 'primereact/badge';

type PropsTypes = {
  post: Post;
};

export function GalleryItem({ post }: PropsTypes) {
  const tagsToShow = post.tags.slice(0, 3).map(tag => tag.value);

  const header = (
    <img src={post.featuredImage} alt={post.title} />
  );

  const postHeader = (
    <>
      <div className="post-metadata">
        <Avatar 
          className='post-author-avatar'
          icon="pi pi-user"
          size="normal"
          shape="circle"
        />
        <div className="post-meta-text">
          <span className="author-name">{post.author.name}</span>
          <span className="post-date">{new Date(post.timeStamp).toLocaleDateString()}</span>
        </div>
      </div>
      <span className="post-title">{post.title}</span>
    </>
  );

  const postFooter = (
    <div className="post-footer-content">
      <div className="tag-container">
        { tagsToShow.map(tag => (<Tag key={tag} value={tag} icon="pi pi-tag" rounded></Tag>) )}
      </div>
      <div className="likes-container">
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
      className='gallery-item'
      title={ postHeader } 
      subTitle={ post.summary }
      header={header}
      footer={postFooter}
    >
      <p className="m-0">
        {post.body}
      </p>
    </Card>
  )
};
