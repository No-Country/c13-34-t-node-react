import { NavLink } from "react-router-dom";
import { UsersService } from "@/services/users";
import { RiEyeFill, RiEdit2Fill } from "react-icons/ri";
import useSWR, { useSWRConfig } from "swr";
// import { TAppointmentStatus, TUser } from "@/types/user";
// import { Modal } from "@/components/common/Modal";
// import { useState } from "react";

const getHighLevelRolesUsersKey = "getHighLevelRolesUsers";

export const PatientAppointmentsPage = () => {
  // const { data, error } = useSWR(
  //   getHighLevelRolesUsersKey,
  //   UsersService.getHighLevelRolesUsers,
  // );

  // if (error) return <div> Ha ocurrido un error</div>;
  // if (!data) return <div> Cargando...</div>;

  // const { users } = data;

  return (
    <div className="bg-gray-50">
      <div className="bg-dark-green h-52">
        <div className="text-white px-8 py-10 flex justify-between text-lg font-bold uppercase">
          <h2>Mis Citas</h2>
          <h2>Notificación</h2>
        </div>

        <div className="bg-white mx-8 p-8 rounded-tl-2xl rounded-tr-2xl shadow-xl">
          <div className="overflow-auto">
            <table className="table-auto bg-white px-4 py-8 w-full">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Cita No.
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Doctor
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Apellidos
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Especialidad
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Descripción
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Teléfono
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Correo
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Estado
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Prescripción
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {/* {filteredAppointments.map((user) => ( */}
                <tr className="bg-white">
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    <NavLink
                      to="/"
                      className="font-bold text-blue-500 hover:underline"
                    >
                      001
                      {/* {user.id} */}
                    </NavLink>
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    Jorge Luis
                    {/* {user.firstName} */}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    Villalva Rosales
                    {/* {user.lastName} */}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    medicina general
                    {/* {user.speciality} */}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    Aqui va la descriptción medica del paciente 2023
                    {/* {user.description} */}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    0123456789
                    {/* {user.telephone} */}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    jorge@gmail.com
                    {/* {user.email} */}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    Ver si esta: selected o pending
                    {/* <StatusChip user={user} /> */}
                  </td>

                  <td className="p-3 flex items-center justify-center gap-4">
                    <NavLink
                      to="/plataforma/paciente/registros-medicos"
                      // to={`/plataforma/paciente/registros-medicos?prescriptionId=${user.id}`}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <RiEyeFill className="text-4xl" />
                    </NavLink>
                  </td>
                </tr>
                {/* ))} */}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

// const StatusChip = ({ user }: { user: TUser }) => {
//   const statuses: Record<TAppointmentStatus, { name: string; color: string }> =
//     {
//       selected: {
//         name: "selected",
//         color: "#4FB783",
//       },
//       pending: {
//         name: "pending",
//         color: "#DC143C",
//       },
//     };

//   const current = statuses[user.status];

//   return (
//     <div
//       className="px-3 py-1 text-sm uppercase tracking-wider rounded-lg text-white inline-flex items-center gap-2"
//       style={{ backgroundColor: current.color }}
//     >
//       <span>{current.name}</span>
//       <StatusChipAcceptRejectButton user={user} />
//       {/* {user.status === "pending" && (
//       )} */}
//     </div>
//   );
// };

// const StatusChipAcceptRejectButton = ({ user }: { user: TUser }) => {
//   const [show, setShow] = useState(false);
//   const { mutate } = useSWRConfig();

//   return (
//     <>
//       <button
//         onClick={() => setShow(true)}
//         className="bg-white rounded-full aspect-square p-[2px]"
//       >
//         <RiEdit2Fill className="text-blue-500" />
//       </button>

//       <Modal
//         showModal={show}
//         onClose={() => setShow(false)}
//         message={
//           <div className="text-center">
//             <p className="mb-4">
//               ¿Qué desea hacer con el usuario {user.firstName}?
//             </p>
//             <div className="flex gap-2 justify-center">
//               <button
//                 className="bg-red-600 text-white rounded-xl py-1 px-2"
//                 onClick={async () => {
//                   await UsersService.deletedHighLevelRoleUser(user.id);
//                   await mutate(getHighLevelRolesUsersKey);
//                   setShow(false);
//                 }}
//               >
//                 Rechazar
//               </button>
//               <button
//                 className="bg-green-600 text-white rounded-xl py-1 px-2"
//                 onClick={async () => {
//                   await UsersService.acceptHighLevelRoleUser(user.id);
//                   await mutate(getHighLevelRolesUsersKey);
//                   setShow(false);
//                 }}
//               >
//                 Aceptar
//               </button>
//             </div>
//           </div>
//         }
//       />
//     </>
//   );
// };
