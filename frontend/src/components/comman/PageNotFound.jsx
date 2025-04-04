import React from 'react';
import { Link } from 'react-router-dom';

const PageNotFound = () => {
  return (
    <div className="bg-white h-screen -mt-12 flex items-center justify-center px-4">
      <div className="max-w-4xl w-full text-center">
        <div className="flex flex-col md:flex-row items-center justify-center">
          <div className="relative mb-8 md:mb-0 md:mr-8">
            <div className="absolute -top-16 left-1/2 -translate-x-1/2">
              <svg width="80" height="80" viewBox="0 0 100 100" fill="none" xmlns="http://www.w3.org/2000/svg">
                <circle cx="50" cy="50" r="48" stroke="black" strokeWidth="4" fill="white"/>
                <path d="M35 65 C35 65, 50 35, 65 65" stroke="black" strokeWidth="4" fill="none" strokeLinecap="round"/>
                <circle cx="35" cy="40" r="5" fill="black"/>
                <circle cx="65" cy="40" r="5" fill="black"/>
              </svg>
            </div>
            <div className="border-2 border-black p-6 pt-12 bg-white">
              <h1 className="text-7xl font-bold mb-2">404</h1>
              <p className="text-xl uppercase font-semibold">PAGE DOES NOT FOUND</p>
            </div>
          </div>
          <div className="md:text-left">
            <div className="inline-block border-2 border-black p-4 mb-4 bg-white">
              <svg width="40" height="40" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="black" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <div>
              <h2 className="text-xl font-bold mb-2">PAGE DOES NOT FOUND</h2>
              <p className="text-gray-600 mb-6 max-w-md">
                The page you are looking for might have been removed, had its name changed, or is temporarily unavailable.
              </p>
              <Link to="/" className="inline-block bg-red-500 text-white rounded-lg px-6 py-3 font-medium hover:bg-red-800 transition-colors">
                Back to Homepage
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PageNotFound;