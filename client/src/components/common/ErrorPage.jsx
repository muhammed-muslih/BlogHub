import { useNavigate } from "react-router-dom";
import { FaExclamationTriangle } from "react-icons/fa";

const ErrorPage = ({ message = "Oops! Something went wrong." }) => {
  const navigate = useNavigate();

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gray-100 text-center px-4">
      <FaExclamationTriangle className="text-6xl text-blue-950 mb-4" />
      <h1 className="text-3xl font-bold text-blue-950 mb-2">Error</h1>
      <p className="text-gray-600 text-lg mb-6">{message}</p>
      <button
        onClick={() => navigate(-1)}
        className="flex items-center gap-2 bg-blue-950 text-white px-6 py-3 rounded-lg shadow-md hover:bg-blue-900 transition duration-300 ease-in-out cursor-pointer active:scale-95"
      >
        Go Back
      </button>
    </div>
  );
};

export default ErrorPage;
