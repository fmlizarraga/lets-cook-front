import { useContext } from "react";
import { BlogRepositoryContext } from "../repository";

export const useRepository = () => {
  const blogRepository = useContext(BlogRepositoryContext);

  return {
    blogRepository,
};
}