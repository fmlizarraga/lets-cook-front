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
};

export interface BlogState {
  posts: Post[];
  activePost: Post;
  tagFilter: string;
};

export interface Comment {
  id: string;
  author: string;
  body: string;
  timeStamp: number;
};

export interface Tag {
  value: string;
}

const tagRegex = /^[a-z]+$/;

export const isValidTag = (tag: string): boolean => {
  return tagRegex.test(tag);
};

export const newTag = (str: string): Tag => {
  str = str.toLowerCase().trim();
  if (isValidTag(str)) return { value: str };
  throw new Error("Formato incorrecto");
};
