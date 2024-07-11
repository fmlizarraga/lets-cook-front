import type { FC, ReactNode } from "react";
import { AuthRepository, AuthRepositoryContext } from "./authRepository";


export interface AuthRepositoryProviderProps {
    children: ReactNode;
    repository: AuthRepository;
};

export const AuthRepositoryProvider: FC<AuthRepositoryProviderProps> = ({children, repository}) => {
    return (
        <AuthRepositoryContext.Provider value={{repository}}>
            {children}
        </AuthRepositoryContext.Provider>
    );
};
