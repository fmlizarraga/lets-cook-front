import { useDispatch, useSelector } from "react-redux";
import { useRepository } from "./useRepository";
import {
    RootStore,
    onLoadPosts,
    onSetTagsFilter,
    onCreatePost,
    onUpdatePost,
    onDeletePost
} from "../store";
import { FormActionType, Post } from "../interfaces";

export const useBlogStore = () => {
    const { posts, tagFilter } = useSelector((state: RootStore) => state.blog);
    const dispatch = useDispatch();

    const { blogRepository } = useRepository();
    const {getPosts, createPost, updatePost, deletePost} = blogRepository.repository;

    const token = localStorage.getItem('token');

    const loadPosts = async () => {
        try {
            const posts = await getPosts();
            dispatch(onLoadPosts({posts}));
        } catch (error) {
            console.error(error);
            throw new Error('Posts could not be loaded, please try again later');
        }
    };

    const setTagsFilter = (tags: string) => {
        dispatch(onSetTagsFilter({tagFilter:tags}));
    };

    const clearTagsFilter = () => {
        dispatch(onSetTagsFilter({tagFilter:''}));
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
        if(!token) throw new Error("You must signed up to perform this action");

        try {
            if(action === 'create') {
                const newPost = await createPost(post,token);
                dispatch(onCreatePost({post: newPost}));
            }
            else if(action === 'edit') {
                const updatedPost = await updatePost(post, token);
                dispatch(onUpdatePost({post: updatedPost}));
            }
        } catch (error) {
            console.error(error);
            throw new Error("The operaation could not be completed, please try again later.");
        }
    };

    const setPostDeleted = async (post: Post) => {
        if(!token) throw new Error("You must signed up to perform this action");

        try {
            if(!post.id) throw new Error("This action can only be performed on a valid, already existing post");
            deletePost(post.id, token);
            dispatch(onDeletePost({id:post.id}));
        } catch (error) {
            console.error(error);
            throw new Error("The operaation could not be completed, please try again later.");
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
        setPostDeleted
    }
};