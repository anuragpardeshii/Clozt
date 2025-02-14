import React from "react";
import { Heart } from 'lucide-react';

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
                <div className="bg-[url('https://i.pinimg.com/474x/be/f5/c4/bef5c4cecffd3b1fb1ece9119b1f2453.jpg')] h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    Trending
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                  <Heart color="gray" size={"1.5rem"} />
                </button>
              </div>
              <h3 className="font-medium">Premium Cotton Shirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>

            <div className="min-w-[280px] group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="bg-[url('https://i.pinimg.com/736x/25/fc/a0/25fca0e30224c837c8878395aef69764.jpg')] h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    Trending
                  </span>
                </div>
                <button className="absolute top-4 right-4 bg-white p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                <Heart color="gray" size={"1.5rem"} />
                </button>
              </div>
              <h3 className="font-medium">Premium Cotton Shirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>

            <div className="min-w-[280px] group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="bg-[url('https://i.pinimg.com/736x/f8/96/de/f896dec379b3bf9d07ce4d71061418ad.jpg')] h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    Trending
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                  <Heart color="gray" size={"1.5rem"} />
                </button>
              </div>
              <h3 className="font-medium">Premium Cotton Shirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>

            <div className="min-w-[280px] group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="bg-[url('https://i.pinimg.com/736x/cf/ce/17/cfce17714697056b7726fd63cead66cf.jpg')] h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    Trending
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                  <Heart color="gray" size={"1.5rem"} />
                </button>
              </div>
              <h3 className="font-medium">Premium Cotton Shirt</h3>
              <p className="text-gray-600 mt-1">Rs. 999</p>
            </div>

            <div className="min-w-[280px] group">
              <div className="relative overflow-hidden rounded-lg mb-4">
                <div className="bg-[url('https://i.pinimg.com/736x/15/26/8e/15268e1dd98eeb1463caf9ee9d847c7a.jpg')] h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"></div>
                <div className="absolute top-4 left-4">
                  <span className="bg-black text-white px-3 py-1 rounded-full text-sm">
                    Trending
                  </span>
                </div>
                <button className="absolute top-4 right-4 p-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300 ">
                  <Heart color="gray" size={"1.5rem"} />
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
