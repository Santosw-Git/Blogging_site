import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { lookInSession } from "./common/session";
import React from "react";

const UserContext = React.createContext({});
const App = () => {
  const [userAuth, setUserAuth] = React.useState({});

  React.useEffect(() => {
    const userInSession = lookInSession("User");

    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ access_token: null });
  }, []);
  return (
    <UserContext.Provider value={{ userAuth, setUserAuth }}>
      <Routes>
        <Route path="/" element={<Navbar />}>
          <Route path="signin" element={<UserAuthForm type="sign-in" />} />
          <Route path="signup" element={<UserAuthForm type="sign-up" />} />
        </Route>
      </Routes>
    </UserContext.Provider>
  );
};

export { App, UserContext };
