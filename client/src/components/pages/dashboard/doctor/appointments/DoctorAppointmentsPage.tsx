import { useState } from "react";
import clsx from "clsx";
import { AppointmentsService } from "@/services/appointments";
import { AxiosError } from "axios";
import { Modal } from "../../../../common/Modal";
import { LoadingSpinner } from "@/components/common/LoadingSpinner";

const hoursAvailable = [
  { hr: "09:00 - 10:00", disable: true, value: "09:00" },
  { hr: "10:00 - 11:00", disable: false, value: "10:00" },
  { hr: "11:00 - 12:00", disable: false, value: "11:00" },
  { hr: "12:00 - 13:00", disable: false, value: "12:00" },
  { hr: "13:00 - 14:00", disable: false, value: "13:00" },
  { hr: "14:00 - 15:00", disable: false, value: "14:00" },
  { hr: "15:00 - 16:00", disable: false, value: "15:00" },
];

export const DoctorAppointmentsPage = () => {
  const [hoursSelected, setHoursSelected] = useState<string[]>([]);
  const [unavailableHours, setUnavailableHours] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);
  const [showModal, setShowModal] = useState(false);
  const [enableHours, setEnableHours] = useState(false);
  const [message, setMessage] = useState("");
  const [date, setDate] = useState("");
  const [loading, setLoading] = useState(false);

  const handleHourClick: React.MouseEventHandler<HTMLButtonElement> = (e) => {
    e.preventDefault();
    const hourSelected = e.currentTarget.value;
    const hours = hoursSelected.includes(hourSelected)
      ? hoursSelected.filter((x) => x !== hourSelected)
      : hoursSelected.concat(hourSelected);
    setHoursSelected(hours);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hoursSelected.length && enableHours) return setShowError(true);

    if (loading) {
      return;
    }

    setLoading(true);
    setShowError(false);
    const formData = new FormData(e.target as HTMLFormElement);
    const date = formData.get("date") as string;

    try {
      AppointmentsService.postDoctorAvailability(date, hoursSelected);
    } catch (error) {
      if (error instanceof AxiosError) {
        if (error.response) {
          setMessage("");
          setShowModal(true);
        } else {
          setMessage("No se pudo establecer conexión con el Servidor!");
          setShowModal(true);
        }
      }
    }
    setLoading(false);
    setMessage("Horarios agendados con éxito!");
    setShowModal(true);
    setHoursSelected([]);
    setUnavailableHours([]);
    setEnableHours(false);
    setDate("");
  };

  const handleDateSelect = async (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const res = await AppointmentsService.getDoctorHoursFromDate(date);
    if (res.status === "success") {
      const fetchedDates = res.hours.map((x) => x.hour);
      setUnavailableHours(fetchedDates);
      setEnableHours(true);
    } else {
      setMessage("Ha ocurrido un error!");
      setShowModal(true);
    }
  };

  return (
    <div className="bg-gray-50">
      <Modal
        showModal={showModal}
        onClose={() => setShowModal(false)}
        message={message}
      />
      <div className="bg-dark-green h-52">
        <h2 className="text-white text-center 2xl:text-lg font-bold uppercase px-8 pt-10 pb-10">
          Agendar Citas
        </h2>

        <div className="bg-white 2xl:mx-8 p-8 2xl:rounded-2xl shadow-xl">
          <div className="text-2xl text-dark-green font-medium pb-10 text-center 2xl:text-justify">
            Agendar disponibilidad
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <label
              htmlFor="date"
              className="text-lg text-gray-400 font-semibold text-center 2xl:text-justify"
            >
              Fecha(s) de atención *
            </label>
            <input
              name="date"
              id="date"
              type="date"
              value={date}
              onChange={(e) => {
                setDate(e.target.value);
                setEnableHours(false);
                setUnavailableHours([]);
              }}
              min={new Date().toISOString().split("T")[0]}
              required
              placeholder="Ingrese la fecha"
              className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
            />
            <button
              onClick={handleDateSelect}
              className="2xl:w-48 text-sm bg-dark-green py-2 tracking-wider px-6 rounded-xl text-white hover:text-dark-green hover:bg-white border hover:border-dark-green uppercase transition font-medium"
            >
              Seleccionar fecha
            </button>

            <label
              htmlFor="hoursAvailable"
              className="2xl:w-fit text-lg text-gray-400 font-semibold text-center"
            >
              Horario de atención *
            </label>
            <div className="flex flex-col 2xl:flex-row 2xl:w-44 gap-2">
              {hoursAvailable.map((hour, i) => (
                <button
                  key={i}
                  name="hoursAvailable"
                  value={hour.value}
                  onClick={handleHourClick}
                  disabled={
                    !enableHours || unavailableHours.includes(hour.value)
                  }
                  id="hoursAvailable"
                  className={clsx(
                    "enabled:hover:bg-dark-green disabled:opacity-75 disabled:bg-[#cccccc] enabled:hover:text-white text-dark-green border-2 border-dark-green font-bold py-2 px-5 rounded-full",
                    hoursSelected.includes(hour.value) &&
                      "bg-dark-green text-white",
                  )}
                >
                  {hour.hr}
                </button>
              ))}
            </div>

            <button
              type="submit"
              disabled={loading || !enableHours}
              className={`2xl:w-48 disabled:bg-[#cccccc] bg-dark-green py-2 tracking-wider px-6 rounded-xl text-white enabled:hover:text-dark-green enabled:hover:bg-white border enabled:hover:border-dark-green uppercase transition font-medium`}
            >
              {loading ? <LoadingSpinner /> : "Agendar"}
            </button>
            {showError && (
              <div className="text-red-500">Debe seleccionar algun horario</div>
            )}
          </form>
        </div>
      </div>
    </div>
  );
};
