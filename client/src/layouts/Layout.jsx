import Sidebar from "../components/Sidebar/Sidebar";
import Topbar from "../components/Topbar/Topbar";
import { useState } from "react";

const Layout = () => {
  const [sidebarOpen, setSidebarOpen] = useState(true);

  return (
    <div className="flex h-screen bg-gray-100 ">
      {/* Sidebar for Desktop */}
      {sidebarOpen && (
        <aside className="bg-blue-950 h-full w-64 lg:w-72 transition-all duration-300 ease-in-out p-2 hidden md:block">
          <Sidebar setSidebarOpen={setSidebarOpen} />
        </aside>
      )}

      {/* Sidebar for Mobile */}
      {sidebarOpen && (
        <div className="fixed inset-0 bg-opacity-50 z-40 md:hidden">
          <aside
            className="absolute left-0 top-0 h-full w-64 bg-blue-950 shadow-lg transition-all duration-300 ease-in-out"
            onClick={(e) => e.stopPropagation()}
          >
            <Sidebar setSidebarOpen={setSidebarOpen} />
          </aside>
        </div>
      )}

      <div className="flex flex-col flex-1 p-0 md:p-1">
        <header className="sticky top-0 bg-blue-950 shadow px-4 py-2">
          <Topbar setSidebarOpen={setSidebarOpen} />
        </header>

        {/* <main className="flex-1 overflow-y-auto p-6">{children}</main> */}
      </div>
    </div>
  );
};

export default Layout;
