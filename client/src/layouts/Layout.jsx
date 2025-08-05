import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { selectIsSidebarOpen } from "../redux/features/uiSlice";
import { useSelector } from "react-redux";
import { Outlet } from "react-router";

const Layout = () => {
  const isSidebarOpen = useSelector(selectIsSidebarOpen);

  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Desktop Sidebar (always visible) */}
      {isSidebarOpen && (
        <aside className="bg-blue-950 h-full fixed md:static w-64 lg:w-72 z-40 transition-transform duration-300 ease-in-out">
          <Sidebar />
        </aside>
      )}
      {/* Mobile Sidebar (toggleable) */}
      {isSidebarOpen && (
        <div className="fixed inset-0 bg-transparent bg-opacity-50 z-40 md:hidden">
          <aside className="absolute left-0 top-0 h-full w-64 bg-blue-950 shadow-lg transition-transform duration-300 ease-in-out">
            <Sidebar />
          </aside>
        </div>
      )}

      <div className="flex flex-col flex-1 p-0 md:p-1">
        <header className="sticky top-0 bg-blue-950 shadow px-4 py-2">
          <Topbar />
        </header>

        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
