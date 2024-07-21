import { User } from "../interfaces";

export const getGroupIcon = (user: User): string => {
    switch (user.group) {
        case 'Admin':
            return 'pi pi-crown';
        case 'Gold':
            return 'pi pi-star';
        case 'Moderator':
            return 'pi pi-cog';
        case 'Staff':
            return 'pi pi-verified';
        default:
            return '';
    }
};

export const isMod = (user: User): boolean => {
    return user.group === 'Admin' ||
    user.group === 'Moderator' ||
    user.group === 'Staff';
};

export const canEditPost = (user: User, author: User): boolean => {
    return user.id === author.id || isMod(user);
};