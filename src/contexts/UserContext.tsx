import React, { createContext, useContext, useState } from "react";
import { Role } from "../types/Roles";

interface UserContextType {
  role: Role | null;
  setRole: (role: Role | null) => void;
}

const UserContext = createContext<UserContextType>({
  role: null,
  setRole: () => {},
});

export const UserProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [role, setRole] = useState<Role | null>(null);

  return <UserContext.Provider value={{ role, setRole }}>{children}</UserContext.Provider>;
};

export const useUserContext = () => useContext(UserContext);
