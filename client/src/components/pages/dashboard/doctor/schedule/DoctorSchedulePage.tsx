import { RiEdit2Fill } from "react-icons/ri";
import useSWR, { useSWRConfig } from "swr";
import { Modal } from "@/components/common/Modal";
import { useEffect, useState } from "react";
import clsx from "clsx";
import { MdOutlineArrowForwardIos } from "react-icons/md";
import { TAppointment, TAppointmentStatus } from "@/types/appointments";
import { AppointmentsService } from "@/services/appointments";

const getDoctorSchedule = "getDoctorSchedule";

export const DoctorSchedulePage = () => {
  const { data, error } = useSWR(
    getDoctorSchedule,
    AppointmentsService.getDoctorSchedule,
  );

  const [appointmentsData, setAppointmentsData] = useState<TAppointment[]>();
  const [selectedStatus, setSelectedStatus] = useState<
    TAppointmentStatus | "todos"
  >("todos");

  useEffect(() => {
    AppointmentsService.getDoctorSchedule();
    if (data) {
      setAppointmentsData(data.dates);
    }
  }, [data]);

  const filteredAppointments =
    selectedStatus !== "todos"
      ? appointmentsData?.filter((appoint) => appoint.status === selectedStatus)
      : appointmentsData;

  return data ? (
    <div className="bg-gray-200 h-screen">
      <div className="bg-white px-8 pt-10 pb-4 flex justify-between">
        <div className="flex items-center justify-center gap-4">
          <h2 className="text-lg font-bold uppercase">Doctor</h2>
          <MdOutlineArrowForwardIos color="gray" size={25} />
          <p className="text-slate-500 font-bold text-lg">Cronograma</p>
        </div>
        <div>Notificación</div>
      </div>

      <div className="bg-white m-8 rounded-2xl">
        <div className="p-4 flex justify-end gap-4 pr-24">
          <p className="py-1.5 font-semibold">Mostrar</p>
          <button
            onClick={() => {
              setSelectedStatus("todos");
            }}
            className={clsx(
              "py-15 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
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
              "py-15 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
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
              "py-15 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
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
              "py-15 tracking-wider px-6 rounded-xl border uppercase transition text-xs font-medium border-other-blue",
              selectedStatus === "pending"
                ? "bg-other-blue text-white"
                : "text-other-blue bg-white",
            )}
          >
            Pendientes
          </button>
        </div>

        <div className="overflow-auto">
          <table className="table-auto bg-white px-4 py-8 w-full">
            <thead className="bg-white border-b-2 border-gray-200">
              <tr>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Fecha
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
                  Hora
                </th>
                <th className="p-3 text-sm font-semibold tracking-wide text-left">
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
                      {appoint.date.split(" ")[0]}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      {appoint.date.split(" ")[1]}
                    </td>
                    <td className="p-3 text-sm text-gray-700 whitespace-nowrap">
                      <StatusChip appoint={appoint} />
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

const StatusChip = ({ appoint }: { appoint: TAppointment }) => {
  const statuses: Record<TAppointmentStatus, { name: string; color: string }> =
    {
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
    };

  const current = statuses[appoint.status];

  return (
    <div
      className="px-3 py-1 text-sm uppercase tracking-wider rounded-lg text-white inline-flex items-center gap-2"
      style={{ backgroundColor: current.color }}
    >
      <span>{current.name}</span>
      <StatusChipAcceptRejectButton appoint={appoint} />
      {/* {user.status === "pending" && (
      )} */}
    </div>
  );
};

const StatusChipAcceptRejectButton = ({
  appoint,
}: {
  appoint: TAppointment;
}) => {
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
            <p className="mb-4">¿Qué desea hacer con la cita {appoint.date}?</p>
            <div className="flex gap-2 justify-center">
              <button
                className="disabled:bg-slate-300 bg-red-600 text-white rounded-xl py-1 px-2"
                disabled={appoint.status === "cancelled"}
                onClick={async () => {
                  await AppointmentsService.changeDoctorSchedule(appoint.id);
                  setShow(false);
                }}
              >
                Cancelar
              </button>
              <button
                className="disabled:bg-slate-300 bg-green-600 text-white rounded-xl py-1 px-2"
                disabled={appoint.status === "selected"}
                /*onClick={async () => {
                  await UsersService.acceptHighLevelRoleUser(user.id);
                  await mutate(getHighLevelRolesUsersKey);
                  setShow(false);
                }}*/
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
