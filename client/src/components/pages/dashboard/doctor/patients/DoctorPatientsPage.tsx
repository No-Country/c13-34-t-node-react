import { RiSearchLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { RiEyeFill } from "react-icons/ri";
import clsx from "clsx";
import { useEffect, useState } from "react";
import useSWR from "swr";
import { DoctorPatientsService } from "@/services/doctorPatients";
import { TPatient } from "@/types/patients";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const getDoctorPatients = "getDoctorPatients";

export const DoctorPatientsPage = () => {
  const { data, isLoading } = useSWR(
    getDoctorPatients,
    DoctorPatientsService.getDoctorPatients,
  );

  const [nextAppointments, setNextAppointments] = useState<TPatient[]>([]);

  useEffect(() => {
    if (data) {
      setNextAppointments(data.patients);
    }
  }, [data]);

  return data ? (
    <div className="bg-gray-200 h-screen">
      <div className="bg-white px-8 pt-10 pb-4 flex justify-between">
        <h2 className="text-lg font-bold uppercase">Usuarios</h2>
        <div>Notificación</div>
      </div>

      <div className="bg-white m-8 rounded-tl-2xl rounded-tr-2xl">
        <div className="p-4 flex justify-end gap-4 pr-24">
          <p className="py-1.5 font-semibold">Mostrar</p>
          <button
            className={clsx(
              "py-15 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
            )}
          >
            Todos
          </button>
          <button
            className={clsx(
              "py-15 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
            )}
          >
            Administradores
          </button>
          <button
            className={clsx(
              "py-15 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
            )}
          >
            Doctores
          </button>
        </div>
        <div className="bg-gray-50 mx-4 my-0 p-4 flex items-center gap-8">
          <div className="relative">
            <RiSearchLine className="absolute text-gray-400 opacity-60 top-3 left-4 text-lg" />
            <input
              type="text"
              placeholder="Buscar por nombre, apellido o correo"
              className="bg-white outline-none py-1.5 pl-12 pr-4 rounded-2xl text-lg text-dark-green border border-gray-200 w-96"
            />
          </div>
        </div>

        <div className="overflow-auto">
          <table className="table-auto bg-white px-4 py-8 w-full">
            <thead className="bg-white border-b-2 border-gray-200">
              <tr>
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
                  Cita
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Historial
                </th>
              </tr>
            </thead>

            <tbody className="divide-y divide-gray-100">
              {nextAppointments?.map((nextAppointment) => (
                <tr key={nextAppointment.id} className="bg-white">
                  <td className="capitalize p-3 text-sm text-gray-700 whitespace-nowrap">
                    {nextAppointment.user.firstName}
                  </td>
                  <td className="capitalize p-3 text-sm text-gray-700 whitespace-nowrap">
                    {nextAppointment.user.lastName}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {nextAppointment.user.telephone}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {nextAppointment.user.email}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {nextAppointment.user.dateOfBirth}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                    {nextAppointment.user.genre === "male"
                      ? "Masculino"
                      : "Femenino"}
                  </td>
                  <td className="p-3 text-sm text-gray-700 font-bold whitespace-nowrap">
                    {nextAppointment.user.appointment}
                  </td>
                  <td className="p-3 text-sm text-gray-700 whitespace-nowrap flex justify-center">
                    <NavLink
                      to={`/plataforma/doctor/pacientes/${nextAppointment.id}`}
                      className="text-blue-500 hover:text-blue-700 transition"
                    >
                      <RiEyeFill className="text-3xl" />
                    </NavLink>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  ) : isLoading ? (
    <div className="h-full w-full flex items-center justify-center">
      <LoadingSpinner />
    </div>
  ) : (
    <div className="h-full w-full flex items-center justify-center">
      <p>Ha ocurrido un error!</p>
    </div>
  );
};
