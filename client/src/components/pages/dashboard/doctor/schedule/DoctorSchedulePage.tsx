import { RiEdit2Fill } from "react-icons/ri";
import useSWR from "swr";
import { Modal } from "@/components/common/Modal";
import { useState } from "react";
import clsx from "clsx";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { TAppointment, TAppointmentDateStatus } from "@/types/appointments";
import { AppointmentsService } from "@/services/appointments";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";
import { Error } from "../../shared/Error";
import { useAuth } from "@/context/auth";

const getDoctorSchedule = "getDoctorSchedule";

export const DoctorSchedulePage = () => {
  const { user } = useAuth();

  const { data, mutate, error, isLoading } = useSWR(
    user!.doctorId ? getDoctorSchedule : null,
    AppointmentsService.getDoctorSchedule,
  );

  const [selectedStatus, setSelectedStatus] = useState<
    TAppointmentDateStatus | "todos"
  >("todos");

  if (isLoading)
    return (
      <div className="h-full w-full flex items-center justify-center">
        <LoadingSpinner />
      </div>
    );

  if (error || !data)
    return (
      <Error
        message="USTED AUN NO TIENE CRONOGRAMA"
        linkText="Agende su cita Aquí"
        linkTo="/plataforma/doctor/citas"
      />
    );

  const appointmentsData = data.dates;

  const filteredAppointments =
    selectedStatus !== "todos"
      ? appointmentsData?.filter((appoint) => appoint.status === selectedStatus)
      : appointmentsData;

  return (
    <div className="bg-gray-200">
      <div className="bg-dark-green h-52">
        <div className="text-white px-8 pt-10 flex justify-between text-lg font-bold uppercase">
          <div className="flex items-center justify-center max-sm:gap-8 gap-4">
            <h2 className="text-lg font-bold uppercase">Doctor</h2>
            <MdOutlineArrowForwardIos color="gray" className="text-xl" />
            <p className="font-bold text-lg">Cronograma</p>
          </div>

          <div className="max-sm:hidden">Notificación</div>
        </div>

        <div className="bg-white m-4 2xl:m-8 rounded-2xl">
          <div className="p-5 flex flex-col 2xl:flex-row 2xl:justify-end gap-4">
            <p className="py-1.5 max-sm:text-lg font-semibold">Mostrar citas</p>
            <button
              onClick={() => {
                setSelectedStatus("todos");
              }}
              className={clsx(
                "py-2 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
                selectedStatus === "todos"
                  ? "bg-other-blue text-white"
                  : "text-other-blue bg-white",
              )}
            >
              Todos
            </button>
            <button
              onClick={() => {
                setSelectedStatus("selected");
              }}
              className={clsx(
                "py-2 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
                selectedStatus === "selected"
                  ? "bg-other-blue text-white"
                  : "text-other-blue bg-white",
              )}
            >
              Agendadas
            </button>
            <button
              onClick={() => {
                setSelectedStatus("cancelled");
              }}
              className={clsx(
                "py-2 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
                selectedStatus === "cancelled"
                  ? "bg-other-blue text-white"
                  : "text-other-blue bg-white",
              )}
            >
              Canceladas
            </button>
            <button
              onClick={() => {
                setSelectedStatus("pending");
              }}
              className={clsx(
                "py-2 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
                selectedStatus === "pending"
                  ? "bg-other-blue text-white"
                  : "text-other-blue bg-white",
              )}
            >
              Pendientes
            </button>
          </div>

          <div className="bg-white px-5 2xl:pt-8 pb-20 2xl:px-5 rounded-2xl shadow-xl">
            <table className="overflow-scroll bg-white px-4 w-full">
              <thead className="bg-white border-b-2 border-gray-200">
                <tr>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Cita No.
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Fecha
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Hora
                  </th>
                  <th className="p-3 text-sm font-semibold tracking-wide text-left uppercase">
                    Estado
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y divide-gray-300">
                {filteredAppointments
                  ?.sort(
                    (a, b) =>
                      parseInt(a.date.split(" ")[1]) -
                      parseInt(b.date.split(" ")[1]),
                  )
                  .sort(
                    (a, b) =>
                      Number(new Date(a.date.split(" ")[0])) -
                      Number(new Date(b.date.split(" ")[0])),
                  )
                  .map((appoint) => (
                    <tr
                      key={appoint.id}
                      className="even:bg-gray-300 odd:bg-white"
                    >
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {appoint.id}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {appoint.date.split(" ")[0]}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        {appoint.date.split(" ")[1]}
                      </td>
                      <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                        <StatusChip appoint={appoint} mutate={mutate} />
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
  appoint,
  mutate,
}: {
  appoint: TAppointment;
  mutate: () => void;
}) => {
  const statuses: Record<
    TAppointmentDateStatus,
    { name: string; color: string }
  > = {
    selected: {
      name: "Agendada",
      color: "#4FB783",
    },
    cancelled: {
      name: "Cancelada",
      color: "#DC143C",
    },
    pending: {
      name: "Pendiente",
      color: "#d8be48",
    },
    completed: {
      name: "Completado",
      color: "#3E68FF",
    },
  };

  const current = statuses[appoint.status];

  return (
    <div
      className="px-3 py-1 text-sm uppercase tracking-wider rounded-lg text-white inline-flex items-center gap-2"
      style={{ backgroundColor: current.color }}
    >
      <span>{current.name}</span>
      <StatusChipAcceptRejectButton appoint={appoint} mutate={mutate} />
      {/* {user.status === "pending" && (
      )} */}
    </div>
  );
};

const StatusChipAcceptRejectButton = ({
  appoint,
  mutate,
}: {
  appoint: TAppointment;
  mutate: () => void;
}) => {
  const [show, setShow] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(false);

  const handleChangeClick = async () => {
    setIsLoading(true);
    const response = await AppointmentsService.changeDoctorSchedule(appoint.id);
    if (response.status === 204) {
      await mutate();
      setShow(false);
      setIsLoading(false);
    } else {
      setIsLoading(false);
      setError(true);
    }
  };

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
          isLoading ? (
            <LoadingSpinner />
          ) : error ? (
            <div className="text-center">
              <p className="mb-4">Ha ocurrido un error!</p>
            </div>
          ) : (
            <div className="text-center">
              <p className="mb-4 text-sm">
                {appoint.status === "cancelled"
                  ? `La cita ${appoint.date} ha sido cancelada. ¿Desea volver a agendarla como disponible?`
                  : appoint.status === "pending"
                  ? `La cita ${appoint.date} está disponible para los pacientes. ¿Desea eliminarla?`
                  : `La cita ${appoint.date} ha sido reservada por un paciente. ¿Desea eliminarla?`}
              </p>
              <div className="flex gap-2 justify-center">
                <button
                  className="disabled:bg-slate-300 bg-red-600 text-white rounded-xl py-1 px-2"
                  disabled={appoint.status === "cancelled"}
                  onClick={handleChangeClick}
                >
                  Eliminar
                </button>
                <button
                  className="disabled:bg-slate-300 bg-green-600 text-white rounded-xl py-1 px-2"
                  disabled={
                    appoint.status === "selected" ||
                    appoint.status === "pending"
                  }
                  onClick={handleChangeClick}
                >
                  Aceptar
                </button>
              </div>
            </div>
          )
        }
      />
    </>
  );
};
