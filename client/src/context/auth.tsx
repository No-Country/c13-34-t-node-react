import { FC, ReactNode, createContext, useContext, useState } from "react";
import { TNewUser, TUser } from "../types/user";
import { AuthService } from "../services/auth";
import { client } from "../config/client";

type TAuthState = {
  loggedIn: boolean;
  user: TUser | undefined;
  logout: () => void;
  login: (email: string, password: string) => Promise<void>;
  signup: (newUser: TNewUser) => Promise<void>;
};

const AuthContext = createContext({} as TAuthState);

const initialToken = localStorage.getItem("auth-token") ?? "";
// setear header por defecto a la instancia de axios (para cuando se recarga la página)
if (initialToken) {
  client.defaults.headers.common.Authorization = "Bearer " + initialToken;
}

const initialUserStr = localStorage.getItem("auth-user");

const initialUser = initialUserStr
  ? (JSON.parse(initialUserStr) as TUser)
  : undefined;

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  const [user, setUser] = useState<TUser | undefined>(initialUser);
  const [token, setToken] = useState(initialToken);

  const loggedIn = !!token;

  const login = async (email: string, password: string) => {
    const response = await AuthService.signin(email, password);
    const data = response.data;
    console.log(data);

    // setear header por defecto a la instancia de axios
    // Authorization: Bearer token
    client.defaults.headers.common.Authorization = "Bearer " + data.token;

    // Guardar en el disco (para persistir)
    localStorage.setItem("auth-token", data.token);
    localStorage.setItem("auth-user", JSON.stringify(data.user));

    // Guardar en la memoria para acceder globalmente
    setToken(data.token);
    setUser(data.user);
  };

  const signup = async (newUser: TNewUser) => {
    await AuthService.signup(newUser);
    if (newUser.role === "patient") {
      await login(newUser.email, newUser.password);
    }
  };

  const logout = () => {
    localStorage.removeItem("auth-token");
    localStorage.removeItem("auth-user");
    setToken("");
    setUser(undefined);
    // eliminar header por defecto a la instancia de axios
    // Authorization: Bearer token
    client.defaults.headers.common.Authorization = undefined;
  };

  return (
    <AuthContext.Provider value={{ loggedIn, user, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
