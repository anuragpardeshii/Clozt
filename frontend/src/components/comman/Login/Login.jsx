import React, { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/auth/check", {
          withCredentials: true,
        });

        if (res.data.loggedIn) {
          setIsLoggedIn(true);
          login(res.data.user);
          navigate("/");
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, [navigate, login]);

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setMessage("");

    try {
      const res = await axios.post(
        "http://localhost:3000/api/users/login",
        { email, password },
        { withCredentials: true }
      );

      if (res.status === 200) {
        setMessage("Login successful!");
        login(res.data.user);
        navigate("/");
      }
    } catch (error) {
      console.error("Login error:", error);
      if (error.response?.status === 401) {
        setMessage("Invalid email or password. Please try again.");
      } else {
        setMessage(error.response?.data?.message || "Login failed. Please try again later.");
      }
    } finally {
      setLoading(false);
    }
  };

  if (isLoggedIn) {
    return (
      <div className="min-h-screen flex items-center justify-center text-gray-700 dark:text-white">
        Redirecting...
      </div>
    );
  }

  return (
    <section className="bg-gray-50 min-h-screen dark:bg-gray-900">
      <div className="py-8 px-4 mx-auto h-screen items-center max-w-screen-xl lg:py-16 grid lg:grid-cols-2 gap-8 lg:gap-16">
        <div className="flex flex-col sm:max-w-lg mx-auto justify-center">
          <h1 className="mb-4 text-4xl font-extrabold tracking-tight leading-none text-gray-900 md:text-5xl lg:text-6xl dark:text-white">
            Stay Stylish, Shop Smart
          </h1>
          <p className="mb-6 text-lg font-normal text-gray-500 lg:text-xl dark:text-gray-400">
            Log in to explore the latest trends, manage your orders, and enjoy a seamless shopping experience with CLOZT.
          </p>
          <a href="/signup" className="text-blue-600 dark:text-blue-500 hover:underline font-medium text-lg inline-flex items-center">
            Sign up
          </a>
        </div>
        <div>
          <div className="lg:max-w-xl sm:max-w-lg mx-auto p-6 space-y-8 sm:p-8 bg-white rounded-lg shadow-xl dark:bg-gray-800">
            <h2 className="text-2xl text-center font-bold text-gray-900 dark:text-white">Login</h2>
            <form onSubmit={handleLogin} className="max-w-md mx-auto">
              <div className="mb-5">
                <label htmlFor="email" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your email
                </label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  id="email"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  placeholder="name@example.com"
                  required
                />
              </div>
              <div className="mb-5">
                <label htmlFor="password" className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                  Your password
                </label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  id="password"
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white"
                  required
                />
              </div>
              <div className="text-center">
                <button
                  type="submit"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700"
                  style={{ width: "10rem" }}
                  disabled={loading}
                >
                  {loading ? "Logging in..." : "Login"}
                </button>
              </div>
            </form>
            {message && (
              <div
                className={`mt-4 text-sm p-3 rounded-lg ${
                  message === "Login successful!" ? "text-green-700 bg-green-100" : "text-red-700 bg-red-100"
                }`}
              >
                {message}
              </div>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}