import { Navigate, Route, Routes } from "react-router-dom";
import { BlogPosts, Gallery, Login, PostDetail, Register } from "../pages";
import { Auth, Blog, Home } from "../layouts";
import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} >
        <Route path="home" element={<Gallery/>} />
        {/* TODO path="about" element={<About/>} */}
        <Route path="blog" element={<Blog/>} >
          <Route path="posts" element={<BlogPosts/>} />
          <Route element={<ProtectedRoute />}>
            <Route path=":postId" element={<PostDetail/>} />
            {/* <Route path="new" element={<NewPost/>} /> */}
            {/* TODO path="edit/:postId" element={<EditPost/>} */}
          </Route>
          {/* TODO path="categories" element={<Categories/>} */}
          {/* TODO path=":tagsFilter" element={<BlogPosts/>} */}
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
  );
};
