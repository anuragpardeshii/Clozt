import React, { useState, useEffect } from "react";
import logo from "/src/assets/Logo/Logo.png";

export default function Navbar() {
  const [isDropdownVisible, setDropdownVisible] = useState(false);

  const toggleDropdown = () => {
    setDropdownVisible((prev) => !prev);
  };
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Check auth state on load
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setIsAuthenticated(true);
    }
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("token");
    setIsAuthenticated(false);
  };

  return (
    <>
      <nav
        className="fixed z-50 flex md:flex-row nav-padding justify-between  -translate-x-1/2 bg-white rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600"
        style={{ zIndex: "1000", width: "90vw" }}
      >
        <div className="flex items-center md:items-center md:flex-row md:mb-0">
          <a
            href="/"
            className="flex items-center border-gray-200 md:pe-4 md:me-4  md:mb-0 dark:border-gray-600"
          >
            <img
              src={logo}
              className="h-6 me-2 height-mob"
              alt="Flowbite Logo"
            />
            <span className="self-center me-4 pe-3 sm:text-sm xs:text-sm md:text-sm xl:text-lg md:border-e font-semibold whitespace-nowrap dark:text-white">
              CLOZT
            </span>
          </a>
        </div>
        <div className="relative w-full">
          <input
            type="search"
            id="search-dropdown"
            className="block bg-white w-full z-20 text-sm text-gray-900 rounded-lg border-s-white border border-white focus:outline-none focus:ring-white-500 focus:border-black-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-black-500"
            placeholder="Search Products, brands and more..."
            required
          />
          <button
            type="submit"
            style={{ display: "none" }}
            className="absolute top-0 end-0 text-sm font-medium h-full text-white bg-blue-700 rounded-e-lg border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
          >
            <svg
              className="w-4 h-4"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 20 20"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="m19 19-4-4m0-7A7 7 0 1 1 1 8a7 7 0 0 1 14 0Z"
              />
            </svg>
            <span className="sr-only">Search</span>
          </button>
        </div>
        <div className="flex items-center flex-shrink-0">
          <button
            id="mega-menu-full-dropdown-button"
            type="button"
            onClick={toggleDropdown}
            className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
            style={{ zIndex: "10000" }}
          >
            <svg
              className="w-5 h-5"
              aria-hidden="true"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 17 14"
            >
              <path
                stroke="currentColor"
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth="2"
                d="M1 1h15M1 7h15M1 13h15"
              />
            </svg>
            <span className="sr-only">Toggle dropdown</span>
          </button>
        </div>
      </nav>

      {isDropdownVisible && (
        <div
          id="mega-menu-full-dropdown"
          className="fixed flex md:flex-row justify-between w-[calc(100%-2rem)] -translate-x-1/2  rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600"
          style={{ zIndex: "1000", marginTop: "4rem" }}
        >
          <div className="max-w-screen-xl ms-auto">
            <div className="grid max-w-screen-md px-4 bg-white py-5 gap-8 text-gray-900 dark:text-white sm:grid-cols-3 md:px-6" style={{marginLeft: "auto"}}>
            <ul>
              <li>
                <a
                  href="/customer-care"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Help</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/contact-us"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Contact us</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Gift card</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="/wishlist"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Whishlist</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/cart"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Shopping Bag</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Manage Account</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
            </ul>
            <ul>
              <li>
                <a
                  href="/orders"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Orders</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
              <li>
                <a
                  href="/about"
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">About</div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    Connect with third-party tools that you're already using.
                  </span>
                </a>
              </li>
              <li>
                <a
                  href={isAuthenticated ? "/logout" : "/login"}
                  onClick={isAuthenticated ? handleLogout : null}
                  className="block p-3 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700"
                >
                  <div className="font-semibold">Login</div>
        <span className="text-sm text-gray-500 dark:text-gray-400">
          Connect with third-party tools that you're already using.
        </span>

                </a>
              </li>
            </ul>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
