import React from "react";
import { Search, User, Heart, ShoppingCart } from "lucide-react";

export default function Navbar2() {
  return (
    <>
      <section className="w-full bg-white fixed top-0 z-50 shadow-sm">
        <div className="container mx-auto px-4">
          <nav className="flex items-center justify-between h-16 md:h-20">
            {/* logo */}
            <div className="flex items-center">
              <a href="/" className="text-2xl font-bold  text-gray-800">
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
            {/* Icons */}
            <div className="flex items-center space-x-2">
              {/* search */}
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <Search size={"1.3rem"} />
              </button>
              {/* user */}
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <User size={"1.3rem"} />
                <i className="fa-solid fa-magnifying-glass text-xl"></i>
              </button>
              {/* heart */}
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <Heart size={"1.3rem"} />
                <i className="fa-solid fa-magnifying-glass text-xl"></i>
              </button>
              {/* bag */}
              <button className="text-gray-600 hover:text-gray-900 transition-colors">
                <ShoppingCart size={"1.3rem"} />
                <i className="fa-solid fa-magnifying-glass text-xl"></i>
              </button>
            </div>
            {/* Mobile menu button */}
            <button className="md:hidden text-gray-600 hover:text-gray-900 transition-colors">
              <i className="fa-solid fa-bars text-2xl"></i>
            </button>
          </nav>
          {/* Mobile navigation menu */}
          <div className="md:hidden border-t border-gray-100 py-4 hidden">
            <div className="flex flex-col space-y-4">
              <a
                href="/men"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Men
              </a>
              <a
                href="/men"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                Women
              </a>
              <a
                href="/men"
                className="text-gray-600 hover:text-gray-900 transition-colors"
              >
                New Arrival
              </a>
              <a
                href="/men"
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
