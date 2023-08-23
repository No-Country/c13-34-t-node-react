import { NavLink } from "react-router-dom";
import {
  RiLayoutMasonryFill,
  RiCalendarTodoFill,
  RiPsychotherapyFill,
  RiCheckboxMultipleFill,
  RiStethoscopeFill,
  RiHistoryFill,
  RiSeoFill,
} from "react-icons/ri";

export const Sidebar = () => {
  // Traer al usuario
  // En base al Rol mostrar la navegación correspondiente
  return (
    <div className="p-8">
      <div className="flex items-center justify-center">
        <img src="/images/logo.png" alt="" className="w-[180px] mb-11" />
      </div>

      <div className="flex items-center justify-center">
        <img src="/images/doctor.png" alt="" className="w-[130px] mb-6" />
      </div>

      <div className="flex flex-col">
        {/* administrador */}
        <div className="text-center text-[#777777] mb-12">Administrador</div>
        <div>
          <ul className="flex flex-col">
            <li>
              <NavLink
                to="/plataforma/administrador/panel"
                className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
              >
                <RiLayoutMasonryFill className="text-2xl" />
                <p>Panel</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/plataforma/administrador/citas"
                className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
              >
                <RiCalendarTodoFill className="text-2xl" />
                <p>Citas</p>
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/plataforma/administrador/pacientes"
                className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
              >
                <RiPsychotherapyFill className="text-2xl" />
                <p>Pacientes</p>
              </NavLink>
            </li>
          </ul>
        </div>

        {/* doctor */}
        <div className="text-center text-[#777777] mb-12">Doctor</div>
        <ul className="mb-4">
          <li>
            <NavLink
              to="/plataforma/doctor/panel"
              className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
            >
              <RiLayoutMasonryFill className="text-2xl" />
              <p>Panel</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/plataforma/doctor/citas"
              className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
            >
              <RiCalendarTodoFill className="text-2xl" />
              <p>Citas</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/plataforma/doctor/pacientes"
              className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
            >
              <RiPsychotherapyFill className="text-2xl" />
              <p>Pacientes</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/plataforma/doctor/cronograma"
              className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
            >
              <RiSeoFill className="text-2xl" />
              <p>Cronograma</p>
            </NavLink>
          </li>
        </ul>

        {/* paciente */}
        <div className="text-center text-[#777777]">
          <p>Paciente</p>
        </div>
        <ul>
          <li>
            <NavLink
              to="/plataforma/paciente/panel"
              className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
            >
              <RiLayoutMasonryFill className="text-2xl" />
              <p>Panel</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/plataforma/paciente/citas"
              className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
            >
              <RiCalendarTodoFill className="text-2xl" />
              <p>Citas</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/plataforma/paciente/reservar-citas"
              className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
            >
              <RiCheckboxMultipleFill className="text-2xl" />
              <p>Reservar una cita</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/plataforma/paciente/prescripcion"
              className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
            >
              <RiStethoscopeFill className="text-2xl" />
              <p>Prescripción</p>
            </NavLink>
          </li>
          <li>
            <NavLink
              to="/plataforma/paciente/registros-medicos"
              className="text-black hover:text-dark-green font-bold flex items-center justify-start gap-4 hover:bg-lightest-green text-lg py-4 px-8 rounded-xl"
            >
              <RiHistoryFill className="text-2xl" />
              <p>Registros Médicos</p>
            </NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
