import { Outlet } from "react-router-dom";
import { Sidebar } from "./Sidebar";

export const DashboardLayout = () => {
  return (
    <div className="min-h-screen grid grid-cols-[350px_auto] w-full">
      <div>
        <Sidebar />
      </div>
      <div className="bg-stone-50 min-w-0">
        <Outlet />
      </div>
    </div>
  );
};
