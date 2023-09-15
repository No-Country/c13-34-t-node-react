import { RiSearchLine } from "react-icons/ri";
import { NavLink } from "react-router-dom";
import { RiEyeFill } from "react-icons/ri";
import { useState, useMemo } from "react";
import { TDoctor } from "@/types/doctor";
import { Modal } from "@/components/common/Modal";
import { UsersService } from "@/services/users";
import useSWR from "swr";
import { Loading } from "../../shared/Loading";
import { Error } from "../../shared/Error";

const getDoctorsKey = "getDoctors";

export const PatientDoctorsPage = () => {
  const { data, error, isLoading } = useSWR(
    getDoctorsKey,
    UsersService.getDoctors,
  );

  if (isLoading) return <Loading />;
  if (error || !data)
    return (
      <Error
        message="Error al cargar"
        linkText="Recargar"
        linkTo="/plataforma/paciente/doctores"
      />
    );

  const { doctors } = data;

  return (
    <div className="bg-gray-50">
      <div className="bg-dark-green h-52">
        <div className="text-white px-8 py-10 flex justify-between text-lg font-bold uppercase">
          <h2>Doctores</h2>
          <h2>Notificación</h2>
        </div>

        <div className="bg-white mx-4 2xl:mx-8 p-4 rounded-2xl shadow-xl">
          <div className="p-4 flex justify-between max-sm:gap-1">
            <h2 className="text-xl 2xl:text-2xl text-dark-green font-medium">
              Lista de doctores disponibles
            </h2>
            <button className="bg-other-blue py-2 tracking-wider px-3 2xl:px-6 rounded-xl text-white hover:text-other-blue hover:bg-white border hover:border-other-blue uppercase transition text-xs font-medium">
              Ver Todo
            </button>
          </div>
          <div className="bg-gray-50 my-0 p-4 flex items-center gap-8 rounded-tl-2xl rounded-tr-2xl">
            <form action="" className="relative w-full">
              <RiSearchLine className="absolute text-gray-400 opacity-60 top-3 left-4 text-lg" />
              <input
                type="text"
                placeholder="Buscar doctores disponibles"
                className="bg-white outline-none py-2 pl-12 pr-4 rounded-2xl text-lg text-gray-400 border border-gray-200 w-full 2xl:w-96"
              />
            </form>
          </div>

          <div className="overflow-auto">
            <table className="table-auto bg-white px-4 py-8 w-full">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 w-16 text-sm font-semibold tracking-wide text-left uppercase">
                    No.
                  </th>
                  <th className="p-3 w-52 text-sm font-semibold tracking-wide text-left uppercase">
                    Doctores
                  </th>
                  <th className="p-3 w-52 text-sm font-semibold tracking-wide text-left uppercase">
                    Apellidos
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Especialidad
                  </th>
                  <th className="p-3 flex justify-center 2xl:justify-end text-sm font-semibold tracking-wide uppercase 2xl:pr-16">
                    Opciones
                  </th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-100">
                {doctors.map((doctor) => (
                  <tr key={doctor.id} className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <NavLink
                        to="/"
                        className="font-bold text-blue-500 hover:underline"
                      >
                        {doctor.id}
                      </NavLink>
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {doctor.user.firstName}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {doctor.user.lastName}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {doctor.specialty}
                    </td>
                    <td className="p-3 flex justify-end gap-3">
                      <DatesButton doctor={doctor} />

                      <NavLink
                        to={`/plataforma/paciente/reservar-cita?doctorId=${doctor.id}`}
                        className="text-white hover:bg-green-700 py-1.5 my-2 px-4 text-xs font-medium uppercase tracking-wider bg-green-500 rounded-xl transition"
                      >
                        Reservar Cita
                      </NavLink>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
};

const DatesButton = ({ doctor }: { doctor: TDoctor }) => {
  const [show, setShow] = useState(false);

  const dates = useMemo(() => {
    const clonedDates = structuredClone(doctor.medicalAppointmentDates);
    clonedDates.sort((a, b) => (a.date > b.date ? 1 : -1));
    return clonedDates;
  }, [doctor]);

  return (
    <>
      <button
        onClick={() => setShow(true)}
        className="text-blue-500 hover:text-blue-700 transition"
      >
        <RiEyeFill className="text-4xl" />
      </button>

      <Modal
        showModal={show}
        onClose={() => setShow(false)}
        message={
          <div className="flex flex-col items-center justify-center max-sm:p-4 xl:w-[350px] bg-dark-green rounded-md shadow-2xl pb-6">
            <h1 className="text-white py-2 2xl:py-4 capitalize font-caudex text-2xl">
              {doctor.user.firstName} {doctor.user.lastName}
            </h1>
            <table className="table-auto">
              <thead>
                <tr className="text-white flex justify-between font-caudex text-xl mb-2">
                  <th>Fecha</th>
                  <th>Estado</th>
                </tr>
              </thead>
              <tbody>
                {dates.map((d) => (
                  <tr
                    key={d.id}
                    className="flex items-center gap-5 font-caudex text-xl text-white"
                  >
                    <td>{d.date}</td>

                    <td className="max-sm:text-lg">
                      {d.status === "pending" ? (
                        <span className="text-green-500">Disponible</span>
                      ) : (
                        <span className="text-red-500">No Disponible</span>
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        }
      />
    </>
  );
};
