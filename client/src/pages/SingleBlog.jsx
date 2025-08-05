import { useParams, useNavigate, useLocation } from "react-router";
import SingleBlogCard from "../components/Blogs/SingleBlogCard";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { fetchSingleBlog, deleteBlog } from "../api/blog";
import { FaEdit, FaTrash } from "react-icons/fa";
import {
  selectedBlog,
  clearSingleBlog,
} from "../redux/features/singleBlogSlice";
import { selectCurrentUser } from "../redux/features/authSlice";
import { useState } from "react";
import BackButton from "../components/Blogs/BackButton";

const SingleBlog = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();


  const blog = useSelector(selectedBlog);
  const user = useSelector(selectCurrentUser);

  const [showDeleteConfirm, setShowDeleteConfirm] = useState(false);
  const [deleteText, setDeleteText] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleBlog(id));
    }
    return () => dispatch(clearSingleBlog());
  }, [dispatch, id]);

  const handleDelete = async () => {
    if (deleteText !== "delete") {
      setErrorMsg('Please type "delete" to confirm.');
      return;
    }
    try {
      const res = await deleteBlog(id);
      if (res.data?.status === "success") {
        navigate("/");
      } else {
        setErrorMsg("Failed to delete blog.");
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong");
    }
  };

  const handleEdit = () => {
    navigate(`/blog/edit/${id}`, {
      state: { from: location.state?.from || "all" },
    });
  };

  return (
    <div className="container mx-auto px-4 py-10">
      <div className="bg-white shadow-lg rounded-2xl p-6 md:p-10 space-y-6">
        {errorMsg && (
          <div className="text-red-600 bg-red-100 p-3 rounded-lg">
            {errorMsg}
          </div>
        )}
        <BackButton />
        <SingleBlogCard blog={blog} />
        {blog?.author?._id === user?.id && (
          <div className="flex flex-col items-end gap-3">
            <div className="flex gap-3">
              <button
                onClick={handleEdit}
                className="flex items-center gap-2 bg-blue-950 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer
                 hover:bg-blue-900 active:scale-95 transition-all duration-300 ease-in-out"
              >
                <FaEdit className="text-lg" />
                Edit Blog
              </button>
              <button
                onClick={() => setShowDeleteConfirm(true)}
                className="flex items-center gap-2 bg-red-600 text-white px-4 py-2 rounded-lg shadow-md cursor-pointer
                 hover:bg-red-500 active:scale-95 transition-all duration-300 ease-in-out"
              >
                <FaTrash className="text-lg" />
                Delete Blog
              </button>
            </div>

            {showDeleteConfirm && (
              <div className="flex items-center gap-2 mt-3">
                <input
                  type="text"
                  name="deleteConfirm"
                  value={deleteText}
                  onChange={(e) => setDeleteText(e.target.value)}
                  placeholder='Type "delete" to confirm'
                  autoComplete="off"
                  className="bg-gray-200 rounded-lg px-4 py-2 focus:outline-none border-b-4 border-gray-200 focus:border-red-600"
                />
                <button
                  onClick={handleDelete}
                  className="bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-500 cursor-pointer"
                  // disabled={deleteText !== "delete"}
                >
                  Confirm
                </button>
                <button
                  onClick={() => {
                    setShowDeleteConfirm(false);
                    setDeleteText("");
                    setErrorMsg("");
                  }}
                  className="bg-gray-400 text-white px-4 py-2 rounded-lg hover:bg-gray-500 cursor-pointer"
                >
                  Cancel
                </button>
              </div>
            )}
          </div>
        )}
      </div>
    </div>
  );
};
export default SingleBlog;
