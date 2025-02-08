import React from "react";

export default function Trending() {
  return (
    <>
      <div id="trending_items" className="py-16 bg-gray-50">
        <div className="container mx-auto px-4">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl font-bold">Trending Now</h2>
            <div className="flex gap-2">
              <button
                id="prev-trending"
                className="p-2 rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors"
                fdprocessedid="qocm1g"
              >
                Left
              </button>
              <button
                id="next-trending"
                className="p-2 rounded-full border border-gray-300 hover:bg-black hover:text-white transition-colors"
                fdprocessedid="iw3wve"
              >
                Left
              </button>
            </div>
          </div>
          <div className='flex overflow-x-auto gap-6 no-scrollbar pb-4'>
            <div className="min-w-[280px] group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="bg-[url('https://placehold.co/400x500')] h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    Trending
                  </span>
                </div>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                  Heart icon
                </button>
              </div>
              <h3 className="font-medium">Premium Cotton Shirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>

            <div className="min-w-[280px] group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="bg-[url('https://placehold.co/400x500')] h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    Trending
                  </span>
                </div>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                  Heart icon
                </button>
              </div>
              <h3 className="font-medium">Premium Cotton Shirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>

            <div className="min-w-[280px] group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="bg-[url('https://placehold.co/400x500')] h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    Trending
                  </span>
                </div>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                  Heart icon
                </button>
              </div>
              <h3 className="font-medium">Premium Cotton Shirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>

            <div className="min-w-[280px] group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="bg-[url('https://placehold.co/400x500')] h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    Trending
                  </span>
                </div>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                  Heart icon
                </button>
              </div>
              <h3 className="font-medium">Premium Cotton Shirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>

            <div className="min-w-[280px] group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="bg-[url('https://placehold.co/400x500')] h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    Trending
                  </span>
                </div>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 hover:bg-gray-100">
                  Heart icon
                </button>
              </div>
              <h3 className="font-medium">Premium Cotton Shirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>

          </div>
        </div>
      </div>
    </>
  );
}
