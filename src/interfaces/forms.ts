export type FormActionType = 'create' | 'edit';

export const isValidTag = (tag: string): boolean => {
    const tagRegex = /^[a-z]+$/;
    return tagRegex.test(tag);
};

