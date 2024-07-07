export interface User {
    id: string;
    name: string;
    group: string;
    email: string;
    picture?: string;
};

export interface AuthState {
    user: User;
    authStatus: AuthStatusTypes;
}

export type AuthStatusTypes = 'authenticated' | 'unauthenticated';