import Embed from "@editorjs/embed";
import List from "@editorjs/list";
import Image from "@editorjs/image";
import Marker from "@editorjs/marker";
import Quote from "@editorjs/quote";
import Header from "@editorjs/header";
import Link from "@editorjs/link";
import InLineCode from "@editorjs/inline-code";
import axios from "axios"; // Ensure axios is imported

const uploadImageByFile = (file) => {
  const formData = new FormData();
  formData.append("file", file);

  return axios
    .post(`${import.meta.env.VITE_SERVER_URL}/file-upload`, formData, {
      headers: {
        "Content-Type": "multipart/form-data",
      },
    })
    .then((response) => {
      console.log("File upload successful", response.data);
      return {
        success: 1,
        file: {
          url: response.data.url,
        },
      };
    })
    .catch((error) => {
      console.error("Error uploading file:", error);
      return {
        success: 0,
        error: error.message,
      };
    });
};

const uploadImageByUrl = (e) => {
  let link = new Promise((resolve, reject) => {
    try {
      resolve(e);
    } catch (error) {
      reject(error);
    }
  });

  return link.then((url) => {
    return {
      success: 1,
      file: { url },
    };
  });
};

const tools = {
  embed: Embed,
  list: {
    class: List,
    inlineToolbar: true,
  },
  image: {
    class: Image,
    config: {
      uploader: {
        uploadByUrl: uploadImageByUrl,
        uploadByFile: uploadImageByFile,
      },
    },
  },
  marker: Marker,
  quote: {
    class: Quote,
    inlineToolbar: true,
  },
  header: {
    class: Header,
    inlineToolbar: true,
    config: {
      placeholder: "Type Heading...",
      levels: [2, 3],
      defaultValue: 2,
    },
  },
  link: Link,
  inlineCode: InLineCode,
};

export { tools };
