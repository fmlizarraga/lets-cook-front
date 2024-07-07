import { User } from "./auth";

export interface Post {
    id?: string;
    author: User;
    title: string;
    summary?: string;
    body: string;
    date: Date;
    tags: Tag[];
    likes: number;
    featuredImage?: string;
    comments?: Comment[];
  };

  export interface BlogState {
    posts: Post[];
    activePost: Post;
    tagFilter: string;
  }
  
  export interface Comment {
    id: string;
    author: string;
    body: string;
    date: Date;
  };
  
  export interface Tag {
    value: string;
  };