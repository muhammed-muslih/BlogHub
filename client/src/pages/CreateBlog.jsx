import CreateBlogForm from "../components/Blogs/CreateBlogForm";
import { createNewBlog } from "../api/blog";
import { useState } from "react";

const CreateBlog = () => {
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  const onSubmit = async ({ title, content, quote }) => {
    try {
      const res = await createNewBlog({ title, content, quote });

      if (res.data?.status === "success") {
        setSuccessMsg("Blog created successfully!");
        setErrorMsg("");
        setTimeout(() => {
          setSuccessMsg("");
        }, 3000);
      } else {
        setErrorMsg("Failed to create blog. Please try again.");
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
      <CreateBlogForm onSubmit={onSubmit} />
    </div>
  );
};

export default CreateBlog;
