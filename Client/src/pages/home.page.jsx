import axios from "axios";
import AnimationWrapper from "../common/page-animation";
import { InPageNavigation } from "../components/inpage.component";
import { useEffect, useState } from "react";
import Loader from "../components/loader.component";
import { BlogPostCard } from "../components/blogpost.component";
import { MinimalBlogPost } from "../components/minimal.component";
import { activeTabButton } from "../components/inpage.component";
import { NoBlogsPublished } from "../components/noBlogPublised";
import { FilterPaginationData } from "../common/filter-pagination";
const HomePage = () => {
  const [blogs, setBlog] = useState(null);
  const [trendingBlogs, setTrendingBlogs] = useState(null);
  const [pageState, setPageState] = useState("home");

  const categories = [
    "programming",
    "hollywood",
    "film making",
    "cooking",
    "tech",
    "finance",
    "travel",
  ];

  const fetchLatestBlogs = (page = 1) => {
    axios
      .post(import.meta.env.VITE_SERVER_URL + "/latest-blogs", { page: page })
      .then(async ({ data }) => {
        console.log(data.blogs);

        let formtedData = await FilterPaginationData({
          old_arr: blogs,
          new_arr: data.blogs,
          page,
          countRoute: "/all-latest-blogs-count",
        });
        setBlog(formtedData);
        console.log(formtedData);
      })
      .catch((err) => console.log("error: " + err.message));
  };

  const loadBlogByCategory = (event) => {
    const category = event.target.innerText.toLowerCase().trim();
    setBlog([]);
    setPageState((prevState) => (prevState === category ? "home" : category));
  };

  const fetchTrendingBlogs = () => {
    axios
      .get(import.meta.env.VITE_SERVER_URL + "/trending-blogs")
      .then(({ data }) => setTrendingBlogs(data.blogs))
      .catch((err) => console.log("error: " + err.message));
  };

  const fetchBlogsByCategory = () => {
    axios
      .post(import.meta.env.VITE_SERVER_URL + "/search-blogs", {
        tags: pageState,
      })
      .then(({ data }) => setBlog(data.blogs))
      .catch((err) => console.log("error: " + err.message));
  };

  useEffect(() => {
    activeTabButton.current.click();
    if (pageState === "home") {
      fetchLatestBlogs();
    } else {
      fetchBlogsByCategory();
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
              {blogs === null ? (
                <Loader />
              ) : blogs.results.length ? (
                blogs.results.map((blog, index) => (
                  <BlogPostCard
                    key={index}
                    content={blog}
                    author={blog.author.personal_info}
                  />
                ))
              ) : (
                <NoBlogsPublished message={"No Blog Published"} />
              )}
            </>

            {trendingBlogs === null ? (
              <Loader />
            ) : (
              trendingBlogs.map((blog, index) => (
                <MinimalBlogPost key={index} blog={blog} index={index} />
              ))
            )}
          </InPageNavigation>
        </div>
        <div className="min-w-[40%] lg:min-w-[400px] max-w-min bg-grey/65 border-grey border-3 pl-8 pt-3 max-md:hidden">
          <div className="flex flex-col gap-10">
            <div>
              <h1 className="font-medium text-xl mb-8">
                Stories from all interests
              </h1>
              <div className="flex gap-3 flex-wrap">
                {categories.map((category, i) => (
                  <button
                    onClick={loadBlogByCategory}
                    key={i}
                    className={`tag ${
                      pageState === category ? "bg-black text-white" : ""
                    }`}
                  >
                    {category}
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div>
            <h1 className="font-medium text-xl mb-8 mt-8">
              Trending
              <i className="fi fi-rr-arrow-trend-up"></i>
            </h1>
            {trendingBlogs === null ? (
              <Loader />
            ) : (
              trendingBlogs.map((blog, index) => (
                <MinimalBlogPost key={index} blog={blog} index={index} />
              ))
            )}
          </div>
        </div>
      </section>
    </AnimationWrapper>
  );
};

export { HomePage };
