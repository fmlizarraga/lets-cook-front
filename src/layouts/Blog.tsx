import { Outlet } from "react-router-dom";
import { useEffect } from "react";
import { useBlogStore, useUIStore } from "../hooks";

export const Blog = () => {
  const { loadPosts } = useBlogStore();
  const { pushMessage } = useUIStore();
  useEffect(() => {
      try {
          loadPosts();
      } catch (error) {
        console.error(error);
        if(error instanceof Error) pushMessage('error', error.message);
      }
  }, []);
  return (
    <>
      <Outlet />
    </>
  );
};
