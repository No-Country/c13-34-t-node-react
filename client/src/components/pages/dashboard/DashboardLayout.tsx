import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen flex flex-col">
      <Sidebar />
      <Outlet />
    </div>
  );
};
