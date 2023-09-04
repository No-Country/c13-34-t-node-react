import { useState } from "react";
import clsx from "clsx";

const hoursAvailable = [
  "09:00 - 10:00",
  "10:00 - 11:00",
  "11:00 - 12:00",
  "12:00 - 13:00",
  "13:00 - 14:00",
  "14:00 - 15:00",
  "15:00 - 16:00",
];

export const DoctorAppointmentsPage = () => {
  const [hoursSelected, setHoursSelected] = useState<string[]>([]);
  const [showError, setShowError] = useState(false);

  const handleHourClick = (
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>,
  ) => {
    e.preventDefault();
    const hourSelected = e.target.value;
    const hours = hoursSelected.includes(hourSelected)
      ? hoursSelected.filter((x) => x !== hourSelected)
      : hoursSelected.concat(hourSelected);
    setHoursSelected(hours);
  };

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();

    if (!hoursSelected.length) return setShowError(true);
    setShowError(false);
    const formData = new FormData(e.target as HTMLFormElement);
    const date = formData.get("date") as string;
    console.log(date, hoursSelected);
  };

  return (
    <div className="bg-gray-50">
      <div className="bg-dark-green h-52">
        <h2 className="text-white text-lg font-bold uppercase px-8 pt-10 pb-10">
          Agendar Citas
        </h2>

        <div className="bg-white mx-8 p-8 rounded-2xl shadow-xl">
          <div className="text-2xl text-dark-green font-medium pb-10">
            Agendar disponibilidad
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <label
              htmlFor="date"
              className="text-lg text-gray-400 font-semibold"
            >
              Fecha(s) de atención *
            </label>
            <input
              name="date"
              id="date"
              type="date"
              min={new Date().toISOString().split("T")[0]}
              required
              placeholder="Ingrese la fecha"
              className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
            />

            <label
              htmlFor="hoursAvailable"
              className="w-fit text-lg text-gray-400 font-semibold"
            >
              Horario de atención *
            </label>
            <div className="flex gap-2">
              {hoursAvailable.map((hour, i) => (
                <button
                  key={i}
                  name="hoursAvailable"
                  value={hour}
                  onClick={handleHourClick}
                  id="hoursAvailable"
                  className={clsx(
                    "hover:bg-dark-green hover:text-white text-dark-green border-2 border-dark-green font-bold py-2 px-4 rounded-full",
                    hoursSelected.includes(hour) && "bg-dark-green text-white",
                  )}
                >
                  {hour}
                </button>
              ))}
            </div>

            <button
              type="submit"
              className="2xl:w-48 bg-dark-green py-2 tracking-wider px-6 rounded-xl text-white hover:text-dark-green hover:bg-white border hover:border-dark-green uppercase transition font-medium"
            >
              Guardar
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
