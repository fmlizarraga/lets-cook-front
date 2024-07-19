import { createContext } from "react";
import { Comment, Post } from "../interfaces";


export interface BlogRepository {
    getPosts: () => Promise<Post[]>;
    createPost: (post: Post, token: string) => Promise<Post>;
    updatePost: (post: Post, token: string) => Promise<Post>;
    deletePost: (postId: string, token: string) => Promise<void>;
    addComment: (postId: string, comment: Comment, token: string) => Promise<Comment>;
    updateComment: (comment: Comment, token: string) => Promise<Comment>;
    deleteComment: (commentId: string, token: string) => Promise<void>;
};

export interface BlogRepositoryContextState {
    repository: BlogRepository;
};

export const BlogRepositoryContext = createContext<BlogRepositoryContextState>({
    repository: {
        getPosts: async () => { throw new Error("Blog Repository not yet implemented")},
        createPost: async () => { throw new Error("Blog Repository not yet implemented")},
        updatePost: async () => { throw new Error("Blog Repository not yet implemented")},
        deletePost: async () => { throw new Error("Blog Repository not yet implemented")},
        addComment: async () => { throw new Error("Blog Repository not yet implemented")},
        updateComment: async () => { throw new Error("Blog Repository not yet implemented")},
        deleteComment: async () => { throw new Error("Blog Repository not yet implemented")},
    }
});