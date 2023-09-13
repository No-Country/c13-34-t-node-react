import { RiSearchLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { UsersService } from "@/services/users";
import { RiEyeFill, RiEdit2Fill, RiEditBoxLine } from "react-icons/ri";
import useSWR, { useSWRConfig } from "swr";
import { TRole, TUser, TUserStatus } from "@/types/user";
import { Modal } from "@/components/common/Modal";
import { useEffect, useMemo, useRef, useState } from "react";
import clsx from "clsx";

const getHighLevelRolesUsersKey = "getHighLevelRolesUsers";

export const AdminUsersPage = () => {
  const { data, error } = useSWR(
    getHighLevelRolesUsersKey,
    UsersService.getHighLevelRolesUsers,
  );

  const [usersData, setUsersData] = useState<TUser[]>();
  const [selectedRole, setSelectedRole] = useState<TRole | "todos">("todos");
  const [searchTerm, setSearchTerm] = useState("");
  const originalUsers = useRef<TUser[]>([]);

  useEffect(() => {
    if (data) {
      setUsersData(data.users);
      originalUsers.current = data.users;
    }
  }, [data]);

  const filteredUsersByInput = useMemo(() => {
    const properties: (keyof TUser)[] = ["firstName", "lastName", "email"];
    return searchTerm
      ? usersData?.filter((user) =>
          properties.some((property) =>
            user[property]
              .toString()
              .toLocaleLowerCase()
              .includes(searchTerm.toLocaleLowerCase()),
          ),
        )
      : usersData;
  }, [usersData, searchTerm]);

  const filteredUsers =
    selectedRole !== "todos"
      ? filteredUsersByInput?.filter((user) => user.role === selectedRole)
      : filteredUsersByInput;

  return usersData ? (
    <div className="bg-gray-50">
      <div className="bg-dark-green text-white px-8 py-10 flex justify-between text-lg font-bold uppercase">
        <h2>Usuarios</h2>
        <h2>Notificación</h2>
      </div>

      <div className="bg-white mx-4 2xl:m-5 pb-16 rounded-2xl">
        <div className="max-sm:grid max-sm:grid-cols-1 p-4 flex w-full 2xl:justify-end gap-4 2xl:pr-24">
          <p className="py-1.5 font-semibold max-sm:text-xl">Mostrar</p>
          <button
            onClick={() => {
              setSelectedRole("todos");
            }}
            className={clsx(
              "py-3 2xl:py-1 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
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
              "py-3 2xl:py-1 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
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
              "py-3 2xl:py-1 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
              selectedRole === "doctor"
                ? "bg-other-blue text-white"
                : "text-other-blue bg-white",
            )}
          >
            Doctores
          </button>
        </div>

        <div className="bg-gray-50 2xl:mx-4 my-0 p-4 max-sm:grid max-sm:grid-cols-1 flex items-center gap-4 2xl:gap-8">
          <div className="relative">
            <RiSearchLine className="absolute text-gray-400 opacity-60 top-3 left-4 text-lg" />
            <input
              type="text"
              onChange={(e) => setSearchTerm(e.target.value)}
              placeholder="Buscar por nombre, apellido o correo"
              className="bg-white outline-none py-1.5 pl-12 pr-4 rounded-2xl text-lg text-dark-green border border-gray-200 w-full 2xl:w-96"
            />
          </div>
          <button className="text-white items-center bg-primary-green hover:bg-other-blue text-lg py-1.5 2xl:py-1 px-6 rounded-xl border hover:border-other-blue transition">
            Agregar nuevo usuario +
          </button>
        </div>

        <div className="overflow-auto">
          <table className="table-auto bg-white px-4 py-8 w-full">
            <thead className="bg-white border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                  No.
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                  Nombres
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                  Apellidos
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                  Teléfono
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                  Correo
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                  Fecha de Nacimiento
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                  Genero
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                  Role
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                  Estado
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                  Accion
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {filteredUsers?.map((user) => (
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
                  <td className="p-3 flex items-center justify-center gap-4">
                    <NavLink
                      to={`/plataforma/administrador/usuarios/${user.id}`}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <RiEyeFill className="text-3xl" />
                    </NavLink>

                    <NavLink
                      to={`/plataforma/administrador/usuarios/editar/${user.id}`}
                      className="hidden text-other-yellow hover:text-[#6d5d17] transition"
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
  ) : error ? (
    <div> Ha ocurrido un error</div>
  ) : (
    <div> Cargando...</div>
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
                className="disabled:bg-slate-300 bg-red-600 text-white rounded-xl py-1 px-2"
                disabled={user.status === "disable"}
                onClick={async () => {
                  await UsersService.deletedHighLevelRoleUser(user.id);
                  await mutate(getHighLevelRolesUsersKey);
                  setShow(false);
                }}
              >
                Rechazar
              </button>
              <button
                className="disabled:bg-slate-300 bg-green-600 text-white rounded-xl py-1 px-2"
                disabled={user.status === "enable"}
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
