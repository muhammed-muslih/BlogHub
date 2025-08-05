import { useState, useEffect } from "react";

const EditBlogForm = ({ blog, onSubmit }) => {
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [quote, setQuote] = useState("");
  const [errors, setErrors] = useState({});

  useEffect(() => {
    if (blog) {
      setTitle(blog.title || "");
      setContent(blog.content || "");
      setQuote(blog.quote || "");
    }
  }, [blog]);

  const validate = () => {
    const newErrors = {};

    if (!title.trim()) {
      newErrors.title = "Title is required";
    }

    if (!content.trim()) {
      newErrors.content = "Content is required";
    } else if (content.length < 150) {
      newErrors.content = "Content must be at least 150 characters";
    } else if (content.length > 2000) {
      newErrors.content = "Content cannot exceed 2000 characters";
    }

    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newErrors = validate();

    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }

    setErrors({});
    await onSubmit({ title, content, quote });
  };

  return (
    <div>
      <h1 className="text-2xl md:text-3xl font-bold lg:text-4xl text-blue-950 text-center mb-8">
        Edit Blog
      </h1>
      <form
        action=""
        onSubmit={handleSubmit}
        className="max-w-3xl mx-auto bg-white shadow-lg rounded-2xl p-6 space-y-6"
      >
        <div>
          <label className="block text-blue-950 font-semibold mb-2">
            Blog Title
          </label>
          <input
            type="text"
            name="title"
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            placeholder="Enter blog title"
            className={`w-full bg-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-b-4 focus:border-blue-950 ${
              errors?.title && "border-red-500 border-b-4"
            }`}
          />
          {errors?.title && (
            <p className="text-red-500 text-sm mt-1">{errors.title}</p>
          )}
        </div>
        <div>
          <label className="block text-blue-950 font-semibold mb-2">
            Blog Content
          </label>
          <textarea
            name="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="8"
            placeholder="Write your blog content..."
            className={`w-full bg-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-b-4 focus:border-blue-950 ${
              errors?.content && "border-red-500 border-b-4"
            }`}
          ></textarea>
          {errors?.content && (
            <p className="text-red-500 text-sm mt-1">{errors.content}</p>
          )}
        </div>
        <div>
          <label className="block text-blue-950 font-semibold mb-2">
            Blog Quote (optional)
          </label>
          <textarea
            name="quote"
            value={quote}
            onChange={(e) => setQuote(e.target.value)}
            rows="4"
            placeholder="Enter a highlighted quote"
            className={`w-full bg-gray-200 rounded-lg px-4 py-2 focus:outline-none focus:border-b-4 focus:border-blue-950`}
          ></textarea>
        </div>
        <button
          type="submit"
          className="w-full bg-blue-950 text-white py-3 rounded-lg font-semibold hover:bg-blue-900 transition cursor-pointer ease-linear"
        >
          Update Blog
        </button>
      </form>
    </div>
  );
};
export default EditBlogForm;
