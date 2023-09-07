import { client } from "@/config/client";

type TNewAppointment = {
  description: string;
};

async function createAppointment(
  dateId: number,
  newAppointment: TNewAppointment,
) {
  return client.post(
    "/api/v1/patients/medical-appointment/" + dateId,
    newAppointment,
  );
}

export const AppointmentsService = {
  createAppointment,
};
