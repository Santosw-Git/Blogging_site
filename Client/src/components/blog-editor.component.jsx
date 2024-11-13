import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import axios from "axios";
import { useEffect, useRef } from "react";
import { useEditorContext } from "../context/Editor.context";
import EditorJs from "@editorjs/editorjs";
import { tools } from "./tools.component";
import toast from "react-hot-toast";
const BlogEditor = () => {
  const data = useEditorContext();
  const {
    blog,
    setBlog,
    textEditor,
    setTextEditor,
    editorState,
    setEditorState,
  } = useEditorContext();
  console.log("Context Value", useEditorContext());

  const { banner, tags, title, des, content } = blog;

  // console.log(blog);

  useEffect(() => {
    setTextEditor(
      new EditorJs({
        holderId: "textEditor",
        data: "",
        tools: tools,
        placeholder: "Lets write an awesome story",
      })
    );
  }, []);

  let blogBannerRef = useRef();
  const handleBannerUpload = (e) => {
    const img = e.target.files[0];
    // console.log("img", img);

    const formData = new FormData();
    formData.append("file", img); // 'file' should match the name used in `upload.single("file")` on the backend.
    let imageFromBackend = null;
    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/file-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        imageFromBackend = response.data.url;
        // console.log(imageFromBackend);
        // blogBannerRef.current.src = imageFromBackend;

        setBlog({ ...blog, banner: imageFromBackend });
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
  };

  const handleTitleKeyDown = (event) => {
    // console.log(event);
    if (event.keyCode === 13) {
      //enter key
      event.preventDefault();
    }
  };

  const handleTitleChange = (event) => {
    let input = event.target; //hold the ref of textarea
    // console.log(input.scrollHeight);
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";

    setBlog({ ...blog, title: input.value });
  };

  const handlePublish = () => {
    console.log("title", title);
    console.log("banner", banner);

    if (!title.length) {
      return toast.error("Please give a title");
    }

    if (!banner.length) {
      return toast.error("Please upload a banner");
    }
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">
          {title.length ? title : "Untitled"}
        </p>

        <div className="flex gap-3 ml-auto">
          <button className="btn-dark py-2" onClick={handlePublish}>
            Publish
          </button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full ">
            <div className="relative aspect-video bg-white border-4 border-grey cursor-pointer hover:opacity-80">
              <label htmlFor="uploadBannner">
                <img
                  src={banner || defaultBanner}
                  ref={blogBannerRef}
                  className="z-20"
                />
                <input
                  type="file"
                  accept=".png,.jpg, .jpeg"
                  id="uploadBannner"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>

            <textarea
              placeholder="Blog Title"
              className="text-4xl font-medium w-full h-20 outline-none resize-none  mt-10 leading-tight placeholder:opacity-40"
              onKeyDown={handleTitleKeyDown}
              onChange={handleTitleChange}
            ></textarea>

            <hr className="w-full opacity-25 my-5" />

            <div id="textEditor" className="font-gelasio"></div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export { BlogEditor };
