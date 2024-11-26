import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import { InPageNavigation } from "../components/inpage.component";
import { useSession } from "../context/User.context";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import { BlogPostCard } from "../components/blogpost.component";

const HomePage = () => {
  let [blogs, setBlog] = useState([]); // Initialize with an empty array

  console.log(blogs);

  const fetchLatestBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/latest-blogs")
      .then(({ data }) => {
        setBlog(data.blogs);
      })
      .catch((err) => {
        console.log("error: " + err.message);
      });
  };

  useEffect(() => {
    fetchLatestBlogs();
  }, []);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <InPageNavigation
            routes={["home", "trending blogs"]}
            defaultHidden={["trending blogs"]}
          >
            <>
              {blogs.length === 0 ? (
                <Loader />
              ) : (
                blogs.map((blog, index) => {
                  return (
                    <BlogPostCard
                      key={index}
                      content={blog}
                      author={blog.author.personal_info}
                    />
                  );
                })
              )}
            </>
          </InPageNavigation>
        </div>
        <div></div>
      </section>
    </AnimationWrapper>
  );
};

export { HomePage };
