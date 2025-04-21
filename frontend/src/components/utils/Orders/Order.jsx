import React from "react";
import { Dropdown } from "flowbite-react";
import img1 from "/src/assets/Products/Men/1.jpeg";
import img2 from "/src/assets/Products/Men/2.jpeg";
import img3 from "/src/assets/Products/Men/3.jpeg";

export default function Order() {
  return (
    <div className="mx-auto" style={{ maxWidth: "80rem", marginTop: "6rem" }}>
      <h1 className="text-2xl px-2">Order Summary</h1>
      <div className="flex w-100 py-4 justify-between items-center flex-wrap">
        <div>
          <form class="" style={{ width: "70rem" }}>
            <label
              for="default-search"
              class="mb-2 text-sm font-medium text-gray-900 sr-only dark:text-white"
            >
              Search
            </label>
            <div class="relative">
              <div class="absolute inset-y-0 start-0 flex items-center ps-3 pointer-events-none">
                <svg
                  class="w-4 h-4 text-gray-500 dark:text-gray-400"
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
              </div>
              <input
                type="search"
                id="default-search"
                class="block w-full p-4 ps-10 text-sm text-gray-900 border border-white rounded-lg bg-gray-50 focus:ring-blue-500  dark:bg-gray-700  dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500"
                placeholder="Search your products..."
                required
              />
            </div>
          </form>
        </div>
        <div className="z-50 bg-gray-50 p-4 text-gray-900 text-sm rounded-lg">
          <Dropdown label="Dropdown" inline>
            <Dropdown.Item>Last 6 months</Dropdown.Item>
            <Dropdown.Item>2024</Dropdown.Item>
            <Dropdown.Item>2023</Dropdown.Item>
          </Dropdown>
        </div>
      </div>
      <div className="relative mx-auto mb-8 overflow-x-auto sm:rounded-lg">
        <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
          <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
            <tr>
              <th scope="col" className="px-16 py-3">
                <span className="sr-only">Image</span>
              </th>
              <th scope="col" className="px-6 py-3">
                Product
              </th>
              <th scope="col" className="px-6 py-3">
                Status
              </th>
              <th scope="col" className="px-6 py-3">
                Action
              </th>
            </tr>
          </thead>
          <tbody>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img
                  src={img1}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt="t-shirt"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                Black Oversized Butterfly Tee
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                Delivered
              </td>
              <td className="px-6 py-4">
                <button
                  data-modal-target="default-modal"
                  data-modal-toggle="default-modal"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img
                  src={img2}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt="Apple iMac"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                iMac 27"
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                In transit
              </td>
              <td className="px-6 py-4">
                <button
                  data-modal-target="default-modal"
                  data-modal-toggle="default-modal"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
            <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
              <td className="p-4">
                <img
                  src={img3}
                  className="w-16 md:w-32 max-w-full max-h-full"
                  alt="iPhone 12"
                />
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                IPhone 12
              </td>
              <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                Cancelled
              </td>
              <td className="px-6 py-4">
                <button
                  data-modal-target="default-modal"
                  data-modal-toggle="default-modal"
                  className="font-medium text-red-600 dark:text-red-500 hover:underline"
                >
                  View
                </button>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  );
}
