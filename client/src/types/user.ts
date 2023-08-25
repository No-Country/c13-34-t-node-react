export type TRole = "patient" | "doctor" | "admin";

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  telephone: string;
  dateOfBirth: string;
  genre: "male" | "female";
  role: TRole;
};

export type TNewUser = TUser & {
  password: string;
  confirmPassword: string;
};
