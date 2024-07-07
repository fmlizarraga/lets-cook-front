import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BlogState, Post, User } from "../interfaces";

const DEFAULT_AUTHOR: User = {
    id: "",
    name: "Unknown",
    email: "",
    group: "guest"
};

const EMPTY_POST: Post = {
    author: DEFAULT_AUTHOR,
    title: '',
    body: '',
    date: new Date(0),
    tags: [],
    likes: 0
};

const INITIAL_STATE: BlogState = {
    posts: [],
    activePost: EMPTY_POST,
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
        onSetActivePost: (state, action: PayloadAction<UpdatePostAction>) => {
            state.activePost = action.payload.post;
        },
        onClearActivePost: (state) => {
            state.activePost = EMPTY_POST;
        },
        onFilterByTags: (state, action: PayloadAction<FilterByTagsAction>) => {
            state.tagFilter = action.payload.tagFilter;
        },
        onLoadPosts: (state, action: PayloadAction<LoadPostsAction>) => {
            state.posts = action.payload.posts;
        },
        onClearPosts: (state) => {
            state.activePost = EMPTY_POST;
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
    onSetActivePost,
    onClearActivePost,
    onFilterByTags,
    onLoadPosts,
    onClearPosts,
    onCreatePost,
    onUpdatePost,
    onDeletePost
} = blogSlice.actions;