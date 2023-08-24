type TRole = "client" | "doctor" | "admin";

export interface AuthResponse {
  user: User;
  token: string;
  refreshToken: string;
}

export interface AuthResponseError {
  body: {
    error: string;
  };
}

export interface User {
  // _id: string;
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  telephone: number;
  dateOfBirth: number;
  genre: "male" | "female";
  role: TRole[];
}

export interface AccessTokenResponse {
  statusCode: number;
  body: {
    accessToken: string;
  };
  error?: string;
}
