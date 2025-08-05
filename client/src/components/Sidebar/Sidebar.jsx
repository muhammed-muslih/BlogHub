import { useNavigate } from "react-router";
import menus from "./menu";
import { IoClose } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import {
  setActiveSidebarItem,
  selectActiveSidebarItem,
} from "../../redux/features/uiSlice";
import { setSidebarOpen } from "../../redux/features/uiSlice";
import { useLocation } from "react-router";
import { useEffect } from "react";

const Sidebar = () => {
  const dispatch = useDispatch();
  const activeItem = useSelector(selectActiveSidebarItem);
  const navigate = useNavigate();
  const location = useLocation();

  useEffect(() => {
    const path = location.pathname;
    const from = location.state?.from;

    const isSingleBlog = /^\/blog\/[0-9a-fA-F]+$/.test(path);
    const isEditBlog = /^\/blog\/edit\/[0-9a-fA-F]+$/.test(path);

    let currentMenu;

    if (isSingleBlog || isEditBlog) {
      if (from === "my-blogs") {
        currentMenu = menus.find((menu) => menu.href === "/my-blogs");
      } else {
        currentMenu = menus.find((menu) => menu.href === "/");
      }
    } else {
      currentMenu = menus.find((menu) => menu.href === path);
    }

    if (currentMenu) {
      dispatch(setActiveSidebarItem(currentMenu.name));
    }
  }, [location.pathname, location.state, dispatch]);

  const handleItemClick = (menu) => {
    navigate(menu?.href);
    if (window.innerWidth < 768) {
      dispatch(setSidebarOpen(false));
    }
  };
  const handleCloseSidebar = () => {
    dispatch(setSidebarOpen(false));
  };

  return (
    <div className="">
      <div className="m-4 justify-between flex">
        <h1
          className="md:text-2xl text-xl text-white font-bold cursor-pointer"
          onClick={() => navigate("/")}
        >
          Blog Hub
        </h1>
        <div
          className="bg-white p-1 rounded cursor-pointer hover:bg-gray-300 transition-colors duration-300 ease-linear md:hidden"
          onClick={handleCloseSidebar}
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
              onClick={() => handleItemClick(menu)}
              className={`mb-2 rounded py-2 hover:shadow hover:bg-white hover:text-blue-950 transition-colors duration-300 ease-linear cursor-pointer ${
                activeItem === menu.name && "bg-white text-blue-950"
              }`}
            >
              <span className="px-3">{menu.name}</span>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default Sidebar;
