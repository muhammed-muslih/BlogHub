import { FaUserCircle } from "react-icons/fa";
import { useSelector, useDispatch } from "react-redux";
import { selectCurrentUser, logout } from "../../redux/features/authSlice";
import { logoutUser } from "../../api/auth";
import { useNavigate } from "react-router";

const Profile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  function formatDate(isoString) {
    return new Date(isoString).toLocaleDateString("en-US", {
      month: "short",
      day: "numeric",
      year: "numeric",
    });
  }

  const handleLogout = async () => {
    try {
      const res = await logoutUser();
      if (res.data?.status === "success") {
        dispatch(logout());
        navigate("/auth/login", { replace: true });
      }
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <div className="flex items-center justify-center py-10">
      <div className="container max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-8">
        <div className="flex flex-col items-center text-center mb-6">
          <FaUserCircle className="w-24 h-24 text-blue-950 cursor-pointer mb-4" />
          <h1 className="text-2xl font-bold text-blue-950">
            {user?.userName || "User"}
          </h1>
          <p className="text-gray-500">{user?.email}</p>
        </div>

        <div className="space-y-4 divide-y divide-gray-200">
          <div className="flex justify-between py-2">
            <span className="text-gray-500 font-medium">Username</span>
            <span className="text-blue-950 font-semibold">
              {user?.userName}
            </span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500 font-medium">Email</span>
            <span className="text-blue-950 font-semibold">{user?.email}</span>
          </div>
          <div className="flex justify-between py-2">
            <span className="text-gray-500 font-medium">Joined</span>
            <span className="text-blue-950 font-semibold">
              {formatDate(user?.createdAt)}
            </span>
          </div>
        </div>

        <div className="mt-8 flex justify-center">
          <button
            onClick={handleLogout}
            className="px-6 py-2 bg-blue-950 text-white rounded-lg shadow hover:bg-blue-900 transition cursor-pointer"
          >
            Logout
          </button>
        </div>
      </div>
    </div>
  );
};

export default Profile;
