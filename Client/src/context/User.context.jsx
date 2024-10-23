import React, { useContext, useState, createContext } from "react";

const UserContext = createContext({});

export const useSession = () => {
  return useContext(UserContext);
};

export const UserProvider = ({ children }) => {
  const [userAuth, setUserAuth] = useState({});

  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      {children}
    </UserContext.Provider>
  );
};

export { UserContext };
