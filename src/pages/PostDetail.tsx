import { useRef } from 'react';
import { useParams } from 'react-router-dom';
import { Card } from 'primereact/card';
import { useBlogStore } from "../hooks";
import { Avatar } from 'primereact/avatar';
import { Image } from 'primereact/image';
import { Button } from 'primereact/button';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { getNTagsAsStrings } from '../interfaces';
import { Tag } from 'primereact/tag';

import styles from './PostDetail.module.css';
import { CommentSection } from '../components';

export function PostDetail() {
  const { posts } = useBlogStore();
  let { postId } = useParams();

  const post = posts.find(post => post.id === postId);

  const optionsMenu = useRef<Menu>(null);

  if(post) {
    let postDate = new Date(post.timeStamp).toLocaleDateString();

    const optionsMenuItems: MenuItem[] = [
      {
        label: 'Options',
        items: [
          {
            label: 'share',
            icon: 'pi pi-share-alt'
          }
        ],
      }
    ];

    const header = (
      <div className={styles.postHeader}>
        <Menu model={optionsMenuItems} popup ref={optionsMenu} id="popup-menu-options" />
        <div className={styles.postMetadata}>
          <Avatar
            className={styles.postAuthorAvatar}
            icon="pi pi-user"
            size="normal"
            shape="circle"
          />
          <div className={styles.postMetaText}>
            <span className={styles.authorName}>{post.author.name}</span>
            <span className={styles.postDate}>{postDate}</span>
          </div>
        </div>
        <Button icon="pi pi-ellipsis-h" severity='secondary' size='small' text rounded onClick={(e) => optionsMenu.current?.toggle(e)} aria-haspopup />
      </div>
    );

    const footer = (
      <div className={styles.postFooter}>
        <div className={styles.postFooterSection}>
          <div className={styles.shareLinks}>
            <ul>
              <li><a href="#" className="footer-link pi pi-facebook"></a></li>
              <li><a href="#" className="footer-link pi pi-twitter"></a></li>
              <li><a href="#" className="footer-link pi pi-linkedin"></a></li>
              <li><a href="#" className="footer-link pi pi-link"></a></li>
            </ul>
          </div>
          <div className={styles.footerTags}>
            {
              getNTagsAsStrings(post.tags, 2).map(tag => (<Tag key={tag} value={tag} icon="pi pi-tag" rounded></Tag>))
            }
          </div>
        </div>
        <div className={styles.postFooterSection}>
          <div className={styles.commentCounter}>
            <div>
              <i className='pi pi-comments' style={{color: 'var(--green-400)'}}>
                <span> { post.comments? post.comments.length : 0 }</span>
              </i>
            </div>
          </div>
          <div className={styles.likesCounter}>
            <div className={styles.likesContainer}>
              <i className='pi pi-heart-fill' style={{color: 'var(--red-400)'}} >
                <span> {post.likes}</span>
              </i>
            </div>
          </div>
        </div>
      </div>
    );
    return (
      <>
        <article className={styles.postContainer}>
            <Card
              className={styles.postInner}
              header={ header }
              title={ post.title }
              subTitle={ post.summary }
              footer={footer}
              pt={{
                title: {
                  className: styles.postTitle,
                },
                content:{
                  className: styles.postContent,
                },
                subTitle: {
                  className: styles.postSummary,
                }
              }}
            >
              <div className={styles.postImgContainer}>
                <Image className={styles.postImg} src={post?.featuredImage} alt={post?.title} width="500" preview />
              </div>
              <p>
                {post.body}
              </p>
            </Card>
        </article>
        <div className={styles.commentBox}>
          <CommentSection />
        </div>
      </>
    );
  }
  else {
    return (
      <article className={styles.postContainer}>
        <h2 className={styles.postTitle}>Not Found</h2>
        <p className={styles.postSummary}>The post you are looking for doesn't exist or was deleted.</p>
      </article>
    )
  }
};