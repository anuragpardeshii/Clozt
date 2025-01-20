import React from "react";
import { Dropdown } from "flowbite-react";
import img1 from "/src/assets/Products/Men/1.jpeg";
import img2 from "/src/assets/Products/Men/2.jpeg";
import img3 from "/src/assets/Products/Men/3.jpeg";

export default function Summary() {
  return (
    <>
      <div className="mx-auto" style={{ maxWidth: "80rem", marginTop: "6rem" }}>
        <h1 className="text-2xl px-2">Order Details</h1>
        <ol className="flex p-8 mb-4 items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <svg
                className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
                aria-hidden="true"
                xmlns="http://www.w3.org/2000/svg"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
              </svg>
              Shopping{" "}
              <span className="hidden sm:inline-flex sm:ms-2">bag</span>
            </span>
          </li>
          <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
            <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
              <span className="me-2">2</span>
              Address{" "}
              <span className="hidden sm:inline-flex sm:ms-2">Info</span>
            </span>
          </li>
          <li className="flex items-center">
            <span className="me-2">3</span>
            Payment
          </li>
        </ol>
        <div className="flex">
        <div className="relative mx-auto mb-8 overflow-x-auto sm:rounded-lg">
        <p>DELIVERY ADDRESS</p>
        <div>
          <div className="flex items-center justify-between">
            
            <h2>
              Anurag Pardeshi <span>(default)</span>
            </h2>
                <button className="bg-gray-400">home</button>
            </div>

            <p>610 Siddhi Solitaire Kishanganj, Mhow</p>
            <p>Indore, Madhya Pradesh, 453441</p>
            <p><b>Mobile Number: </b> +91-8435304050</p>

            <button>Add or Change the address</button>
          </div>
        </div>
        <div className="relative mx-auto mb-8 overflow-x-auto sm:rounded-lg">
            <p>DELIVERY ESTIMATES</p>
            <div className="flex items-center gap-4">
                <div className="w-10">
                    <img src={img1} alt="" />
                </div>
                <div>
                    <p>Estimated Delivery by <b>26 Jan 2025</b></p>
                </div>
            </div>
        </div>
        </div>
      </div>
    </>
  );
}
