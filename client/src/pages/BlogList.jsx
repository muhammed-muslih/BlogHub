import BlogCard from "../components/Blogs/BlogCard";
import ErrorPage from "../components/common/ErrorPage";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchBlogs } from "../api/blog";
import {
  selectBlogs,
  selectTotalBlogs,
  selectError,
} from "../redux/features/blogsSlice";
import { FaRegSadTear } from "react-icons/fa";

const BlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectBlogs);
  const totalBlogs = useSelector(selectTotalBlogs);
  const error = useSelector(selectError);

  useEffect(() => {
    dispatch(fetchBlogs());
  }, [dispatch]);

  if (error) {
    return <ErrorPage message={`Failed to load blogs: ${error}`} />;
  }
  return (
    <div className="container mx-auto px-4 py-8">
      {totalBlogs === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center text-gray-600 text-sm md:text-lg font-medium">
            <FaRegSadTear className="text-4xl mb-3 text-blue-950" />
            No blogs available yet.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <BlogCard key={blog._id} blog={blog} from="all" />
          ))}
        </div>
      )}
    </div>
  );
};
export default BlogList;
