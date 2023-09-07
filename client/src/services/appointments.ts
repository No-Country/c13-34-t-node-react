import { TAppointment } from "@/types/appointments";
import { client } from "../config/client";

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

async function changeDoctorSchedule(id: number) {
  const res = await client.put(
    `/api/v1/doctor/toggle-medical-appointment-date-status/${id}`,
  );
  console.log(res);
  return res;
}

export const AppointmentsService = {
  postDoctorAvailability,
  getDoctorSchedule,
  changeDoctorSchedule,
};