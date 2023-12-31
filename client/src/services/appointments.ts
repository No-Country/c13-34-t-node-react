import { client } from "@/config/client";
import { TAppointment } from "@/types/appointments";
import { TMedicalAppointment } from "../types/appointments";

type TNewAppointment = {
  description: string;
};

type Hour = {
  status: string;
  hour: string;
};

async function createAppointment(
  dateId: number,
  doctorId: number,
  newAppointment: TNewAppointment,
) {
  return client.post(
    `/api/v1/patients/medical-appointment/${dateId}/${doctorId}`,
    newAppointment,
  );
}

async function getPatientAppointments() {
  type TGetData = {
    status: string;
    patient: {
      id: number;
      medicalAppointments: TMedicalAppointment[];
    };
  };

  const res = await client.get<TGetData>(
    "/api/v1/patients/medical-appointment",
  );

  return res.data.patient.medicalAppointments;
}

async function canceledAppointmentPatient(appointmentId: number) {
  return client.delete("/api/v1/patients/cancel-appointment/" + appointmentId);
}

async function postDoctorAvailability(date: string, hours: string[]) {
  const res = await client.post("/api/v1/doctor/assign-available-dates", {
    date,
    hours,
  });

  return res;
}

async function getDoctorSchedule() {
  type TGetDoctorSchedule = {
    status: string;
    dates: TAppointment[];
    count: number;
  };

  const res = await client.get<TGetDoctorSchedule>(
    "/api/v1/doctor/get-all-dates-by-doctor",
  );

  return res.data;
}

async function getDoctorHoursFromDate(date: string) {
  type TGetDoctorHoursFromDate = {
    status: string;
    hours: Hour[];
  };

  const res = await client.post<TGetDoctorHoursFromDate>(
    "/api/v1/doctor/get-all-hours-from-date-doctor",
    {
      date,
    },
  );

  return res.data;
}

async function changeDoctorSchedule(id: number) {
  const res = await client.patch(
    `/api/v1/doctor/toggle-medical-appointment-date-status/${id}`,
  );

  return res;
}

export const AppointmentsService = {
  createAppointment,
  getPatientAppointments,
  canceledAppointmentPatient,
  postDoctorAvailability,
  getDoctorSchedule,
  changeDoctorSchedule,
  getDoctorHoursFromDate,
};
