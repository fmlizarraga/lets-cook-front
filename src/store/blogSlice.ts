import { PayloadAction, createSlice } from "@reduxjs/toolkit";
import { BlogState, Post, Comment } from "../interfaces";

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

interface UpdateCommentAction {
    postId: string,
    comment: Comment
};

interface DeleteCommentAction {
    postId: string;
    commentId: string;
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
        },
        onAddComment: (state, action: PayloadAction<UpdateCommentAction>) => {
            const post = state.posts.find(p => p.id === action.payload.postId);
            post?.comments?.push(action.payload.comment);
            if(post && !post.comments) post.comments = [action.payload.comment];
        },
        onUpdateComment: (state, action: PayloadAction<UpdateCommentAction>) => {
            const post = state.posts.find(p => p.id === action.payload.postId);
            if(post && post.comments) {
                post.comments = post?.comments?.map(curr => {
                    if(curr.id === action.payload.comment.id) return action.payload.comment;
                    return curr;
                });
            }
        },
        onDeleteComment: (state, action: PayloadAction<DeleteCommentAction>) => {
            const post = state.posts.find(p => p.id === action.payload.postId);
            post?.comments?.filter(c => c.id !== action.payload.commentId);
        },
    }
});

export const {
    onSetTagsFilter,
    onLoadPosts,
    onClearPosts,
    onCreatePost,
    onUpdatePost,
    onDeletePost,
    onAddComment,
    onUpdateComment,
    onDeleteComment
} = blogSlice.actions;