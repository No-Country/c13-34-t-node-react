import { RiSearchLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";

export const AdminDashboardPage = () => {
  return (
    <div className="bg-gray-50">
      <div className="bg-white px-8 pt-10 pb-4 flex justify-between">
        <h2 className="text-lg font-bold">Usuarios</h2>
        <div>Notificación</div>
      </div>

      <div className="bg-white m-8 rounded-tl-2xl rounded-tr-2xl">
        <div className="p-4 flex justify-end gap-6 pr-24">
          <p className="py-2">Mostrar</p>
          <button className="bg-lightest-green py-2 px-4 rounded-xl">
            Reciente
          </button>
          <p className="py-2">Pacientes</p>
        </div>
        <div className="bg-gray-50 mx-4 my-0 p-4 flex items-center gap-8">
          <form action="" className="relative">
            <RiSearchLine className="absolute text-gray-400 opacity-60 top-3 left-4 text-lg" />
            <input
              type="text"
              placeholder="Buscar usuarios"
              className="bg-white outline-none py-2 pl-12 pr-4 rounded-2xl text-lg text-gray-400 border border-gray-200 w-96"
            />
          </form>
          <button className="text-black hover:text-dark-green items-center bg-lightest-green text-lg py-1 px-6 rounded-2xl cursor-pointer border border-primary-green">
            Agregar nuevo usuario +
          </button>
        </div>

        <table className="table-auto bg-white px-4 py-8 w-full">
          <thead className="bg-white border-b-2 border-gray-200">
            <tr>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                No.
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Nombres
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Apellidos
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Teléfono móvil
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Correo
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Fecha de Nacimiento
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Genero
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Role
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Estado
              </th>
              <th className="p-3 text-sm font-semibold tracking-wide text-left">
                Accion
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-100">
            <tr className="bg-gray-50">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <NavLink
                  to="/"
                  className="font-bold text-blue-500 hover:underline"
                >
                  001
                </NavLink>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Esmeralda Carolina
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Campos Hernandez
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                0123456789
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                esmeralda.usuario.2023@gmail.com
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                1988-02-08
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Female
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Administrador
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-green-800 bg-green-200 rounded-lg bg-opacity-50">
                  Aceptado
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700 flex items-center gap-6 whitespace-nowrap">
                <NavLink
                  to="/"
                  className="text-white hover:bg-[#870620] py-1.5 px-4 text-xs font-medium uppercase tracking-wider bg-other-red rounded-xl transition"
                >
                  Eliminar
                </NavLink>
                <NavLink
                  to="/"
                  className="text-white hover:bg-[#6d5d17] p-1.5 px-4 text-xs font-medium uppercase tracking-wider bg-other-yellow rounded-xl transition"
                >
                  Editar
                </NavLink>
              </td>
            </tr>
            <tr className="bg-white">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <NavLink
                  to="/"
                  className="font-bold text-blue-500 hover:underline"
                >
                  002
                </NavLink>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Esmeralda Carolina
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Campos Hernandez
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                0123456789
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                esmeralda.usuario.2023@gmail.com
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                1988-02-08
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Female
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Administrador
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-yellow-800 bg-yellow-200 rounded-lg bg-opacity-50">
                  Pendiente
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700  flex items-center gap-6 whitespace-nowrap">
                <NavLink
                  to="/"
                  className="text-white hover:bg-[#870620] py-1.5 px-4 text-xs font-medium uppercase tracking-wider bg-other-red rounded-xl transition"
                >
                  Eliminar
                </NavLink>
                <NavLink
                  to="/"
                  className="text-white hover:bg-[#6d5d17] p-1.5 px-4 text-xs font-medium uppercase tracking-wider bg-other-yellow rounded-xl transition"
                >
                  Editar
                </NavLink>
              </td>
            </tr>
            <tr className="bg-gray-50">
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <NavLink
                  to="/"
                  className="font-bold text-blue-500 hover:underline"
                >
                  003
                </NavLink>
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Esmeralda Carolina
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Campos Hernandez
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                0123456789
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                esmeralda.usuario.2023@gmail.com
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                1988-02-08
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Female
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                Administrador
              </td>
              <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                <span className="p-1.5 text-xs font-medium uppercase tracking-wider text-red-800 bg-red-200 rounded-lg bg-opacity-50">
                  Rechazado
                </span>
              </td>
              <td className="p-3 text-sm text-gray-700 flex items-center gap-6 whitespace-nowrap">
                <NavLink
                  to="/"
                  className="text-white hover:bg-[#870620] py-1.5 px-4 text-xs font-medium uppercase tracking-wider bg-other-red rounded-xl transition"
                >
                  Eliminar
                </NavLink>
                <NavLink
                  to="/"
                  className="text-white hover:bg-[#6d5d17] p-1.5 px-4 text-xs font-medium uppercase tracking-wider bg-other-yellow rounded-xl transition"
                >
                  Editar
                </NavLink>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
};
