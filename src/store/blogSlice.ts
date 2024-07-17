import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BlogState, Post } from "../interfaces";

const INITIAL_STATE: BlogState = {
    posts: [],
    tagFilter: ''
};

interface UpdatePostAction {
    post: Post;
};

interface DeletePostAction {
    id: string;
};

interface LoadPostsAction {
    posts: Post[];
};

interface FilterByTagsAction {
    tagFilter: string;
};

export const blogSlice = createSlice({
    name: 'posts',
    initialState: INITIAL_STATE,
    reducers: {
        onSetTagsFilter: (state, action: PayloadAction<FilterByTagsAction>) => {
            state.tagFilter = action.payload.tagFilter;
        },
        onLoadPosts: (state, action: PayloadAction<LoadPostsAction>) => {
            state.posts = action.payload.posts;
        },
        onClearPosts: (state) => {
            state.posts = [];
            state.tagFilter = '';
        },
        onCreatePost: (state, action: PayloadAction<UpdatePostAction>) => {
            const post = action.payload.post;
            state.posts.push(post);
        },
        onUpdatePost: (state, action: PayloadAction<UpdatePostAction>) => {
            const post = action.payload.post;
            state.posts = state.posts.map( curr => {
                if(curr.id === post.id) return post;
                return curr;
            });
        },
        onDeletePost: (state, action: PayloadAction<DeletePostAction>) => {
            const id = action.payload.id;
            state.posts = state.posts.filter( curr => curr.id !== id );
        }
    }
});

export const {
    onSetTagsFilter,
    onLoadPosts,
    onClearPosts,
    onCreatePost,
    onUpdatePost,
    onDeletePost
} = blogSlice.actions;