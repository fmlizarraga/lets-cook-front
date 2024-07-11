import { createContext } from "react";
import { Post } from "../interfaces";


export interface BlogRepository {
    getPosts: (token: string) => Promise<Post[]>;
    createPost: (post: Post, token: string) => Promise<Post>;
    updatePost: (post: Post, token: string) => Promise<Post>;
    deletePost: (postId: string, token: string) => Promise<void>;
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
    }
});