import { GoHorizontalRule } from "react-icons/go";
import { useNavigate } from "react-router";
import { useDispatch } from "react-redux";
import { setSelectedBlogId } from "../../redux/features/blogsSlice";

const BlogCard = ({ blog, from }) => {
  const navigate = useNavigate();
  const dispatch = useDispatch();

  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const handleselectedBlog = () => {
    dispatch(setSelectedBlogId(blog?._id));
    if (blog?._id) {
      navigate(`/blog/${blog._id}`, { state: { from } });
    }
  };

  return (
    <div className="bg-white rounded-2xl shadow p-4 space-y-4 pt-6">
      <h2
        onClick={handleselectedBlog}
        className="text-xl font-bold mb-2 text-blue-950 text-center cursor-pointer hover:underline"
      >
        {blog?.title}
      </h2>

      <div className="flex items-center justify-between text-sm text-blue-950/80">
        <span className="italic">{formatDate(blog?.createdAt)}</span>
        <div className="flex items-center gap-2">
          <GoHorizontalRule className="text-lg" />
          <span>{blog?.author?.userName}</span>
        </div>
      </div>

      <div>
        <p className="text-gray-600 mb-4 line-clamp-4">{blog?.content}</p>
      </div>

      <div className="text-right">
        <button
          onClick={handleselectedBlog}
          className="text-blue-950 font-medium hover:underline cursor-pointer"
        >
          Read More →
        </button>
      </div>
    </div>
  );
};
export default BlogCard;
