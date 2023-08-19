import { NavLink } from "react-router-dom";

export const Sidebar = () => {
  // Traer al usuario
  // En base al Rol mostrar la navegación correspondiente
  return (
    <div>
      <div>
        {/* doctor */}
        <ul className="mb-4">
          <li>
            <NavLink to="/plataforma/doctor/citas">Citas</NavLink>
          </li>
          <li>
            <NavLink to="/plataforma/doctor/pacientes">Pacientes</NavLink>
          </li>
        </ul>

        {/* paciente */}
        <ul>
          <li>
            <NavLink to="/plataforma/paciente/historial">
              Historial Médico
            </NavLink>
          </li>
          <li>
            <NavLink to="/plataforma/paciente/citas">Citas</NavLink>
          </li>
        </ul>
      </div>
    </div>
  );
};
