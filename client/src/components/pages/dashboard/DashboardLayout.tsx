import { Outlet, useLocation } from "react-router-dom";
import { Sidebar } from "./Sidebar";

import { RiMenu3Fill } from "react-icons/ri";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "@/atom/sidebar";
import { useEffect } from "react";

export const DashboardLayout = () => {
  const location = useLocation();

  const [sidebarOpen, setSidebarOpen] = useAtom(sidebarOpenAtom);

  useEffect(() => {
    setSidebarOpen(false);
  }, [location]);

  return (
    <div className="min-h-screen grid grid-cols-[375px_auto] w-full">
      <Sidebar />

      <div className="bg-stone-50 min-w-0 overflow-auto">
        <Outlet />
      </div>
      {!sidebarOpen && (
        <button
          onClick={() => setSidebarOpen(true)}
          className="2xl:hidden bg-dark-green text-white fixed bottom-4 right-4 p-3 text-2xl rounded-full z-50"
        >
          <RiMenu3Fill />
        </button>
      )}
    </div>
  );
};
