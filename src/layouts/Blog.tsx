import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useBlogStore } from "../hooks";

export const Blog = () => {
  const { loadPosts } = useBlogStore();
  useEffect(() => {
      try {
          loadPosts();
      } catch (error) {
          if(error instanceof Error) console.error(error);
      }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};
