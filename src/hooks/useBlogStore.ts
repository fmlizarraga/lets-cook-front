import { useDispatch, useSelector } from "react-redux";
import { useRepository } from "./useRepository";
import { RootStore, onLoadPosts } from "../store";


export const useBlogStore = () => {
    const { posts, activePost, tagFilter } = useSelector((state: RootStore) => state.blog);
    const dispatch = useDispatch();

    const { blogRepository } = useRepository();
    const {getPosts, createPost, updatePost, deletePost} = blogRepository.repository;

    const token = `Bearer ${localStorage.getItem('token')}`;

    const loadPosts = async () => {
        const posts = await getPosts(token);
        dispatch(onLoadPosts({posts}));
    };

    return {
        // * Properties
        posts,
        activePost,
        tagFilter,
        // * Methods
        loadPosts,
    }
};