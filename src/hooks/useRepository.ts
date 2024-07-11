import { useContext } from "react";
import { AuthRepositoryContext, BlogRepositoryContext } from "../repository";

export const useRepository = () => {
  const authRepository = useContext(AuthRepositoryContext);
  const blogRepository = useContext(BlogRepositoryContext);

  return {
    authRepository,
    blogRepository,
};
}