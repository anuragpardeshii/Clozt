import React, { useState } from "react";
export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleLogin = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/login",
        { email, password },
        { withCredentials: true } // Send cookies with the request
      );
      
      // On success
      setMessage("Login successful!");
    } catch (error) {
      // Handle error
      if (error.response) {
        setMessage(error.response.data);
      } else {
        setMessage("An error occurred. Please try again.");
      }
    }
  };

  return (
    <>
      <section className="bg-gray-50 pt-12 min-h-screen dark:bg-gray-900" style={{paddingTop: "6rem"}}>
        <div className="py-8 px-4 mx-auto max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
          <div className="flex flex-col sm:max-w-lg mx-auto justify-center">
            <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
              Access the Care You Need
            </h1>
            <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
              Log in to easily book appointments, manage your health records,
              and stay updated on your healthcare journey.
            </p>
            <a
              href="/signup"
              className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center"
            >
              Sign up
              <svg
                className="w-3.5 h-3.5 ms-2 rtl:rotate-180"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 14 10"
              >
                <path
                  stroke="currentColor"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth="2"
                  d="M1 5h12m0 0L9 1m4 4L9 9"
                />
              </svg>
            </a>
          </div>
          <div>
            <div className="lg:max-w-xl sm:max-w-lg mx-auto p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
              <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-white">
                Login
              </h2>
              {/* {alertMessage && (
                <div className="p-4 mb-4 text-sm text-white bg-red-500 rounded-lg dark:bg-red-800">
                  {alertMessage}
                </div>
              )} */}

              <form onSubmit={handleLogin} className="max-w-md mx-auto">
                <div className="mb-5">
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your email
                  </label>
                  <input
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    id="email"
                    name="email"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    placeholder="name@flowbite.com"
                    required
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="password"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your password
                  </label>
                  <input
                    type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
                    id="password"
                    name="password"
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
                <div className="text-center">
                {/* <div className="flex items-center justify-center mb-5">
                  <div className="flex items-center h-5">
                    <input
                      id="terms"
                      type="checkbox"
                      value=""
                      className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-blue-300 dark:bg-gray-700 dark:border-gray-600 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800"
                      required
                    />
                  </div>
                  <label
                    htmlFor="terms"
                    className="ms-2 text-sm font-medium text-gray-900 dark:text-gray-300"
                  >
                    I agree with the{" "}
                    <a
                      href="#"
                      className="text-blue-600 hover:underline dark:text-blue-500"
                    >
                      terms and conditions
                    </a>
                  </label>
                </div> */}
                </div>
                <div className="text-center">
                <button
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{width: "10rem"}}
                >
                  Login
                </button>
                </div>
              </form>
              {message && <p>{message}</p>}
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
