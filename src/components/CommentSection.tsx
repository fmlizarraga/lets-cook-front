
import { Card } from 'primereact/card';

import styles from './CommentSection.module.css';

export function CommentSection() {
  return (
    <>
        <Card
            className={styles.commentBoxInnerContainer}
            pt={{
                body: {
                    className: styles.commentBoxInnerBody
                },
                content: {
                    className: styles.commentBoxInnerContent
                }
            }}
          >
            <div className={styles.commentBoxHeader}>
                <h2>Comments</h2>
            </div>
            <div className={styles.newComment}>
                <button className='p-inputtext'>Write a comment...</button>
            </div>
            <div className={styles.commentBoxContent}></div>
          </Card>
    </>
  )
};
