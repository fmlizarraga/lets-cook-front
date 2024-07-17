import { User } from "./auth";

export interface Post {
    id?: string;
    author: User;
    title: string;
    summary?: string;
    body: string;
    timeStamp: number;
    tags: Tag[];
    likes: number;
    featuredImage?: string;
    comments?: Comment[];
    status: PostStatus;
};

export interface BlogState {
  posts: Post[];
  tagFilter: string;
};

export interface Comment {
  id?: string;
  author: User;
  body: string;
  status: PostStatus;
  likes: number;
  timeStamp: number;
};

export type PostStatus = 'Pending' | 'Approved' | 'Hidden' | 'Deleted' | 'Pinned' | 'Flagged';

export interface Tag {
  value: string;
  visualName?: string;
};

const tagRegex = /^[a-z0-9-_]+$/;

export const isValidTag = (tag: string): boolean => {
  return tagRegex.test(tag);
};
