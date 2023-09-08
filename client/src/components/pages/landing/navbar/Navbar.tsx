import { NavLink } from "react-router-dom";
import { useState } from "react";
import { navLinks } from "../../../../data/navLinks";
import logo from "/images/logo.png";
import { BiMenu } from "react-icons/bi";

export const Navbar = () => {
  const [showSideMenu, setShowSideMenu] = useState(false);

  return (
    <div className="fixed xl:static z-50 w-full flex justify-between items-center py-3 px-4 xl:px-36 bg-white text-black text-2xl">
      <NavLink to="/" className="flex items-center gap-1 bg-white">
        <img src={logo} alt="logo" className="h-[50px] relative z-50" />
      </NavLink>
      <nav
        className={` ${
          showSideMenu ? "flex" : "hidden"
        } fixed top-0 z-50 left-0 bottom-0 flex flex-col w-5/6 max-w-sm py-6 px-6 bg-white border-r overflow-y-auto`}
      >
        <div className="flex items-center justify-end mb-8">
          <button
            onClick={() => setShowSideMenu(false)}
            className="navbar-close"
          >
            <svg
              className="h-6 w-6 text-gray-400 cursor-pointer hover:text-gray-500"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M6 18L18 6M6 6l12 12"
              ></path>
            </svg>
          </button>
        </div>
        <div className="flex flex-col gap-4">
          {navLinks.map((navLink) => (
            <NavLink
              key={navLink.id}
              to={navLink.url}
              onClick={() => setShowSideMenu(false)}
              className={({ isActive }) =>
                isActive
                  ? "relative font-bold text-dark-green underline xl:border-b xl:border-b-dark-green before:absolute before:w-8 before:h-8 before:top-0 before:bg-primary-green before:rounded-full"
                  : "hover:border-b hover:border-b-dark-green"
              }
            >
              <p className="relative text-md">{navLink.name}</p>
            </NavLink>
          ))}
        </div>
      </nav>
      <BiMenu
        className="xl:hidden"
        size={40}
        onClick={() => setShowSideMenu(!showSideMenu)}
      />
      <div className="hidden xl:flex relative gap-14 text-xl font-opensans tracking-wide">
        {navLinks.map((navLink) => (
          <NavLink
            key={navLink.id}
            to={navLink.url}
            className={({ isActive }) =>
              isActive
                ? "relative font-bold text-dark-green border-b border-b-dark-green before:absolute before:w-8 before:h-8 before:top-0 before:bg-primary-green before:rounded-full"
                : "hover:border-b hover:border-b-dark-green"
            }
          >
            <p className="relative w-full">{navLink.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
