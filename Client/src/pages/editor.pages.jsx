import { useSession } from "../context/User.context";
import { Navigate } from "react-router-dom";
import { BlogEditor } from "../components/blog-editor.component";
import { PublishForm } from "../components/publish-form.component";
import { useEditorContext } from "../context/Editor.context";
const Editor = (editor) => {
  const EditorState = useEditorContext();
  const { editorState } = EditorState;

  const userState = useSession();
  const {
    userAuth: { accessToken },
  } = userState;
  // console.log(accessToken);

  return accessToken === null ? (
    <Navigate to="/signin" />
  ) : editorState === "editor" ? (
    <BlogEditor />
  ) : (
    <PublishForm />
  );
};

export { Editor };
