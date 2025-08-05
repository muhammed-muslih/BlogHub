import EditBlogForm from "../components/Blogs/EditBlogForm";
import { useSelector, useDispatch } from "react-redux";
import { selectedBlog } from "../redux/features/singleBlogSlice";
import { fetchSingleBlog, updateBlog } from "../api/blog";
import { useEffect, useState } from "react";
import { useParams } from "react-router";
import { clearSingleBlog } from "../redux/features/singleBlogSlice";
import BackButton from "../components/Blogs/BackButton";

const EditBlog = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const blog = useSelector(selectedBlog);
  const { id } = useParams();
  const dispatch = useDispatch();

  useEffect(() => {
    if (id) {
      dispatch(fetchSingleBlog(id));
    }
    return () => dispatch(clearSingleBlog());
  }, [dispatch, id]);

  const onSubmit = async ({ title, content, quote }) => {
    try {
      const res = await updateBlog(id, { title, content, quote });

      if (res.data?.status === "success") {
        setSuccessMsg("Blog updated successfully!");
        setErrorMsg("");
        dispatch(fetchSingleBlog(id));
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
      } else {
        setErrorMsg("Failed to update blog. Please try again.");
        setSuccessMsg("");
        setTimeout(() => {
          setErrorMsg("");
        }, 3000);
      }
    } catch (error) {
      setErrorMsg(error.response?.data?.message || "Something went wrong");
      setSuccessMsg("");
      setTimeout(() => {
        setErrorMsg("");
      }, 3000);
    }
  };

  return (
    <div className="container mx-auto px-4 py-10">
      {successMsg && (
        <div className="max-w-3xl mx-auto mb-4 text-green-600 bg-green-100 p-3 rounded-lg">
          {successMsg}
        </div>
      )}
      {errorMsg && (
        <div className="max-w-3xl mx-auto mb-4 text-red-600 bg-red-100 p-3 rounded-lg">
          {errorMsg}
        </div>
      )}
      <BackButton />
      <EditBlogForm blog={blog} onSubmit={onSubmit} />
    </div>
  );
};
export default EditBlog;
