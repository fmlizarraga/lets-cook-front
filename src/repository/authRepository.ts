import { createContext } from "react";
import { User } from "../interfaces";

export interface AuthRepository {
    loginUser: (email: string, password: string) => Promise<{ user: User, token: string } | Error>;
    registerUser: (name: string, email:string, password: string, pictureURL?: string) => Promise<void | Error>;
    checkUser: (token: string) => Promise<string | Error>;
};

export interface AuthRepositoryContextState {
    repository: AuthRepository;
};

export const AuthRepositoryContext = createContext<AuthRepositoryContextState>({
    repository: {
        loginUser: async () => { throw new Error("Auth Repository not yet implemented")},
        registerUser: async () => { throw new Error("Auth Repository not yet implemented")},
        checkUser: async () => { throw new Error("Auth Repository not yet implemented")},
    }
});