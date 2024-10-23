import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { lookInSession } from "./common/session";
import React, { useContext, useEffect } from "react";
import { UserProvider, UserContext } from "./context/User.context";

const AppContent = () => {
  const userState = useContext(UserContext);
  const { userAuth, setUserAuth } = userState;

  useEffect(() => {
    const userInSession = lookInSession("User");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ accessToken: null });
  }, [setUserAuth]);

  console.log(userAuth);

  return (
    <Routes>
      <Route path="/" element={<Navbar />}>
        <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="signup" element={<UserAuthForm type="sign-up" />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <AppContent />
    </UserProvider>
  );
};

export { App };
