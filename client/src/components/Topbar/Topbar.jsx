import { FaAngleDoubleLeft, FaUserCircle } from "react-icons/fa";
import { FaBars } from "react-icons/fa";
import { NavLink } from "react-router";

const Topbar = ({ setSidebarOpen }) => {
  return (
    <div className="flex justify-between items-center py-1">
      <div
        className="bg-white p-2 rounded cursor-pointer hover:bg-gray-300 transition-colors duration-300 ease-linear"
        onClick={() => setSidebarOpen((prev) => !prev)}
      >
        <FaBars className="text-blue-950 text-2xl" />
      </div>
      <div>
        <h1 className="md:text-2xl text-xl text-white font-bold">Blog Hub</h1>
      </div>
      <div className="relative group inline-block" tabIndex={0}>
        <FaUserCircle className="w-10 h-10 text-white cursor-pointer" />
        <div className="absolute right-0 mt-2 w-32 bg-white rounded shadow-lg hidden group-focus-within:block z-10">
          <ul className="p-2 text-blue-950 font-semibold">
            <li>
              <NavLink
                to="/profile"
                className="block px-4 py-2 hover:bg-blue-950 hover:text-white transition rounded"
              >
                Profile
              </NavLink>
            </li>
            <li>
              <NavLink
                to="/logout"
                className="block px-4 py-2 hover:bg-blue-950 hover:text-white transition rounded"
              >
                Logout
              </NavLink>
            </li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Topbar;
