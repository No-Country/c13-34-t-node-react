import { NavLink } from "react-router-dom";
import { RiEyeFill, RiCloseCircleFill } from "react-icons/ri";
import { Modal } from "@/components/common/Modal";
import { useState } from "react";
import { AppointmentsService } from "@/services/appointments";
import useSWR, { useSWRConfig } from "swr";
import {
  TAppointmentDateStatus,
  TMedicalAppointment,
  TMedicalAppointmentDate,
} from "@/types/appointments";
import { Error } from "../../shared/Error";
import { Loading } from "../../shared/Loading";

const getPatientAppointmentsKey = "getPatientAppointments";

export const PatientAppointmentsPage = () => {
  const {
    data: appointments,
    error,
    isLoading,
  } = useSWR(
    getPatientAppointmentsKey,
    AppointmentsService.getPatientAppointments,
  );

  if (isLoading) return <Loading />;
  if (error || !appointments)
    return (
      <Error
        message={"USTED AUN NO TIENE UNA CITA"}
        linkText="Reserve su cita Aquí"
        linkTo="/plataforma/paciente/reservar-cita"
      />
    );

  return (
    <div className="bg-gray-50">
      <div className="bg-dark-green h-52">
        <div className="text-white px-8 py-10 flex justify-between text-lg font-bold uppercase">
          <h2>Mis Citas</h2>
          <h2>Notificación</h2>
        </div>

        <div className="bg-white mx-4 2xl:mx-8 px-4 pt-8 pb-20 2xl:p-8 rounded-2xl shadow-xl">
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
                    Teléfono
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Correo
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Descripción
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Cita
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Acciones
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-100">
                {appointments.map((appointment) => (
                  <tr key={appointment.id} className="bg-white">
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <NavLink
                        to="/"
                        className="font-bold text-blue-500 hover:underline"
                      >
                        {appointment.id}
                      </NavLink>
                    </td>

                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {appointment.medicalAppointmentDate.doctor.user.firstName}
                    </td>

                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {appointment.medicalAppointmentDate.doctor.user.lastName}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {appointment.medicalAppointmentDate.doctor.specialty}
                    </td>

                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {appointment.medicalAppointmentDate.doctor.user.telephone}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {appointment.medicalAppointmentDate.doctor.user.email}
                    </td>

                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {appointment.description}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <StatusChip
                        appointment={appointment.medicalAppointmentDate}
                      />
                    </td>

                    <td className="p-3 flex items-center justify-center gap-4">
                      <NavLink
                        to={`/plataforma/paciente/registros-medicos?appointmentId=${appointment.id}`}
                        className="hidden text-blue-500 hover:text-blue-700 transition"
                      >
                        <RiEyeFill className="text-4xl" />
                      </NavLink>
                      {appointment.medicalAppointmentDate.status !==
                        "cancelled" && (
                        <StatusCancelButton appointment={appointment} />
                      )}
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

const StatusChip = ({
  appointment,
}: {
  appointment: TMedicalAppointmentDate;
}) => {
  const statuses: Record<
    TAppointmentDateStatus,
    { name: string; color: string }
  > = {
    pending: {
      name: "Pendiente",
      color: "#d8be48",
    },
    completed: {
      name: "Completedo",
      color: "#034561",
    },
    selected: {
      name: "Reservado",
      color: "#4FB783",
    },
    cancelled: {
      name: "Cancelado",
      color: "gray",
    },
  };

  const current = statuses[appointment.status];

  return (
    <div
      className="px-3 py-1 text-sm uppercase tracking-wider rounded-lg text-white inline-flex items-center gap-2"
      style={{ backgroundColor: current.color }}
    >
      <span>{current.name}</span>
    </div>
  );
};

const StatusCancelButton = ({
  appointment,
}: {
  appointment: TMedicalAppointment;
}) => {
  const [show, setShow] = useState(false);
  const { mutate } = useSWRConfig();

  return (
    <>
      <button onClick={() => setShow(true)}>
        <RiCloseCircleFill className="text-4xl text-other-red hover:text-[#940622]" />
      </button>

      <Modal
        showModal={show}
        onClose={() => setShow(false)}
        message={
          <div className="text-center">
            <p className="mb-4">
              ¿Seguro que desea cancelar esta cita No. {appointment.id}?
            </p>
            <div className="flex gap-2 justify-center">
              <button
                className="bg-green-600 text-white rounded-xl py-1 px-8"
                onClick={async () => {
                  await AppointmentsService.canceledAppointmentPatient(
                    appointment.medicalAppointmentDate.id,
                  );
                  await mutate(getPatientAppointmentsKey);
                  setShow(false);
                }}
              >
                Si
              </button>
            </div>
          </div>
        }
      />
    </>
  );
};
