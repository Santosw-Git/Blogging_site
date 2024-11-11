import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import axios from "axios";
import { useRef } from "react";
const BlogEditor = () => {
  let blogBannerRef = useRef();
  const handleBannerUpload = (e) => {
    const img = e.target.files[0];
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
        console.log(imageFromBackend);
        blogBannerRef.current.src = imageFromBackend;
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
    // console.log(input);
    console.log(input.scrollHeight);
    input.style.height = "auto";
    input.style.height = input.scrollHeight + "px";
  };

  return (
    <>
      <nav className="navbar">
        <Link to="/" className="flex-none w-10">
          <img src={logo} />
        </Link>
        <p className="max-md:hidden text-black line-clamp-1 w-full">New Blog</p>

        <div className="flex gap-3 ml-auto">
          <button className="btn-dark py-2">Publish</button>
          <button className="btn-light py-2">Save Draft</button>
        </div>
      </nav>

      <AnimationWrapper>
        <section>
          <div className="mx-auto max-w-[900px] w-full ">
            <div className="relative aspect-video bg-white border-4 border-grey cursor-pointer hover:opacity-80">
              <label htmlFor="uploadBannner">
                <img src={defaultBanner} ref={blogBannerRef} className="z-20" />
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
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export { BlogEditor };
