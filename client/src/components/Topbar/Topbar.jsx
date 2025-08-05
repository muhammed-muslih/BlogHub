import { FaUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { useNavigate } from "react-router";
import { logoutUser } from "../../api/auth";
import { useDispatch, useSelector } from "react-redux";
import { logout, selectCurrentUser } from "../../redux/features/authSlice";
import { toggleSidebar } from "../../redux/features/uiSlice";
import { useEffect } from "react";
import { fetchUser } from "../../api/user";
const Topbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(selectCurrentUser);

  useEffect(() => {
    dispatch(fetchUser());
  }, [dispatch]);

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

  const handleToggleSlider = () => {
    dispatch(toggleSidebar());
  };

  return (
    <div className="flex justify-between items-center py-1">
      <div
        className="bg-white p-2 rounded cursor-pointer hover:bg-gray-300 transition-colors duration-300 ease-linear"
        onClick={handleToggleSlider}
      >
        <FaBars className="text-blue-950 text-2xl" />
      </div>
      <div>
        <h1 className="md:text-2xl text-xl text-white font-bold">Blog Hub</h1>
      </div>
      <div className="relative group inline-block cursor-pointer" tabIndex={0}>
        <div className="flex  items-center gap-2">
          <FaUserCircle className="w-10 h-10 text-white cursor-pointer" />
          <span className="text-md text-shadow-2xs text-shadow-gray-300 font-bold text-white">
            {user?.userName}
          </span>
        </div>
        <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg hidden group-focus-within:block z-10">
          <ul className="p-2 text-blue-950 font-semibold">
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 w-full hover:bg-blue-950 hover:text-white transition rounded cursor-pointer"
              >
                Logout
              </button>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
