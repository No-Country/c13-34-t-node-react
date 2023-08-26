import { Outlet } from "react-router-dom";
import { Navbar } from "./landing/navbar/Navbar";
import { Footer } from "./landing/footer/Footer";

export const PublicLayout = () => {
  return (
    <div className="h-full w-full flex flex-col ">
      <div className="w-full overflow-auto">
        <Navbar />
      </div>
      <Outlet />
      <Footer />
    </div>
  );
};
