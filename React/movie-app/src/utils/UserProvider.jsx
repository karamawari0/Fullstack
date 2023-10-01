// React Context for persisting users' data

import React, { useContext, useState } from "react";
import { createContext } from "react";

export const UserContext = createContext();
export function UserProvider({ children }) {
  const [user, setUser] = useState("not logged in");

  return (
    <UserContext.Provider value={{ user, setUser }}>
      {children}
    </UserContext.Provider>
  );
}
