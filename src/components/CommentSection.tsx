
import { useState } from 'react';
import { Card } from 'primereact/card';
import { Editor, EditorTextChangeEvent } from 'primereact/editor';
import { Button } from 'primereact/button';
import { Avatar } from 'primereact/avatar';
import { Comment } from '../interfaces'

import styles from './CommentSection.module.css';
import { getGroupIcon } from '../utils/user';

type PropsTypes = {
    comments: Comment[];
};

export function CommentSection({comments}: PropsTypes) {
    let newCommentArea = (<></>);
    const [editing, setEditing] = useState<boolean>(false);
    const [text, setText] = useState<string>('');

    const handleBtnComment = () => {
        setEditing(editing => editing = true);
    };

    const handleBtnCancel = () => {
        setEditing(editing => editing = false);
    };

    if(editing) {
        newCommentArea = (
            <div>
                <Editor
                    value={text}
                    onTextChange={(e: EditorTextChangeEvent) => setText(e.htmlValue || '')}
                    placeholder='Write a comment...' style={{ height: '240px' }}
                />
                <div className={styles.editorButtons}>
                <Button severity='secondary' label='Cancel' onClick={handleBtnCancel} />
                <Button label='Publish' />
                </div>
            </div>
        );
    }
    else {
        newCommentArea = (
            <div className={styles.newButton}>
                <button className='p-inputtext' onClick={handleBtnComment}>Write a comment...</button>
            </div>
        );
    }
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
                {newCommentArea}
            </div>
            <div className={styles.commentBoxContent}>
                {
                    comments.map(comment => (
                        <div key={'comm' + comment.id} className={styles.commentItem}>
                            <div className={styles.commentItemHeader} >
                                <div className={styles.commentItemUser}>
                                    <Avatar
                                        style={{
                                            fontSize: '0.5rem'
                                        }}
                                        icon="pi pi-user"
                                        size="normal"
                                        shape="circle"
                                    />
                                    <span>{comment.author.name}<i className={getGroupIcon(comment.author)}></i></span>
                                    <span>{new Date(comment.timeStamp).toLocaleString()}</span>
                                </div>
                                <div>
                                    <Button text severity='danger' icon='pi pi-heart' rounded />
                                    <Button text severity='secondary' icon='pi pi-ellipsis-h' rounded />
                                </div>
                            </div>
                            <Editor
                                value={comment.body}
                                readOnly
                                style={{ height: '120px' }}
                                showHeader={false}
                            />
                        </div>
                    ))
                }
            </div>
          </Card>
    </>
  )
};
