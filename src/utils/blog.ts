
import DOMPurify from 'dompurify';

export const sanitizeHTML = (text: string) => {
    return DOMPurify.sanitize(text);
};