import { Navigate, Outlet } from "react-router-dom";
// import { useAuth } from "../../context/auth";
import { useAuth } from "../../service/auth";

export const NoAuthenticated = () => {
  // const loggedIn = useAuth();
  // if (loggedIn) return <Navigate to="/" />;

  const auth = useAuth();

  if (auth.isAuthenticated) return <Navigate to="/" />;

  return <Outlet />;
};
