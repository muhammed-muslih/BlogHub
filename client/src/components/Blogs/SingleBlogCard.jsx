import { GoQuote } from "react-icons/go";
import { FaFilePen } from "react-icons/fa6";
const SingleBlogCard = ({ blog }) => {
  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  return (
    <div className="space-y-6">
      <h1 className="text-3xl md:text-4xl font-bold text-blue-950 text-center">
        {blog?.title}
      </h1>

      <div className="flex justify-between items-center text-blue-950/80 text-sm md:text-base border-b border-gray-200 pb-3">
        <span className="italic">{formatDate(blog?.createdAt)}</span>
        <span className="font-medium flex items-center gap-2">
          <FaFilePen className="text-2xl text-blue-950" />{" "}
          {blog?.author?.userName}
        </span>
      </div>

      {blog?.quote && (
        <div className="bg-blue-50 border-l-4 border-blue-950 p-4 rounded-md flex gap-3">
          <GoQuote className="text-blue-950 text-2xl" />
          <p className="text-blue-950 italic">{blog.quote}</p>
        </div>
      )}

      <div className="text-gray-700 leading-relaxed text-md md:text-lg space-y-4">
        {blog?.content &&
          blog.content
            .split(/\n\s*\n/) // Split only when there's an empty line
            .map((para, idx) => <p key={idx}>{para.trim()}</p>)}
      </div>
    </div>
  );
};
export default SingleBlogCard;
