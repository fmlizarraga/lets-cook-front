import { useRef, useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { Avatar } from "primereact/avatar";
import { Button } from "primereact/button";
import { Editor } from "primereact/editor";
import { Menu } from "primereact/menu";
import { MenuItem } from "primereact/menuitem";
import { Comment } from "../interfaces";
import { canEditPost, getGroupIcon, isMod } from "../utils/user";
import { useAuthStore, useBlogStore, useUIStore } from "../hooks";

import styles from './CommentItem.module.css';
import { confirmDialog } from "primereact/confirmdialog";

type PropsTypes = {
    comment: Comment;
    postId: string;
};

type FormValues = {
    body: string;
};

export function CommentItem({comment, postId}: PropsTypes) {
    const { user } = useAuthStore();
    const { approveComment, hideComment, updatePostComment, deletePostComment } = useBlogStore();
    const { pushMessage } = useUIStore();

    const [editing, setEditing] = useState<boolean>(false);
    const { handleSubmit, register, getValues, setValue, reset } = useForm<FormValues>({
        defaultValues: {
            body:comment.body
        }
    });

    const acceptDelete = async () => {
        try {
          await deletePostComment(postId, comment.id || '');
          pushMessage('success', 'Deleted comment.');
        } catch (error) {
          pushMessage('error', 'There was a problem when trying to delete, please try again later.')
        }
      };
  
      const reject = () => {
        pushMessage('info', 'Canceled action.')
      };
  
      const confirmDeleteComment = () => {
        confirmDialog({
            message: 'Are you sure you want to delete this comment?',
            header: 'Confirm Comment Deletion',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'reject',
            accept: acceptDelete,
            reject
        });
      };

    const onSubmit: SubmitHandler<FormValues> = async ({ body }) => {
        try {
            await updatePostComment(postId,{...comment, body})
            pushMessage('success', 'Your comment was posted and is awaiting moderation.');
            setEditing(false);
            reset();
        } catch (error) {
            if (error instanceof Error) pushMessage('error', error.message);
        }
    };

    const commentOptionsMenu = useRef<Menu>(null);
    const modMenu = (show: boolean): MenuItem => {
        if(show) return {
            label: 'Moderation',
            items: [
                {
                    label: comment.status === 'Hidden' ? 'Show' : 'Approbe',
                    icon: comment.status === 'Hidden' ? 'pi pi-eye' : 'pi pi-check-square',
                    disabled: comment.status === 'Approved',
                    command: () => {
                        approveComment(postId, comment);
                        pushMessage('info', 'Comment Approved / Visible');
                    }
                },
                {
                    label: 'Hide',
                    icon: 'pi pi-eye-slash',
                    disabled: comment.status === 'Hidden',
                    command: () => {
                        hideComment(postId, comment);
                        pushMessage('info', 'Comment Hidden');
                    }
                }
            ]
        }
        return {visible:false};
    };
    const commentOptionsMenuItems: MenuItem[] = [
        {
            label: `#${comment.id}`,
            items: [
                {
                    label: 'Report',
                    icon: 'pi pi-flag'
                },
                {
                    label: 'Edit',
                    icon: 'pi pi-pen-to-square',
                    visible: canEditPost(user, comment.author),
                    command: () => setEditing(true)
                },
                {
                    label: 'Delete',
                    icon: 'pi pi-trash',
                    visible: canEditPost(user, comment.author),
                    command: confirmDeleteComment
                },
            ]
        },
        {
            separator: true,
            visible: isMod(user)
        },
        modMenu(isMod(user))
    ];

    return editing ? 
    (
        <form className={styles.commentItem} onSubmit={handleSubmit(onSubmit)}>
            <div className={styles.commentItemHeader}>
                <div className={styles.commentItemUser}>
                    <span><strong>Editing Comment...</strong></span>
                </div>
                <div>
                    <Button
                        label="Cancel"
                        outlined onClick={() => setEditing(false)}
                        pt={{
                            root: {
                                className: styles.editBtn
                            }
                        }}
                    />
                    <Button
                        label="Accept"
                        type="submit"
                        pt={{
                            root: {
                                className: styles.editBtn
                            }
                        }}
                    />
                </div>
            </div>
            <div>
                <Editor
                    name={register('body').name}
                    ref={register('body').ref}
                    value={getValues('body')}
                    onTextChange={(e) => setValue("body", e.htmlValue || "")}
                    placeholder='Write a comment...'
                    style={{ height: '240px'}}
                    pt={{
                        toolbar: {
                            style: {borderRadius: "0"}
                        }
                    }}
                />
            </div>
        </form>
    )
    
    :

    (
        <div className={styles.commentItem}>
            <div className={styles.commentItemHeader}>
                <div className={styles.commentItemUser}>
                    <Avatar
                        image={comment.author.picture}
                        imageAlt={comment.author.name}
                        style={{ fontSize: '0.5rem', marginTop: '0.5rem' }}
                        icon="pi pi-user"
                        size="normal"
                        shape="circle"
                        pt={{
                            image: {
                                style: { objectFit: 'cover' }
                            },
                        }}
                    />
                    <span>{comment.author.name}<i className={getGroupIcon(comment.author)}></i></span>
                    <span>{new Date(comment.timeStamp).toLocaleString()}</span>
                    <span hidden={!isMod(user)}>{comment.status}</span>
                </div>
                <div>
                    <Button text severity='danger' icon='pi pi-heart'
                        rounded
                        pt={{
                            root: {
                                className: styles.headerBtn
                            }
                        }}
                    />
                    <Button
                        text
                        severity='secondary'
                        icon='pi pi-ellipsis-h'
                        rounded onClick={(e) => commentOptionsMenu.current?.toggle(e)} aria-haspopup
                        pt={{
                            root: {
                                className: styles.headerBtn
                            }
                        }}
                    />
                    <Menu model={commentOptionsMenuItems} popup ref={commentOptionsMenu} id="popup-menu-options"/>
                </div>
            </div>
            <Editor
                value={comment.body}
                readOnly
                style={{ height: '120px' }}
                showHeader={false}
            />
        </div>
    );
};
