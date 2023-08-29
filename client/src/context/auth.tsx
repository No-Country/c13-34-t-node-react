import { FC, ReactNode, createContext, useContext, useState } from "react";
import { TNewUser, TUser } from "../types/user";
import { API_URL } from "../constants/api";
import axios from "axios";

type TAuthState = {
  loggedIn: boolean;
  user: TUser | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (newUser: TNewUser) => Promise<void>;
};

const AuthContext = createContext({} as TAuthState);

const initialToken = localStorage.getItem("auth-token") ?? "";
// setear header por defecto a la instancia de axios
// Authorization: Bearer initial token
const initialUserStr = localStorage.getItem("auth-user");

const initialUser = initialUserStr
  ? (JSON.parse(initialUserStr) as TUser)
  : undefined;

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TUser | undefined>(initialUser);
  const [token, setToken] = useState(initialToken);

  const loggedIn = !!token;

  const login = async (email: string, password: string) => {
    const response = await axios.post(`${API_URL}/api/v1/users/auth/signin`, {
      email,
      password,
    });

    const data = response.data;
    localStorage.setItem("auth-token", data.token);
    localStorage.setItem("auth-user", JSON.stringify(data.user));
    setToken(data.token);
    setUser(data.user);
    // setear header por defecto a la instancia de axios
    // Authorization: Bearer token
  };

  const signup = async (newUser: TNewUser) => {
    await axios.post(`${API_URL}/api/v1/users/auth/signup`, newUser);
    newUser.role !== "doctor" && (await login(newUser.email, newUser.password));
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    setToken("");
    setUser(undefined);
    // eliminar header por defecto a la instancia de axios
    // Authorization: Bearer token
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
