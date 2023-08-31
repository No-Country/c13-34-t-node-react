import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../context/auth";

export const NotAuthenticated = () => {
  const { loggedIn, user } = useAuth();

  if (loggedIn) {
    switch (user?.role) {
      case "admin":
        return <Navigate replace to="/plataforma/administrador" />;
      case "doctor":
        return <Navigate replace to="/plataforma/doctor" />;
      case "patient":
        return <Navigate replace to="/plataforma/paciente" />;
    }
  }

  return <Outlet />;
};
