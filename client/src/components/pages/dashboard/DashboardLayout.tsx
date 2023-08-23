import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = () => {
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
