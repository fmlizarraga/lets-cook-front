import { Navigate, Route, Routes } from "react-router-dom";
import { Blog, Gallery } from "../pages";

export default function AppRouter() {
  return (
    <Routes>
        <Route path="/home" element={<Gallery/>} />
        <Route path="/blog" element={<Blog/>} />
        <Route path="/*" element={<Navigate to="/home"/>} />
    </Routes>
  )
};
