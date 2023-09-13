export type TRole = "patient" | "doctor" | "admin";
export type TUserStatus = "disable" | "enable" | "pending";
export type TAppointmentStatus = "selected" | "pending";

export type TUser = {
  id: number;
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  dateOfBirth: string;
  genre: "male" | "female";
  role: TRole;
  status: TUserStatus;
  appointment: TAppointmentStatus;
  patientId: number;
  doctorId: number;
};

export type TNewUser = Omit<TUser, "id" | "status" | "appointment"> & {
  password: string;
  confirmPassword: string;
};
