import type { ReactNode, FC } from "react";
import { BlogRepository, BlogRepositoryContext } from "./";


export interface BlogRepositoryProviderProps {
    children: ReactNode;
    repository: BlogRepository;
};

export const BlogRepositoryProvider: FC<BlogRepositoryProviderProps> = ({children, repository}) => {
    return (
        <BlogRepositoryContext.Provider value={{repository}}>
            {children}
        </BlogRepositoryContext.Provider>
    );
};
