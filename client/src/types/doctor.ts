import { TMedicalAppointmentDate } from "./appointments";

export interface TDoctors {
  status: string;
  results: number;
  doctors: TDoctor[];
}

export interface TDoctor {
  id: number;
  user: TUser;
  medicalAppointmentDates: TMedicalAppointmentDate[];
  specialty: string;
}

export interface TUser {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  status: string;
}
