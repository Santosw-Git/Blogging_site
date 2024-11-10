import { useSession } from "../context/User.context";
import { Navigate } from "react-router-dom";
import { useState } from "react";
import { BlogEditor } from "../components/blog-editor.component";
import { PublishForm } from "../components/publish-form.component";
const Editor = (editor) => {
  const [editorState, setEditorState] = useState("editor");
  const userState = useSession();
  const {
    userAuth: { accessToken },
    setUserAuth,
  } = userState;
  console.log(accessToken);

  return accessToken === null ? (
    <Navigate to="/signin" />
  ) : editorState === "editor" ? (
    <BlogEditor />
  ) : (
    <PublishForm />
  );
};

export { Editor };
