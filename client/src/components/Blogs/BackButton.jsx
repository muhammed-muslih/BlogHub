import { useNavigate } from "react-router";
import { FaArrowLeft } from "react-icons/fa";

const BackButton = () => {
  const navigate = useNavigate();

  return (
    <button
      onClick={() => navigate(-1)}
      className="mb-6 px-6 py-3 bg-blue-950 text-white rounded-lg shadow-md hover:bg-blue-900 active:scale-95 transition duration-300 ease-in-out
        flex items-center gap-2 font-semibold cursor-pointer"
    >
      <FaArrowLeft /> Back
    </button>
  );
};

export default BackButton;
