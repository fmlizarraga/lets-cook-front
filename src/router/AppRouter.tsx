import { Navigate, Route, Routes } from "react-router-dom";
import { Gallery } from "../pages";

export default function AppRouter() {
  return (
    <Routes>
        <Route path="/home" element={<Gallery/>} />
        <Route path="/*" element={<Navigate to="/home"/>} />
    </Routes>
  )
};
