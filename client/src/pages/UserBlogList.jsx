import BlogCard from "../components/Blogs/BlogCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchUserBlogs } from "../api/blog";
import {
  selectUserBlogs,
  selectUserTotalBlogs,
} from "../redux/features/blogsSlice";
import { FaRegSadTear } from "react-icons/fa";

const UserBlogList = () => {
  const dispatch = useDispatch();
  const blogs = useSelector(selectUserBlogs);
  const totalUserBlogs = useSelector(selectUserTotalBlogs);

  useEffect(() => {
    dispatch(fetchUserBlogs());
  }, [dispatch]);

  return (
    <div className="container mx-auto px-4 py-8">
      {totalUserBlogs === 0 ? (
        <div className="flex items-center justify-center min-h-[60vh]">
          <div className="flex flex-col items-center text-gray-600 text-sm md:text-lg font-medium">
            <FaRegSadTear className="text-4xl mb-3 text-blue-950" />
            No blogs available yet.
          </div>
        </div>
      ) : (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {blogs.map((blog, i) => (
            <BlogCard key={blog._id} blog={blog} from="my-blogs" />
          ))}
        </div>
      )}
    </div>
  );
};
export default UserBlogList;
