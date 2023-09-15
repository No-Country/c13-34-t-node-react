import { RiSearchLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { RiEyeFill } from "react-icons/ri";

import useSWR from "swr";
import { DoctorPatientsService } from "@/services/doctorPatients";
// import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Error } from "../../shared/Error";
import { Loading } from "../../shared/Loading";

const getDoctorPatients = "getDoctorPatients";

export const DoctorPatientsPage = () => {
  const { data, error, isLoading } = useSWR(
    getDoctorPatients,
    DoctorPatientsService.getDoctorPatients,
  );

  if (isLoading) return <Loading />;

  if (error || !data)
    return (
      <Error
        message="USTED AUN NO TIENE PACIENTES"
        linkText="Agende su cita Aquí"
        linkTo="/plataforma/doctor/citas"
      />
    );

  return (
    <div className="bg-gray-200">
      <div className="bg-dark-green h-52">
        <div className="text-white px-8 py-10 flex justify-between text-lg font-bold uppercase">
          <h2>Mis Pacientes</h2>
          <h2>Notificación</h2>
        </div>

        <div className="bg-white mx-4 2xl:mx-8 px-4 pt-8 pb-20 2xl:p-8 rounded-2xl shadow-xl">
          <div className="bg-gray-50 my-0 p-4 flex items-center gap-8 rounded-tl-md rounded-tr-md">
            <div className="relative">
              <RiSearchLine className="absolute text-gray-400 opacity-60 top-3 left-4 text-lg" />
              <input
                type="text"
                placeholder="Buscar por nombre, apellido o correo"
                className="bg-white outline-none py-1.5 pl-12 pr-4 rounded-2xl text-lg text-dark-green border border-gray-200 w-full 2xl:w-96"
              />
            </div>
          </div>

          {data.patients.length > 0 && (
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
                      Cita
                    </th>
                    <th className="p-3 text-sm font-semibold tracking-wide text-center uppercase">
                      Historial
                    </th>
                  </tr>
                </thead>

                <tbody className="divide-y divide-gray-100">
                  {data.patients.map((nextAppointment) => (
                    <tr key={nextAppointment.id} className="bg-white">
                      <td className="capitalize p-3 text-sm text-gray-700 whitespace-nowrap">
                        {nextAppointment.user.id}
                      </td>
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
          )}

          {data.patients.length === 0 && (
            <div className="flex flex-col items-center justify-center gap-6 2xl:px-4 py-16 text-gray-600 mx-auto">
              <div className="uppercase text-lg 2xl:text-2xl font-semibold text-dark-green text-center">
                USTED AUN NO TIENE PACIENTES
              </div>
              <NavLink
                to="/plataforma/doctor/citas"
                className="flex items-center justify-center bg-dark-green uppercase rounded-xl text-white hover:text-primary hover:bg-other-blue font-opensans font-medium border hover:border-primary w-64 py-2 transition duration-300"
              >
                Agende su cita Aquí
              </NavLink>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};
