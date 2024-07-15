import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks";

const PublicRoute = () => {
  const { authStatus } = useAuthStore();

  if (authStatus === 'authenticated') {
    return <Navigate to="/" />;
  }

  return <Outlet />;
};

export default PublicRoute;
