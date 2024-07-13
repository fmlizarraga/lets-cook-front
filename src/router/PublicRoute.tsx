import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks";

const PublicRoute = () => {
  const { authStatus } = useAuthStore();

  return authStatus === 'unauthenticated' ? <Outlet /> : <Navigate to="/" />;
};

export default PublicRoute;
