import { NavLink } from "react-router-dom";
import {
  RiLayoutMasonryFill,
  RiCalendarTodoFill,
  RiPsychotherapyFill,
  RiCheckboxMultipleFill,
  RiTeamFill,
  RiStethoscopeFill,
  RiHistoryFill,
  RiSeoFill,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { useAuth } from "../../../context/auth";
import { GrUserAdmin } from "react-icons/gr";
import { FaBriefcaseMedical } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";
import { useAtom } from "jotai";
import { sidebarOpenAtom } from "@/atom/sidebar";
import clsx from "clsx";

export const Sidebar = () => {
  const [sidebarOpen] = useAtom(sidebarOpenAtom);

  const { user, logout } = useAuth();

  return (
    <div
      className={clsx(
        `max-sm:fixed sticky z-50 flex flex-col justify-between max-sm:w-[100%] top-0 h-screen transition-all duration-500 bg-white`,
        sidebarOpen ? "left-0" : "-left-full",
        `2xl:left-0`,
      )}
    >
      <div className="flex flex-col h-screen p-4 2xl:p-8">
        <div className="flex flex-col items-center justify-center">
          <img
            src="/images/logo.png"
            alt="logo"
            className="max-sm:w-[180px] w-[220px] mb-11"
          />
          <div className="w-[120px] h-[120px] flex justify-center items-center mb-6 border-2 border-slate-200 rounded-full">
            {user?.role === "admin" && (
              <GrUserAdmin size={80} className="pl-4" />
            )}
            {user?.role === "doctor" && <FaBriefcaseMedical size={80} />}
            {user?.role === "patient" && <AiOutlineUser size={80} />}
          </div>
          <div className="text-center font-bold text-[#777777]">
            {user?.firstName.toUpperCase() + " " + user?.lastName.toUpperCase()}
          </div>
        </div>

        {/* administrador */}
        {user?.role === "admin" && (
          <>
            <h3 className="text-lg font-bold text-center text-dark-green mb-4 2xl:mb-12">
              Administrador
            </h3>
            <ul className="flex flex-col">
              <li>
                <NavLink
                  to="/plataforma/administrador/panel"
                  className="text-black hover:text-dark-green font-bold hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition flex justify-between items-center"
                >
                  <div className="flex items-center justify-start gap-4 ">
                    <RiLayoutMasonryFill className="text-2xl" />
                    <p>Panel</p>
                  </div>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plataforma/administrador/usuarios"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiTeamFill className="text-2xl" />
                  <p>Usuarios</p>
                </NavLink>
              </li>
              <li className="hidden">
                <NavLink
                  to="/plataforma/administrador/citas"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiCalendarTodoFill className="text-2xl" />
                  <p>Agendar Citas</p>
                </NavLink>
              </li>
              <li className="hidden">
                <NavLink
                  to="/plataforma/administrador/pacientes"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiPsychotherapyFill className="text-2xl" />
                  <p>Pacientes</p>
                </NavLink>
              </li>
            </ul>
          </>
        )}

        {/* Doctor */}
        {user?.role === "doctor" && (
          <>
            <h3 className="text-lg font-bold text-center text-dark-green mb-4 2xl:mb-12">
              Doctor
            </h3>
            <ul className="mb-4">
              <li>
                <NavLink
                  to="/plataforma/doctor/panel"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiLayoutMasonryFill className="text-2xl" />
                  <p>Panel</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plataforma/doctor/pacientes"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiPsychotherapyFill className="text-2xl" />
                  <p>Pacientes</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plataforma/doctor/citas"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiCalendarTodoFill className="text-2xl" />
                  <p>Agendar Citas</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plataforma/doctor/cronograma"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiSeoFill className="text-2xl" />
                  <p>Cronograma</p>
                </NavLink>
              </li>
            </ul>
          </>
        )}

        {/* Paciente */}
        {user?.role === "patient" && (
          <>
            <h3 className="text-lg font-bold text-center text-dark-green mb-4 2xl:mb-12">
              Paciente
            </h3>
            <div className="overflow-auto">
              <ul>
                <li>
                  <NavLink
                    to="/plataforma/paciente/panel"
                    className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                  >
                    <RiLayoutMasonryFill className="text-2xl" />
                    <p>Panel</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/plataforma/paciente/doctores"
                    className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                  >
                    <RiStethoscopeFill className="text-2xl" />
                    <p>Doctores</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/plataforma/paciente/reservar-cita"
                    className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                  >
                    <RiCheckboxMultipleFill className="text-2xl" />
                    <p>Reservar cita</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/plataforma/paciente/citas"
                    className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                  >
                    <RiCalendarTodoFill className="text-2xl" />
                    <p>Mis Citas</p>
                  </NavLink>
                </li>
                <li>
                  <NavLink
                    to="/plataforma/paciente/registros-medicos"
                    className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                  >
                    <RiHistoryFill className="text-2xl" />
                    <p>Registros Médicos</p>
                  </NavLink>
                </li>
              </ul>
            </div>
          </>
        )}

        <div className="flex-none mt-auto pt-4">
          <button
            onClick={logout}
            className="w-full text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-red-100 text-lg py-4 px-8 rounded-xl cursor-pointer transition"
          >
            <RiLogoutBoxLine className="text-2xl" />
            <p>Cerrar Sesión</p>
          </button>
        </div>
      </div>
    </div>
  );
};
