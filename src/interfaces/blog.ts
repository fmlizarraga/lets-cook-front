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
  activePost: Post;
  tagFilter: string;
};

export interface Comment {
  id?: string;
  author: string;
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

export const newTag = (str: string): Tag => {
  str = str.toLowerCase().trim();
  if (isValidTag(str)) return { value: str };
  throw new Error("Formato incorrecto");
};

export const getNTagsAsStrings = (tags: Tag[], n: number): string[] => {
  return tags.slice(0, n).map(tag => tag.value);
};

export const getTagsString = (tags: Tag[]): string => {
  let tagsString = '';
  tags.forEach(tag => tagsString += tag.value);
  return tagsString;
};