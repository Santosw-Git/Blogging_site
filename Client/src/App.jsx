import { Route, Routes } from "react-router-dom";
import Navbar from "./components/navbar.component";
import UserAuthForm from "./pages/userAuthForm.page";
import { lookInSession } from "./common/session";
import React, { useEffect } from "react";
import { UserProvider, useSession } from "./context/User.context";
import { Editor } from "./pages/editor.pages";
import { EditorContextProvider } from "./context/Editor.context";
import { HomePage } from "./pages/home.page";
const AppContent = () => {
  const userState = useSession();
  const { userAuth, setUserAuth } = userState;

  useEffect(() => {
    const userInSession = lookInSession("User");
    userInSession
      ? setUserAuth(JSON.parse(userInSession))
      : setUserAuth({ accessToken: null });
  }, [setUserAuth]);

  return (
    <Routes>
      <Route path="/editor" element={<Editor />} />
      <Route path="/" element={<Navbar />}>
        <Route index element={<HomePage />} />
        <Route path="signin" element={<UserAuthForm type="sign-in" />} />
        <Route path="signup" element={<UserAuthForm type="sign-up" />} />
      </Route>
    </Routes>
  );
};

const App = () => {
  return (
    <UserProvider>
      <EditorContextProvider>
        <AppContent />
      </EditorContextProvider>
    </UserProvider>
  );
};

export { App };
