import React, { useContext, useState, createContext } from "react";

let blogStructure = {
  title: "",
  banner: "",
  content: [],
  tags: [],
  des: "",
  author: {
    personal_info: {},
  },
};

const EditorContext = createContext({});

export const useEditorContext = () => {
  return useContext(EditorContext);
};
const EditorContextProvider = ({ children }) => {
  const [blog, setBlog] = useState(blogStructure);

  const [editorState, setEditorState] = useState("editor");

  const [textEditor, setTextEditor] = useState({ isReady: false });

  return (
    <EditorContext.Provider
      value={{
        blog,
        setBlog,
        editorState,
        setEditorState,
        textEditor,
        setTextEditor,
      }}
    >
      {children}
    </EditorContext.Provider>
  );
};

export { EditorContextProvider };
