type TRole = "client" | "doctor" | "admin";

export interface AuthResponse {
  body: {
    user: User;
    accessToken: string;
    refreshToken: string;
  };
}

export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface User {
  _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  phone: number;
  birthdate: number;
  genero: "male" | "female";
  role: TRole[];
}
