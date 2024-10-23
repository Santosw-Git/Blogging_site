import React, { useState, createContext } from "react";

const UserContext = createContext({});

export const UserProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({});

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
