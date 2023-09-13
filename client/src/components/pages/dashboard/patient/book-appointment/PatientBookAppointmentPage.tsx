import { useEffect, useMemo, useState } from "react";
import { AppointmentsService } from "@/services/appointments";
import { UsersService } from "@/services/users";
import { useFormik } from "formik";
import useSWR from "swr";
import { uniq } from "lodash-es";
import { NavLink, useNavigate } from "react-router-dom";
import { Modal } from "@/components/common/Modal";
import { AxiosError } from "axios";

export const PatientBookAppointmentPage = () => {
  const navigate = useNavigate();
  const [showModal, setShowModal] = useState(false);
  const [message, setMessage] = useState("");

  const doctorId = useMemo(() => {
    const { searchParams } = new URL(location.href);
    return searchParams.get("doctorId") ?? "";
  }, []);

  const { values, handleSubmit, handleChange, setFieldValue, resetForm } =
    useFormik({
      initialValues: {
        doctorId,
        description: "",
        date: "",
        hour: "",
      },
      onSubmit: async ({ date, hour, description }) => {
        const dateId = selectedDoctor!.medicalAppointmentDates.find(
          (d) => d.date === date + " " + hour,
        )!.id;
        try {
          await AppointmentsService.createAppointment(dateId, { description });
          resetForm();
          // redirigir al detalle de cita
          setMessage("Su cita se ha reservado exitosamente");
          setShowModal(true);
        } catch (error) {
          // mostrar error
          if (error instanceof AxiosError) {
            if (error.response) {
              alert("Formulario Invalido");
            } else {
              setMessage("No se pudo establecer conexión con el Servidor!");
              setShowModal(true);
            }
          }
          // console.log(error);
        }
      },
    });

  const { data: doctorsResult } = useSWR("getDoctors", UsersService.getDoctors);

  const selectedDoctor = useMemo(() => {
    if (!doctorsResult || !values.doctorId) return null;
    return doctorsResult.doctors.find((d) => d.id === +values.doctorId) || null;
  }, [doctorsResult, values.doctorId]);

  const dates = useMemo(() => {
    if (!selectedDoctor) return [];
    const dates = selectedDoctor.medicalAppointmentDates
      .filter((d) => d.status === "pending")
      .map((d) => d.date.split(" ")[0]);
    return uniq(dates);
  }, [selectedDoctor]);

  const hours = useMemo(() => {
    if (!selectedDoctor || !values.date) return [];
    const hours = selectedDoctor.medicalAppointmentDates
      .filter((d) => d.status === "pending")
      .filter((d) => d.date.startsWith(values.date))
      .map((d) => d.date.split(" ")[1]);
    return uniq(hours);
  }, [selectedDoctor, values.date]);

  useEffect(() => {
    setFieldValue("date", "");
    setFieldValue("hour", "");
  }, [values.doctorId]);

  return (
    <div className="bg-gray-50">
      <Modal
        showModal={showModal}
        onClose={() => {
          setShowModal(false);
          navigate("/plataforma/paciente/citas");
        }}
        message={message}
      />
      <div className="bg-dark-green h-52">
        <div className="text-white px-8 py-10 flex justify-between text-lg font-bold uppercase">
          <h2>Reservar Cita</h2>
          <h2>Notificación</h2>
        </div>

        <div className="bg-white mx-4 2xl:mx-8 px-4 pt-8 pb-20 2xl:p-8 rounded-2xl shadow-xl">
          <div className="text-2xl text-dark-green font-medium pb-8">
            Reserve su nueva cita
          </div>
          <form onSubmit={handleSubmit} className="w-full flex flex-col gap-6">
            <label className="block">
              <span className="block text-lg text-gray-400 font-semibold pb-1">
                Seleccionar Doctor *
              </span>
              <select
                value={values.doctorId}
                onChange={handleChange}
                name="doctorId"
                required
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              >
                <option value="">Seleccione un doctor</option>
                {doctorsResult?.doctors.map((doctor) => (
                  <option key={doctor.id} value={doctor.id}>
                    {doctor.user.firstName} {doctor.user.lastName}
                  </option>
                ))}
              </select>
            </label>

            <label className="block">
              <span className="block text-lg text-gray-400 font-semibold pb-1">
                Descripción *
              </span>
              <input
                value={values.description}
                onChange={handleChange}
                name="description"
                type="text"
                required
                minLength={20}
                placeholder="Describe brevemente la consulta"
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              />
            </label>

            <label className="block">
              <span className="block text-lg text-gray-400 font-semibold pb-1">
                Fecha(s) programada(s) *
              </span>
              <select
                value={values.date}
                onChange={handleChange}
                name="date"
                required
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              >
                <option value="">Seleccione la fecha</option>
                {dates.map((d) => (
                  <option key={d} value={d}>
                    {d}
                  </option>
                ))}
              </select>
            </label>

            <label className="block 2xl:pb-10">
              <span className="block text-lg text-gray-400 font-semibold pb-1">
                Hora(s) de atención *
              </span>
              <select
                value={values.hour}
                onChange={handleChange}
                name="hour"
                required
                className="ring-1 ring-gray-300 w-full rounded-xl px-4 py-3 mt-2 outline-none focus:ring-2 focus:ring-primary-gray"
              >
                <option value="">Seleccione la hora</option>
                {hours.map((h) => (
                  <option key={h} value={h}>
                    {h}
                  </option>
                ))}
              </select>
            </label>

            <div className="flex items-center max-sm:w-full justify-between gap-2 2xl:w-96">
              <button className="2xl:w-48 bg-dark-green py-2 tracking-wider px-6 rounded-xl text-white hover:text-dark-green hover:bg-white border hover:border-dark-green uppercase transition font-medium">
                Guardar
              </button>
              <NavLink
                to="/plataforma/paciente/doctores"
                className="text-center 2xl:w-48 bg-red-500 py-2 tracking-wider px-6 rounded-xl text-white hover:text-red-500 hover:bg-white border hover:border-red-500 uppercase transition font-medium"
              >
                Cancelar
              </NavLink>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};
