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
};

export interface Comment {
  id: string;
  author: string;
  body: string;
  date: Date;
};

export class Tag {
  private static tagRegex = /^[a-z]+$/;
  
  private constructor(private readonly _value: string) {}

  static create(str: string): Tag {
    const cleanedStr = str.toLowerCase().trim();
    if (!Tag.isValid(cleanedStr)) {
      throw new Error("Formato incorrecto");
    }
    return new Tag(cleanedStr);
  }

  private static isValid(tag: string): boolean {
    return Tag.tagRegex.test(tag);
  }

  get value(): string {
    return this._value;
  }

  toString(): string {
    return this._value;
  }
};