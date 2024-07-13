import { Navigate, Route, Routes } from "react-router-dom";
import { BlogPosts, Gallery, Login, PostDetail, Register } from "../pages";
import { Auth, Blog, Home } from "../layouts";

export default function AppRouter() {
  return (
    <Routes>
      <Route path="/" element={<Home/>} >
        <Route path="home" element={<Gallery/>} />
        {/* TODO path="about" element={<About/>} */}
        <Route path="blog" element={<Blog/>} >
          <Route path=":postId" element={<PostDetail/>} />
          {/* TODO path="new" element={<NewPost/>} */}
          <Route path="posts" element={<BlogPosts/>} />
          {/* TODO path="categories" element={<Categories/>}
              TODO path=":tagsFilter" element={<BlogPosts/>}
           */}
          <Route index element={<Navigate to="posts" />} />
        </Route>
        <Route path="auth" element={<Auth/>} >
          <Route path="login" element={<Login/>} />
          <Route path="register" element={<Register/>} />
          <Route index element={<Navigate to="login" />} />
        </Route>
        <Route index element={<Navigate to="home" />} />
      </Route>
      <Route path="/*" element={<Navigate to="/"/>} />
    </Routes>
  )
};
