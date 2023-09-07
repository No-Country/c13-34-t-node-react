export type TAppointmentStatus = "selected" | "cancelled" | "pending";

export type TAppointment = {
  id: number;
  date: string;
  status: string;
  doctor: {
    id: number;
    specialty: string;
  };
};
