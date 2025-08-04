import { NavLink } from "react-router";
import menus from "./menu";
import { IoClose } from "react-icons/io5";
const Sidebar = ({ setSidebarOpen }) => {
  return (
    <div className="">
      <div className="m-4 justify-between flex">
        <h1 className="md:text-2xl text-xl text-white font-bold">Blog Hub</h1>
        <div
          className="bg-white p-1 rounded cursor-pointer hover:bg-gray-300 transition-colors duration-300 ease-linear md:hidden"
          onClick={() => setSidebarOpen(false)}
        >
          <IoClose className="text-blue-950 text-2xl" />
        </div>
      </div>
      <hr className="text-gray-500" />
      <div className="mt-3 text-white font-bold">
        <ul className="p-2 capitalize">
          {menus.map((menu, i) => (
            <li
              key={menu + i}
              className="mb-2 rounded py-2 hover:shadow hover:bg-white hover:text-blue-950 transition-colors duration-300 ease-linear delay-150"
            >
              <NavLink to={menu.href} className="px-3">
                {menu.name}
              </NavLink>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
