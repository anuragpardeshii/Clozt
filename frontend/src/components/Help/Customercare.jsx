export default function Customer() {
  return (
    <>
      <div
        className=" mx-auto rounded-lg"
        style={{
          backgroundImage: `url("/src/assets/Images/customer-care.jpg")`,
          backgroundSize: "cover", // Optional: To ensure the image covers the div
            backgroundPosition: "center", // Optional: To center the image
            marginTop: "6rem",
            maxWidth: "90rem",
            height: "22rem",
            marginBottom: "3rem",
        }}
      >
        <div
          className="flex gap-8 flex-col justify-center"
          style={{ height: "22rem" }}
        >
          <h1
            className="mb-4 font-extrabold text-white 
             text-3xl xs:text-xl sm:text-2xl md:text-5xl text-center lg:text-6xl"
          >
            Customer care
          </h1>
          <div>
            <form className="flex items-center max-w-sm mx-auto">
              <label htmlFor="simple-search" className="sr-only">
                Search
              </label>
              <div className="relative w-full">
                <input
                  type="text"
                  id="simple-search"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm focus:ring-blue-500 focus:border-blue-500 block w-full ps-2 p-2.5  dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search branch name..."
                  required
                />
              </div>
              <button
                type="submit"
                className="p-2.5 ms-2 text-sm font-medium text-white bg-blue-700  border border-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
            </form>
          </div>
        </div>
      </div>
    </>
  );
}
