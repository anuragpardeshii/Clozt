import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "flowbite/dist/flowbite.min.js"; // Ensure Flowbite JS is included

export default function Admin() {
  const [activeItem, setActiveItem] = useState(null);
  const navigate = useNavigate();
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);

  useEffect(() => {
    import("flowbite").then(({ initDropdowns, initDrawers }) => {
      initDropdowns();
      initDrawers();
    });
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post(
        "http://localhost:3000/api/admin/logout",
        {},
        { withCredentials: true }
      );
      localStorage.removeItem("adminToken");
      navigate("/admin-login");
    } catch (error) {
      console.error("Logout failed:", error.response?.data || error.message);
    }
  };

  const handleItemClick = (index) => {
    setActiveItem(index);
  };

  return (
    <>
      {/* Sidebar Toggle Button */}
      <button
        onClick={() => setIsSidebarOpen(!isSidebarOpen)}
        type="button"
        className="inline-flex items-center p-2 text-sm text-gray-500 rounded-lg sm:hidden hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-gray-200 dark:text-gray-400 dark:hover:bg-gray-700 dark:focus:ring-gray-600"
      >
        <span className="sr-only">Open sidebar</span>
        <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
          <path
            clipRule="evenodd"
            fillRule="evenodd"
            d="M2 4.75A.75.75 0 012.75 4h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 4.75zm0 10.5a.75.75 0 01.75-.75h7.5a.75.75 0 010 1.5h-7.5a.75.75 0 01-.75-.75zM2 10a.75.75 0 01.75-.75h14.5a.75.75 0 010 1.5H2.75A.75.75 0 012 10z"
          ></path>
        </svg>
      </button>

      {/* Sidebar */}
      <aside
        id="logo-sidebar"
        className={`fixed top-0 left-0 z-40 w-64 h-screen pt-20 transition-transform ${
          isSidebarOpen ? "translate-x-0" : "-translate-x-full"
        } bg-white border-r border-gray-200 sm:translate-x-0 dark:bg-gray-800 dark:border-gray-700`}
        aria-label="Sidebar"
      >
        <div className="h-full px-3 pb-4 overflow-y-auto bg-white dark:bg-gray-800">
          <ul className="space-y-2 font-medium">
            {[
              { name: "All Products", link: "/admin/all-products" },
              { name: "Add New Product", link: "/admin/add-new-products" },
              { name: "All Orders", link: "/admin/allOrders" },
              { name: "Earnings", link: "/admin/sales" },
              { name: "Home", link: "/" },
            ].map((item, index) => (
              <li key={index}>
                <a
                  href={item.link}
                  onClick={() => handleItemClick(index)}
                  className={`flex items-center p-2 text-gray-900 rounded-lg dark:text-white 
                    ${
                      activeItem === index
                        ? "bg-gray-100 hover:bg-gray-700"
                        : "hover:bg-gray-100 dark:hover:bg-gray-700"
                    } group`}
                >
                  <span className="ms-3">{item.name}</span>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside>

      {/* User Dropdown */}
      <div className="relative">
        <button
          type="button"
          className="flex text-sm bg-gray-800 rounded-full focus:ring-4 focus:ring-gray-300 dark:focus:ring-gray-600"
          aria-expanded="false"
          data-dropdown-toggle="dropdown-user"
        >
          <span className="sr-only">Open user menu</span>
          <img
            className="w-8 h-8 rounded-full"
            src="https://flowbite.com/docs/images/people/profile-picture-5.jpg"
            alt="user photo"
          />
        </button>
        <div
          className="z-50 hidden my-4 text-base list-none bg-white divide-y divide-gray-100 rounded shadow dark:bg-gray-700 dark:divide-gray-600"
          id="dropdown-user"
        >
          <div className="px-4 py-3">
            <p className="text-sm text-gray-900 dark:text-white">Neil Sims</p>
            <p className="text-sm font-medium text-gray-900 truncate dark:text-gray-300">
              neil.sims@flowbite.com
            </p>
          </div>
          <ul className="py-1">
            <li>
              <a
                href="#"
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Dashboard
              </a>
            </li>
            <li>
              <button
                onClick={handleLogout}
                className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 dark:text-gray-300 dark:hover:bg-gray-600 dark:hover:text-white"
              >
                Sign out
              </button>
            </li>
          </ul>
        </div>
      </div>
    </>
  );
}
