import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";

export const NotAuthenticated = () => {
  const { loggedIn } = useAuth();

  if (loggedIn) return <Navigate replace to="/plataforma" />;

  return <Outlet />;
};
