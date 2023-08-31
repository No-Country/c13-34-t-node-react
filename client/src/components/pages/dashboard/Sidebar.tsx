import { NavLink } from "react-router-dom";
import {
  RiLayoutMasonryFill,
  RiCalendarTodoFill,
  RiPsychotherapyFill,
  RiCheckboxMultipleFill,
  RiStethoscopeFill,
  RiHistoryFill,
  RiSeoFill,
  RiLogoutBoxLine,
} from "react-icons/ri";
import { useAuth } from "../../../context/auth";
import { GrUserAdmin } from "react-icons/gr";
import { FaBriefcaseMedical } from "react-icons/fa";
import { AiOutlineUser } from "react-icons/ai";

export const Sidebar = () => {
  const { user, logout } = useAuth();

  return (
    <div className="flex flex-col justify-between h-full px-8 py-3">
      <div className="flex flex-col w-full">
        <div className="flex flex-col items-center justify-center">
          <img src="/images/logo.png" alt="" className="w-[220px] mb-11" />
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
          <div>
            <h3 className="text-lg font-bold text-center text-dark-green mb-12">
              Admin
            </h3>
            <ul className="flex flex-col">
              <li>
                <NavLink
                  to="/plataforma/administrador/panel"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiLayoutMasonryFill className="text-2xl" />
                  <p>Panel</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plataforma/administrador/citas"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiCalendarTodoFill className="text-2xl" />
                  <p>Citas</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plataforma/administrador/pacientes"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiPsychotherapyFill className="text-2xl" />
                  <p>Pacientes</p>
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* Doctor */}

        {user?.role === "doctor" && (
          <div>
            <h3 className="text-lg font-bold text-center text-dark-green mb-12">
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
                  to="/plataforma/doctor/citas"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiCalendarTodoFill className="text-2xl" />
                  <p>Citas</p>
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
                  to="/plataforma/doctor/cronograma"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiSeoFill className="text-2xl" />
                  <p>Cronograma</p>
                </NavLink>
              </li>
            </ul>
          </div>
        )}

        {/* Paciente */}
        {user?.role === "patient" && (
          <div>
            <h3 className="text-lg font-bold text-center text-dark-green mb-12">
              Paciente
            </h3>
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
                  to="/plataforma/paciente/citas"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiCalendarTodoFill className="text-2xl" />
                  <p>Citas</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plataforma/paciente/reservar-citas"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiCheckboxMultipleFill className="text-2xl" />
                  <p>Reservar una cita</p>
                </NavLink>
              </li>
              <li>
                <NavLink
                  to="/plataforma/paciente/prescripcion"
                  className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl transition"
                >
                  <RiStethoscopeFill className="text-2xl" />
                  <p>Prescripción</p>
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
        )}
      </div>

      <div
        onClick={logout}
        className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-red-100 text-lg py-4 px-8 rounded-xl cursor-pointer transition"
      >
        <RiLogoutBoxLine className="text-2xl" />
        <p>Cerrar Sesión</p>
      </div>
    </div>
  );
};
