// useBlogStore.ts

import { useDispatch, useSelector } from "react-redux";
import { useRepository } from "./useRepository";
import {
    RootStore,
    onLoadPosts,
    onSetTagsFilter,
    onCreatePost,
    onUpdatePost,
    onDeletePost,
    onAddComment,
    onUpdateComment,
    onDeleteComment
} from "../store";
import { FormActionType, Post, Comment } from "../interfaces";

export const useBlogStore = () => {
    const { posts, tagFilter } = useSelector((state: RootStore) => state.blog);
    const dispatch = useDispatch();

    const { blogRepository } = useRepository();
    const {
        getPosts,
        createPost,
        updatePost,
        deletePost,
        addComment,
        updateComment,
        deleteComment
    } = blogRepository.repository;

    const token = localStorage.getItem('token');

    const loadPosts = async () => {
        try {
            const posts = await getPosts();
            dispatch(onLoadPosts({ posts }));
        } catch (error) {
            console.error(error);
            throw new Error('Posts could not be loaded, please try again later');
        }
    };

    const setTagsFilter = (tags: string) => {
        dispatch(onSetTagsFilter({ tagFilter: tags }));
    };

    const clearTagsFilter = () => {
        dispatch(onSetTagsFilter({ tagFilter: '' }));
    };

    const getFilteredPosts = (): Post[] => {
        const categories = tagFilter.split(' ');

        return posts.filter(post =>
            post.tags.some(tag =>
                categories.includes(tag.value)
            )
        );
    };

    const savePost = async (post: Post, action: FormActionType) => {
        if (!token) throw new Error("You must be signed in to perform this action");

        try {
            if (action === 'create') {
                const newPost = await createPost(post, token);
                dispatch(onCreatePost({ post: newPost }));
            } else if (action === 'edit') {
                const updatedPost = await updatePost(post, token);
                dispatch(onUpdatePost({ post: updatedPost }));
            }
        } catch (error) {
            console.error(error);
            throw new Error("The operation could not be completed, please try again later.");
        }
    };

    const setPostDeleted = async (post: Post) => {
        if (!token) throw new Error("You must be signed in to perform this action");

        try {
            if (!post.id) throw new Error("This action can only be performed on a valid, already existing post");
            await deletePost(post.id, token);
            dispatch(onDeletePost({ id: post.id }));
        } catch (error) {
            console.error(error);
            throw new Error("The operation could not be completed, please try again later.");
        }
    };

    const addPostComment = async (postId: string, comment: Comment) => {
        if (!token) throw new Error("You must be signed in to perform this action");

        try {
            const newComment = await addComment(postId, comment, token);
            dispatch(onAddComment({ postId, comment: newComment }));
        } catch (error) {
            console.error(error);
            throw new Error("The operation could not be completed, please try again later.");
        }
    };

    const updatePostComment = async (postId: string, comment: Comment) => {
        if (!token) throw new Error("You must be signed in to perform this action");

        try {
            const updatedComment = await updateComment(comment, token);
            dispatch(onUpdateComment({ postId, comment: updatedComment }));
        } catch (error) {
            console.error(error);
            throw new Error("The operation could not be completed, please try again later.");
        }
    };

    const deletePostComment = async (postId: string, commentId: string) => {
        if (!token) throw new Error("You must be signed in to perform this action");

        try {
            await deleteComment(commentId, token);
            dispatch(onDeleteComment({ postId, commentId }));
        } catch (error) {
            console.error(error);
            throw new Error("The operation could not be completed, please try again later.");
        }
    };

    return {
        // * Properties
        posts,
        tagFilter,
        // * Methods
        loadPosts,
        setTagsFilter,
        clearTagsFilter,
        getFilteredPosts,
        savePost,
        setPostDeleted,
        addPostComment,
        updatePostComment,
        deletePostComment
    }
};
