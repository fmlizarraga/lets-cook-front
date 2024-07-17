import { Navigate, Route, Routes } from "react-router-dom";
import { BlogPosts, Gallery, Login, PostDetail, PostForm, Register } from "../pages";
import { Auth, Blog, Home } from "../layouts";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";
import { NavigationListener } from "../components";

export default function AppRouter() {
  return (
    <>
    <NavigationListener/>
    <Routes>
      <Route path="/" element={<Home/>} >
        <Route path="home" element={<Gallery/>} />
        {/* TODO path="about" element={<About/>} */}
        <Route path="blog" element={<Blog/>} >
          <Route path="posts" element={<BlogPosts/>} />
          <Route path=":postId" element={<PostDetail/>} />
          <Route path="categories/:filter" element={<BlogPosts/>} />
          <Route element={<ProtectedRoute />}>
            <Route path=":postId/edit" element={<PostForm/>} />
            <Route path="new" element={<PostForm/>} />
          </Route>
          <Route index element={<Navigate to="posts" />} />
        </Route>
        <Route path="auth" element={<Auth/>} >
          <Route element={<PublicRoute />}>
            <Route path="login" element={<Login/>} />
            <Route path="register" element={<Register/>} />
          </Route>
          <Route index element={<Navigate to="login" />} />
        </Route>
        <Route index element={<Navigate to="home" />} />
      </Route>
      <Route path="/*" element={<Navigate to="/"/>} />
    </Routes>
    </>
  );
};
