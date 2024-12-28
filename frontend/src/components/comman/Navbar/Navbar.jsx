export default function Navbar() {
  return (
    <nav
      id="marketing-banner"
      className="fixed z-50 flex md:flex-row justify-between w-[calc(100%-2rem)] -translate-x-1/2 bg-white border border-gray-100 rounded-lg shadow-sm lg:max-w-7xl left-1/2 top-6 dark:bg-gray-700 dark:border-gray-600"
      style={{ zIndex: "1000", padding: "0.5rem 1rem" }}
    >
      
        <div className="flex items-center md:items-center md:flex-row md:mb-0">
          <a
            href="https://flowbite.com/"
            className="flex items-center border-gray-200 md:pe-4 md:me-4  md:mb-0 dark:border-gray-600"
          >
            <img
              src="/src/assets/Logo/Logo.png"
              className="h-6 me-2"
              alt="Flowbite Logo"
            />
            <span className="self-center text-lg pe-3 md:border-e font-semibold whitespace-nowrap dark:text-white">
              CLOZT
            </span>
          </a>

      </div>
      <div className="relative w-full ps-2">
        <input
          type="search"
          id="search-dropdown"
          className="block mobile-nav bg-white w-full z-20 text-sm text-gray-900 rounded-lg border-s-white border border-white  focus:border-black-500 dark:bg-gray-700 dark:border-s-gray-700  dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:border-black-500"
          placeholder="Search Products, brands and more..."
          required
        />
        <button
          type="submit"
          style={{display: "none"}}
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
        <a
          href="#"
          className="px-5 mobile-btn py-2 me-2 text-xs font-medium text-white text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300  rounded-lg  dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
        >
          Sign up
        </a>
        <button
          data-dismiss-target="#marketing-banner"
          type="button"
          className="flex-shrink-0 inline-flex justify-center w-7 h-7 items-center text-gray-400 hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 dark:hover:bg-gray-600 dark:hover:text-white"
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
          <span className="sr-only">Close banner</span>
        </button>
      </div>
    </nav>
  );
}
