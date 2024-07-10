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