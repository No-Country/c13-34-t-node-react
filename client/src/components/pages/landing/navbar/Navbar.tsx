import { NavLink } from "react-router-dom";

const pages = [
  { url: "/", name: "Inicio" },
  { url: "/nosotros", name: "Sobre Nosotros" },
  { url: "/contacto", name: "Contacto" },
  { url: "/acceso", name: "Acceso" },
  { url: "/registro", name: "Registro" },
];

export const Navbar = () => {
  return (
    <div className="flex justify-between items-center py-6 px-36 bg-white text-black text-2xl">
      <div className="flex items-center gap-1">
        <p className="font-bold text-dark-green">Meddy</p>
      </div>
      <div className="flex relative gap-14 text-xl font-opensans tracking-wide">
        {pages.map((page) => (
          <NavLink
            to={page.url}
            className={({ isActive }) =>
              isActive
                ? "relative font-bold text-dark-green border-b border-b-dark-green before:absolute before:w-8 before:h-8 before:top-0 before:bg-primary-green before:rounded-full"
                : "hover:border-b hover:border-b-dark-green"
            }
          >
            <p className="relative w-full">{page.name}</p>
          </NavLink>
        ))}
      </div>
    </div>
  );
};
