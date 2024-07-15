import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks";

const ProtectedRoute = () => {
  const { authStatus } = useAuthStore();

  if (authStatus === 'unauthenticated') {
    return <Navigate to="/auth/login" />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
