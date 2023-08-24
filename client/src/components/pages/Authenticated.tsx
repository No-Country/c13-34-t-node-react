import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../../context/auth";
import { useAuth } from "../../service/auth";

export const Authenticated = () => {
  const auth = useAuth();

  if (!auth.isAuthenticated) return <Navigate to="/tablero" />;
  return <Outlet />;
};
