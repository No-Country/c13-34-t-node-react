import { FC, ReactNode, createContext, useContext, useState } from "react";

// import axios from "axios";
// import { TUser } from "../../types/user";
// import { API_URL } from "../../constants/api";

// type TAuthState = {
//   loggedIn: boolean;
//   user: TUser | undefined;
//   login: (email: string, password: string) => Promise<boolean>;
//   logout: () => void;
// };

const AuthContext = createContext({
  isAuthenticated: false,
});

// const initialToken = localStorage.getItem("auth-token") ?? "";
// const initialUserStr = localStorage.getItem("auth-user");

// const initialUser = initialUserStr
//   ? (JSON.parse(initialUserStr) as TUser)
//   : undefined;

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  // const [token, setToken] = useState(initialToken);
  // const [user, setUser] = useState<TUser | undefined>(initialUser);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // const loggedIn = !!token;

  // const login = async (email: string, password: string) => {
  //   try {
  //     const response = await axios.post(API_URL + "/acceso", {
  //       email,
  //       password,
  //     });

  //     if (response.status === 200) {
  //       const data = response.data;
  //       localStorage.setItem("auth-token", data.accessToken);
  //       localStorage.setItem("auth-user", JSON.stringify(data.user));
  //       setToken(data.accessToken);
  //       setUser(data.user);
  //     }

  //     return response.status === 200;
  //   } catch (error) {
  //     console.error("An error occurred:", error);
  //     return false;
  //   }
  // };

  // const logout = () => {
  //   localStorage.removeItem("auth-token");
  //   localStorage.removeItem("auth-user");
  //   setToken("");
  //   setUser(undefined);
  // };

  return (
    <AuthContext.Provider value={{ isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
