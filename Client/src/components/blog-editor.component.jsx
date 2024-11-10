import { Link } from "react-router-dom";
import logo from "../imgs/logo.png";
import AnimationWrapper from "../common/page-animation";
import defaultBanner from "../imgs/blog banner.png";
import axios from "axios";
const BlogEditor = () => {
  const handleBannerUpload = (e) => {
    const img = e.target.files[0];
    const formData = new FormData();
    formData.append("file", img); // 'file' should match the name used in `upload.single("file")` on the backend.

    axios
      .post(`${import.meta.env.VITE_SERVER_URL}/file-upload`, formData, {
        headers: {
          "Content-Type": "multipart/form-data",
        },
      })
      .then((response) => {
        console.log(response.data);
      })
      .catch((error) => {
        console.error("Error uploading file:", error);
      });
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
                <img src={defaultBanner} className="z-20" />
                <input
                  type="file"
                  accept=".png,.jpg, .jpeg"
                  id="uploadBannner"
                  hidden
                  onChange={handleBannerUpload}
                />
              </label>
            </div>
          </div>
        </section>
      </AnimationWrapper>
    </>
  );
};

export { BlogEditor };
