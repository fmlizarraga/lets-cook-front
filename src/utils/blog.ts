
import DOMPurify from 'dompurify';
import { Tag, isValidTag } from '../interfaces';

export const sanitizeHTML = (text: string) => {
    return DOMPurify.sanitize(text);
};

export const newTag = (str: string): Tag => {
    str = str.toLowerCase().trim();
    if (isValidTag(str)) return { value: str };
    throw new Error("Incorrect Format");
  };
  
  export const getNTagsAsStrings = (tags: Tag[], n: number): string[] => {
    return tags.slice(0, n).map(tag => tag.value);
  };
  
  export const getTagsAsString = (tags: Tag[]): string => {
    let tagsString = '';
    tags.forEach(tag => tagsString += tag.value);
    return tagsString;
  };

  export const getTagsFromString = (tagsString: string): Tag[] => {
    return tagsString.split(' ').map(t => newTag(t));
  };
