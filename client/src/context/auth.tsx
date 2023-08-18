import { FC, ReactNode } from "react";

export const AuthProvider: FC<{ children: ReactNode }> = ({ children }) => {
  return <div>{children}</div>;
};
