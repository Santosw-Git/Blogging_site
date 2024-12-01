import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import { InPageNavigation } from "../components/inpage.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import { BlogPostCard } from "../components/blogpost.component";
import { MinimalBlogPost } from "../components/minimal.component";
import { activeTabButton } from "../components/inpage.component";
const HomePage = () => {
  let [blogs, setBlog] = useState([]);
  let [trendingBlogs, setTrendingBlogs] = useState([]);

  let [pageState, setPageState] = useState("home");
  let categories = [
    "programming",
    "hollywood",
    "film making ",
    "cooking",
    "tech",
    "finance",
    "travel",
  ];

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

  const loadBlogByCategory = (event) => {
    let category = event.target.innerText.toLowerCase();
    setBlog([]);
    if (pageState == category) {
      setPageState("home");
      return;
    }
    setPageState(category);
  };

  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/trending-blogs")
      .then(({ data }) => {
        setTrendingBlogs(data.blogs);
      })
      .catch((err) => {
        console.log("error: " + err.message);
      });
  };

  useEffect(() => {
    activeTabButton.current.click();
    if (pageState === "home") {
      fetchLatestBlogs();
    }
    fetchTrendingBlogs();
  }, [pageState]);

  return (
    <AnimationWrapper>
      <section className="h-cover flex justify-center gap-10">
        <div className="w-full">
          <InPageNavigation
            routes={[pageState, "trending blogs"]}
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

            {trendingBlogs.length === 0 ? (
              <Loader />
            ) : (
              trendingBlogs.map((blog, index) => {
                return (
                  <MinimalBlogPost key={index} blog={blog} index={index} />
                );
              })
            )}
          </InPageNavigation>
        </div>
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min border-grey border-1 pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">
                Stories from all interests
              </h1>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => {
                  return (
                    <button
                      onClick={loadBlogByCategory}
                      key={i}
                      className={
                        "tag " +
                        (pageState == category ? "bg-black text-white" : "")
                      }
                    >
                      {category}
                    </button>
                  );
                })}
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-xl mb-8 mt-8">
              Trending
              <i className="fi fi-rr-arrow-trend-up"></i>
            </h1>
            {trendingBlogs.length === 0 ? (
              <Loader />
            ) : (
              trendingBlogs.map((blog, index) => {
                return (
                  <MinimalBlogPost key={index} blog={blog} index={index} />
                );
              })
            )}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export { HomePage };
