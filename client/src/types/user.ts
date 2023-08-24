type TRole = "client" | "doctor" | "admin";

export type TUser = {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: string;
  birthdate: number;
  genero: "men" | "women";
  role: TRole[];
};
