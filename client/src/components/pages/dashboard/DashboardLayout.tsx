import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";
import { useAuth } from "../../../context/auth";

export const DashboardLayout = () => {
  const auth = useAuth();
  const user = auth.user;
  console.log(user);

  return (
    <div className="min-h-screen grid grid-cols-[350px_1fr]">
      <div>
        <Sidebar />
      </div>
      <div className="bg-primary-gray">
        <Outlet />
      </div>
    </div>
  );
};
