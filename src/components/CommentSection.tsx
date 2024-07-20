import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Avatar } from 'primereact/avatar';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Editor } from 'primereact/editor';
import { Comment } from '../interfaces'
import { useAuthStore, useBlogStore, useUIStore } from '../hooks';
import { getGroupIcon } from '../utils/user';
import { newComment } from '../utils/blog';

import styles from './CommentSection.module.css';

type PropsTypes = {
    postId: string;
    comments: Comment[];
};

type FormValues = {
    body: string;
};

export function CommentSection({ postId, comments }: PropsTypes) {
    const { user, authStatus } = useAuthStore();
    const { addPostComment } = useBlogStore();
    const { pushMessage } = useUIStore();
    const navigate = useNavigate();

    const [editing, setEditing] = useState<boolean>(false);
    const { handleSubmit, register, getValues, setValue } = useForm<FormValues>();

    const onSubmit: SubmitHandler<FormValues> = async ({ body }) => {
        if (authStatus === 'unauthenticated') {
            pushMessage('error', 'Please log in to perform this action.');
            navigate('/auth');
            return;
        }
        try {
            await addPostComment(postId, newComment(body, user));
            pushMessage('success', 'Your comment was posted and is awaiting moderation.');
            setEditing(false);
        } catch (error) {
            if (error instanceof Error) pushMessage('error', error.message);
            return;
        }
    };

    const handleBtnComment = () => {
        setEditing(true);
    };

    const handleBtnCancel = () => {
        setEditing(false);
    };

    const newCommentArea = editing ? (
        <div>
            <form onSubmit={handleSubmit(onSubmit)}>
                <Editor
                    name={register('body').name}
                    value={getValues('body')}
                    onTextChange={(e) => setValue("body", e.htmlValue || "")}
                    placeholder='Write a comment...' 
                    style={{ height: '240px' }}
                />
                <div className={styles.editorButtons}>
                    <Button severity='secondary' label='Cancel' onClick={handleBtnCancel} />
                    <Button label='Publish' type='submit' />
                </div>
            </form>
        </div>
    ) : (
        <div className={styles.newButton}>
            <button className='p-inputtext' onClick={handleBtnComment}>Write a comment...</button>
        </div>
    );

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
                    {comments.map(comment => (
                        <div key={'comm' + comment.id} className={styles.commentItem}>
                            <div className={styles.commentItemHeader}>
                                <div className={styles.commentItemUser}>
                                    <Avatar
                                        style={{ fontSize: '0.5rem' }}
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
                    ))}
                </div>
            </Card>
        </>
    );
};
