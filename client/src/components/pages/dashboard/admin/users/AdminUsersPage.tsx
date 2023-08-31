import { RiSearchLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { UsersService } from "@/services/users";
import { RiEyeFill, RiEdit2Fill, RiEditBoxLine } from "react-icons/ri";
import useSWR, { useSWRConfig } from "swr";
import { TRole, TUser, TUserStatus } from "@/types/user";
import { Modal } from "@/components/common/Modal";
import { useState } from "react";
import clsx from "clsx";

const getHighLevelRolesUsersKey = "getHighLevelRolesUsers";

export const AdminUsersPage = () => {
  const { data, error } = useSWR(
    getHighLevelRolesUsersKey,
    UsersService.getHighLevelRolesUsers,
  );

  const [selectedRole, setSelectedRole] = useState<TRole | "todos">("todos");

  if (error) return <div> Ha ocurrido un error</div>;
  if (!data) return <div> Cargando...</div>;

  const { users } = data;

  const filteredUsers =
    selectedRole !== "todos"
      ? users.filter((user) => user.role === selectedRole)
      : users;

  return (
    <div className="bg-gray-50">
      <div className="bg-white px-8 pt-10 pb-4 flex justify-between">
        <h2 className="text-lg font-bold uppercase">Usuarios</h2>
        <div>Notificación</div>
      </div>

      <div className="bg-white m-8 rounded-tl-2xl rounded-tr-2xl">
        <div className="p-4 flex justify-end gap-4 pr-24">
          <p className="py-1.5 font-semibold">Mostrar</p>
          <button
            onClick={() => {
              setSelectedRole("todos");
            }}
            className={clsx(
              "py-15 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
              selectedRole === "todos"
                ? "bg-other-blue text-white"
                : "text-other-blue bg-white",
            )}
          >
            Todos
          </button>
          <button
            onClick={() => {
              setSelectedRole("admin");
            }}
            className={clsx(
              "py-15 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
              selectedRole === "admin"
                ? "bg-other-blue text-white"
                : "text-other-blue bg-white",
            )}
          >
            Administradores
          </button>
          <button
            onClick={() => {
              setSelectedRole("doctor");
            }}
            className={clsx(
              "py-15 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
              selectedRole === "doctor"
                ? "bg-other-blue text-white"
                : "text-other-blue bg-white",
            )}
          >
            Doctores
          </button>
        </div>
        <div className="bg-gray-50 mx-4 my-0 p-4 flex items-center gap-8">
          <form action="" className="relative">
            <RiSearchLine className="absolute text-gray-400 opacity-60 top-3 left-4 text-lg" />
            <input
              type="text"
              placeholder="Buscar usuarios"
              className="bg-white outline-none py-1.5 pl-12 pr-4 rounded-2xl text-lg text-dark-green border border-gray-200 w-96"
            />
          </form>
          <button className="text-white items-center bg-primary-green hover:bg-dark-green text-lg py-1 px-6 rounded-xl border hover:border-dark-green transition">
            Agregar nuevo usuario +
          </button>
        </div>

        <div className="overflow-auto">
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
              {filteredUsers.map((user) => (
                <tr key={user.id} className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <NavLink
                      to="/"
                      className="font-bold text-blue-500 hover:underline"
                    >
                      {user.id}
                    </NavLink>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.firstName}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.lastName}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.telephone}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.email}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.dateOfBirth}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.genre}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {user.role}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <StatusChip user={user} />
                  </td>
                  <td className="p-3 flex items-center gap-4">
                    <NavLink
                      to={`/plataforma/administrador/usuarios/${user.id}`}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <RiEyeFill className="text-3xl" />
                    </NavLink>

                    <NavLink
                      to={`/plataforma/administrador/usuarios/editar/${user.id}`}
                      className="text-other-yellow hover:text-[#6d5d17] transition"
                    >
                      <RiEditBoxLine className="text-3xl" />
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const StatusChip = ({ user }: { user: TUser }) => {
  const statuses: Record<TUserStatus, { name: string; color: string }> = {
    enable: {
      name: "Habilitado",
      color: "#4FB783",
    },
    disable: {
      name: "Desabilitado",
      color: "#DC143C",
    },
    pending: {
      name: "Pendiente",
      color: "#d8be48",
    },
  };

  const current = statuses[user.status];

  return (
    <div
      className="px-3 py-1 text-sm uppercase tracking-wider rounded-lg text-white inline-flex items-center gap-2"
      style={{ backgroundColor: current.color }}
    >
      <span>{current.name}</span>
      <StatusChipAcceptRejectButton user={user} />
      {/* {user.status === "pending" && (
      )} */}
    </div>
  );
};

const StatusChipAcceptRejectButton = ({ user }: { user: TUser }) => {
  const [show, setShow] = useState(false);
  const { mutate } = useSWRConfig();

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="bg-white rounded-full aspect-square p-[2px]"
      >
        <RiEdit2Fill className="text-blue-500" />
      </button>

      <Modal
        showModal={show}
        onClose={() => setShow(false)}
        message={
          <div className="text-center">
            <p className="mb-4">
              ¿Qué desea hacer con el usuario {user.firstName}?
            </p>
            <div className="flex gap-2 justify-center">
              <button
                className="bg-red-600 text-white rounded-xl py-1 px-2"
                onClick={async () => {
                  await UsersService.deletedHighLevelRoleUser(user.id);
                  await mutate(getHighLevelRolesUsersKey);
                  setShow(false);
                }}
              >
                Rechazar
              </button>
              <button
                className="bg-green-600 text-white rounded-xl py-1 px-2"
                onClick={async () => {
                  await UsersService.acceptHighLevelRoleUser(user.id);
                  await mutate(getHighLevelRolesUsersKey);
                  setShow(false);
                }}
              >
                Aceptar
              </button>
            </div>
          </div>
        }
      />
    </>
  );
};
