import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { SubmitHandler, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { Card } from 'primereact/card';
import { Editor } from 'primereact/editor';
import { Comment } from '../interfaces'
import { useAuthStore, useBlogStore, useUIStore } from '../hooks';
import { CommentItem } from './CommentItem';
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
    const { handleSubmit, register, getValues, setValue, reset } = useForm<FormValues>();

    const checkAuth = () => {
        if (authStatus === 'unauthenticated') {
            pushMessage('error', 'Please log in to perform this action.');
            navigate('/auth');
            return false;
        }
        return true;
    };

    const onSubmit: SubmitHandler<FormValues> = async ({ body }) => {
        if (!checkAuth()) return;
        try {
            await addPostComment(postId, newComment(body, user));
            pushMessage('success', 'Your comment was posted and is awaiting moderation.');
            setEditing(false);
            reset();
        } catch (error) {
            if (error instanceof Error) pushMessage('error', error.message);
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
                        <CommentItem key={'comm' + comment.id} comment={comment} postId={postId} />
                    ))}
                </div>
            </Card>
        </>
    );
};
