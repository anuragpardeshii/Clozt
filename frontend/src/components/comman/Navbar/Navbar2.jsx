import React from "react";
import { Search, User, Heart, ShoppingCart, Menu } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useEffect, useState } from "react";

export default function Navbar2({user, setUser}) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);

  const toggleMobileMenu = () => {
    setMobileMenuOpen(!isMobileMenuOpen);
  };

  const toggleProfileDropdown = () => {
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/auth-status", { withCredentials: true });
        if (res.data.loggedIn) {
          setIsLoggedIn(true);
        } else {
          setIsLoggedIn(false);
        }
      } catch (error) {
        setIsLoggedIn(false);
      }
    };

    checkAuth();
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/logout", {}, { withCredentials: true });
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsLoggedIn(false);
      navigate("/login");
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };
  
  return (
    <>
      <section className="w-full bg-white fixed top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex max-w-8xl mx-auto items-center justify-between h-16 md:h-20">
            {/* logo */}
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold text-gray-800">
                CLOZT
              </a>
            </div>

            {/* desktop navigation */}
            <div className="hidden md:flex items-center space-x-8">
              <a
                href="/men"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Men
              </a>
              <a
                href="/women"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Women
              </a>
              <a
                href="/new-arrival"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                New Arrival
              </a>
              <a
                href="/sale"
                className="text-gray-600 hover:text-gray-900 transition-colors text-red-600"
              >
                Sale
              </a>
            </div>
            <div className="flex jusity-end">
            {/* Icons */}
            <div className="flex items-center space-x-4">
              {/* search */}
              <button className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors">
                <Search size={"1.3rem"} />
              </button>

              {/* user */}
              <div className="relative">
                <button
                  onClick={toggleProfileDropdown}
                  className="text-gray-600 hidden md:block hover:text-gray-900 transition-colors"
                >
                  <User size={"1.3rem"} />
                </button>
                {isProfileDropdownOpen && (
                  <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white mt-8 border border-gray-200 rounded-lg shadow-lg">
                    <a
                      href="/profile"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Profile
                    </a>
                    <a
                      href="/settings"
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                    >
                      Settings
                    </a>
                    {isLoggedIn ? (
                      <a
                      onClick={handleLogout}
                      className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >Logout</a>
                    ) : (
                      <a
                        href="/Login"
                        className="block px-4 py-2 text-gray-700 hover:bg-gray-100"
                      >
                        Login
                      </a>
                    )}
                  </div>
                )}
              </div>

              {/* heart */}
              <button className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors">
                <Heart size={"1.3rem"} />
              </button>

              {/* bag */}
              <button className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingCart size={"1.3rem"} />
              </button>
          
            </div>
            {/* Mobile menu button */}
            <button
              onClick={toggleMobileMenu}
              className="md:hidden text-gray-600 hover:text-gray-900 transition-colors"
            >
              <Menu size={"1.3rem"} />
            </button>
            </div>
          </nav>


          {/* Mobile navigation menu */}
          <div
            className={`md:hidden border-t border-gray-100 py-4 ${
              isMobileMenuOpen ? "block" : "hidden"
            }`}
          >
            <div className="flex flex-col space-y-4">
              <a
                href="/men"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Men
              </a>
              <a
                href="/women"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Women
              </a>
              <a
                href="/new-arrival"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                New Arrival
              </a>
              <a
                href="/sale"
                className="text-gray-600 hover:text-gray-900 transition-colors text-red-600"
              >
                Sale
              </a>
            </div>
            
          </div>
        </div>
      </section>
    </>
  );
}