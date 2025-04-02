import React, { useEffect, useState } from "react";
import { Search, User, Heart, ShoppingCart, Menu } from "lucide-react";
import axios from "axios";
import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext";

export default function Navbar2({ user }) {
  const [isMobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [isProfileDropdownOpen, setProfileDropdownOpen] = useState(false);
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const navigate = useNavigate();
  const { logout } = useAuth();

  const toggleMobileMenu = () => setMobileMenuOpen(!isMobileMenuOpen);
  const toggleProfileDropdown = (e) => {
    e.stopPropagation();
    setProfileDropdownOpen(!isProfileDropdownOpen);
  };

  useEffect(() => {
    const checkAuth = async () => {
      try {
        const res = await axios.get("http://localhost:3000/api/users/auth/check", { withCredentials: true });
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

  useEffect(() => {
    const closeDropdown = (e) => {
      if (!e.target.closest(".profile-dropdown")) {
        setProfileDropdownOpen(false);
      }
    };

    document.addEventListener("click", closeDropdown);
    return () => document.removeEventListener("click", closeDropdown);
  }, []);

  const handleLogout = async () => {
    try {
      await axios.post("http://localhost:3000/api/users/logout", {}, { withCredentials: true });
      document.cookie = "token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;";
      setIsLoggedIn(false);
      logout();
      navigate("/");
      window.location.reload();
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  return (
    <section className="w-full bg-white sticky top-0 z-50 shadow-sm">
      <div className="container mx-auto px-4">
        <nav className="flex max-w-8xl mx-auto items-center justify-between h-16 md:h-20">
          {/* Logo */}
          <div className="flex items-center">
            <Link to="/" className="text-2xl font-bold text-gray-800">CLOZT</Link>
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            <Link to="/men" className="text-gray-600 hover:text-gray-900 transition-colors">Men</Link>
            <Link to="/women" className="text-gray-600 hover:text-gray-900 transition-colors">Women</Link>
            <Link to="/new-arrival" className="text-gray-600 hover:text-gray-900 transition-colors">New Arrival</Link>
            <Link to="/sale" className="text-gray-600 hover:text-gray-900 text-red-600 transition-colors">Sale</Link>
          </div>

          {/* Icons */}
          <div className="flex items-center space-x-4">
            <button className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors">
              <Search size={"1.3rem"} />
            </button>

            {/* Profile Dropdown */}
            <div className="relative profile-dropdown">
              <button onClick={toggleProfileDropdown} className="text-gray-600 hidden md:block hover:text-gray-900 transition-colors">
                <User size={"1.3rem"} />
              </button>
              {isProfileDropdownOpen && (
                <div className="absolute left-1/2 -translate-x-1/2 mt-2 w-48 bg-white mt-8 border border-gray-200 rounded-lg shadow-lg">
                  <Link to="/profile" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Profile</Link>
                  <Link to="/settings" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Settings</Link>
                  {isLoggedIn ? (
                    <button onClick={handleLogout} className="block w-full text-left px-4 py-2 text-gray-700 hover:bg-gray-100">Logout</button>
                  ) : (
                    <Link to="/login" className="block px-4 py-2 text-gray-700 hover:bg-gray-100">Login</Link>
                  )}
                </div>
              )}
            </div>

            <Link to="/wishlist"><Heart size={"1.3rem"} className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors" /></Link>
            <Link to="/cart"><ShoppingCart size={"1.3rem"} className="hidden md:block text-gray-600 hover:text-gray-900 transition-colors" /></Link>
          </div>
        </nav>
      </div>
    </section>
  );
}