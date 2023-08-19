import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-[320px_1fr]">
      <div className="bg-gray-400">
        <Sidebar />
      </div>
      <div>
        <Outlet />
      </div>
    </div>
  );
};
