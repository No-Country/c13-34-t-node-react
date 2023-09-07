export type TAppointmentStatus = "selected" | "cancelled" | "pending";

export type TAppointment = {
  id: number;
  date: string;
  status: TAppointmentStatus;
  doctor: {
    id: number;
    specialty: string;
  };
};
