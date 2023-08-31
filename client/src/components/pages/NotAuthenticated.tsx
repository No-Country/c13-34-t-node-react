import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";

export const NotAuthenticated = () => {
  const { loggedIn, user } = useAuth();

  if (loggedIn) {
    switch (user?.role) {
      case "admin":
        return <Navigate replace to="/plataforma/administrador" />;
      case "doctor":
        // todo
        return <Navigate replace to="/plataforma" />;
      case "admin":
        return <Navigate replace to="/plataforma" />;
    }
  }

  return <Outlet />;
};
