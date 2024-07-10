export interface User {
    id: string;
    name: string;
    group: UserGroupTypes;
    email: string;
    picture?: string;
};

export interface AuthState {
    user: User;
    authStatus: AuthStatusTypes;
}

export type AuthStatusTypes = 'authenticated' | 'unauthenticated';

export type UserGroupTypes = 'Guest' | 'Limited' | 'Member' | 'Gold' | 'Moderator' | 'Admin' | 'Staff';