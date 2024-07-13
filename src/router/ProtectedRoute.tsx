import { Navigate, Outlet } from "react-router-dom";
import { useAuthStore } from "../hooks";

const ProtectedRoute = () => {
  const { authStatus } = useAuthStore();

  return authStatus === 'authenticated' ? <Outlet /> : <Navigate to="/auth/login" />;
};

export default ProtectedRoute;