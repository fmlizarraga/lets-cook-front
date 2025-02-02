import { useRef } from 'react';
import { useLocation, useNavigate, useParams } from 'react-router-dom';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Image } from 'primereact/image';
import { Menu } from 'primereact/menu';
import { MenuItem } from 'primereact/menuitem';
import { Tag } from 'primereact/tag';
import { useAuthStore, useBlogStore, useUIStore } from "../hooks";
import { BlogNav, CommentSection } from '../components';
import { getNTagsAsStrings, sanitizeHTML } from '../utils/blog';
import { canEditPost, isMod } from '../utils/user';
import { copyContent } from '../utils/ui';

import styles from './PostDetail.module.css';

export function PostDetail() {
  const navigate = useNavigate();
  const location = useLocation();
  const { posts, approvePost, hidePost, setPostDeleted } = useBlogStore();
  const { user } = useAuthStore();
  const { pushMessage } = useUIStore();
  let { postId } = useParams();

  const post = posts.find(post => post.id === postId);
  
  const optionsMenu = useRef<Menu>(null);
  
  if(post) {
    let postDate = new Date(post.timeStamp).toLocaleDateString();

    const handleEditOption = () => {
      navigate('./edit', {relative: "path"});
    };

    const acceptDelete = async () => {
      try {
        await setPostDeleted(post);
        pushMessage('success', 'Deleted post.')
        navigate('/blog');
      } catch (error) {
        pushMessage('error', 'There was a problem when trying to delete, please try again later.')
      }
    };

    const reject = () => {
      pushMessage('info', 'Canceled action.')
    };

    const confirmDelete = () => {
      confirmDialog({
          message: 'Are you sure you want to delete this post?',
          header: 'Confirm Deletion',
          icon: 'pi pi-exclamation-triangle',
          defaultFocus: 'reject',
          accept: acceptDelete,
          reject
      });
    };

    const handleShareOption = async () => {
      const host = 'localhost:5173';
      const {type, message} = await copyContent(host + location.pathname);
      pushMessage(type,message);
    };

    const modMenu = (show: boolean):MenuItem => {
      if (show) {
        return {
          label: 'Moderation',
          items: [
            {
              label: post.status === 'Hidden' ? 'Show' : 'Approbe',
              icon: post.status === 'Hidden' ? 'pi pi-eye' : 'pi pi-check-square',
              disabled: post.status === 'Approved',
              command: () => {
                approvePost(post);
                pushMessage('info', 'Post Approved / Visible',)
              }
          },
          {
              label: 'Hide',
              icon: 'pi pi-eye-slash',
              disabled: post.status === 'Hidden',
              command: () => {
                hidePost(post);
                pushMessage('info', 'Post Hidden')
              }
          }
          ]
        }
      }
      return {visible: false}
    };

    const optionsMenuItems: MenuItem[] = [
      {
        label: 'Options',
        items: [
          {
            label: 'Share',
            icon: 'pi pi-share-alt',
            command: handleShareOption
          },
          {
            label: 'Edit',
            icon: 'pi pi-file-edit',
            visible: canEditPost(user,post.author),
            command: handleEditOption
          },
          {
            label: 'Delete',
            icon: 'pi pi-trash',
            visible: canEditPost(user,post.author),
            command: confirmDelete
          }
        ],
      },
      {
        separator: true,
        visible: isMod(user)
      },
      modMenu(isMod(user))
    ];

    const header = (
      <div className={styles.postHeader}>
        <Menu model={optionsMenuItems} popup ref={optionsMenu} id="popup-menu-options" />
        <div className={styles.postMetadata}>
          <Avatar
            className={styles.postAuthorAvatar}
            image={post.author.picture}
            imageAlt={post.author.name}
            icon="pi pi-user"
            size="normal"
            shape="circle"
          />
          <div className={styles.postMetaText}>
            <span className={styles.authorName}>{post.author.name}</span>
            <span className={styles.postDate}>{postDate}</span>
            <span className={styles.postDate} hidden={!isMod(user)}><strong>{post.status}</strong></span>
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
        <div className={styles.postHeaderContainer}>
          <BlogNav />
        </div>
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
            <ConfirmDialog/>
            <div className={styles.postImgContainer}>
              <Image className={styles.postImg} src={post?.featuredImage} alt={post?.title} width="500" preview />
            </div>
            <div
              className={styles.postBodyContent}
              dangerouslySetInnerHTML={{ __html: sanitizeHTML(post.body) }}
            />
          </Card>
        </article>
        <div className={styles.commentBox}>
          <CommentSection postId={post.id || ''} comments={post.comments || []} />
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