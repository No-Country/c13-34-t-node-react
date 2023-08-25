import { NavLink } from "react-router-dom";
import { navLinks } from "../../../../data/navLinks";
import logo from "/images/logo.png";

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-3 px-36 bg-white text-black text-2xl">
      <div className="flex relative z-10 items-center gap-1">
        <img src={logo} alt="logo" className="h-[50px]" />
      </div>
      <div className="flex relative gap-14 text-xl font-opensans tracking-wide">
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
