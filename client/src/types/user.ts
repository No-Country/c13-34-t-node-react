export type TRole = "patient" | "doctor" | "admin";
export type TUserStatus = "disable" | "enable" | "pending";

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
};

export type TNewUser = Omit<TUser, "id" | "status"> & {
  password: string;
  confirmPassword: string;
};
