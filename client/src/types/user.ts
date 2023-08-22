type TRole = "client" | "doctor" | "admin";

export type TUser = {
  email: string;
  password: string;
  name: string;
  genero: "men" | "women";
  birthdate: number;
  phone: string;
  role: TRole[];
};
