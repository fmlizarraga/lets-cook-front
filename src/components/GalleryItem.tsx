import { Card } from 'primereact/card';
import { Avatar } from 'primereact/avatar';
import { Post } from '../interfaces';

type PropsTypes = {
  post: Post;
};

export function GalleryItem({ post }: PropsTypes) {
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

  return (
    <Card
      className='gallery-item'
      // title={ post.title } 
      title={ postHeader } 
      subTitle={ post.summary }
      header={header}
    >
      <p className="m-0">
        {post.body}
      </p>
    </Card>
  )
};
