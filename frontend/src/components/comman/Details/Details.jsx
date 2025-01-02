import React, { useState } from "react";
export default function Details() {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);

  const [alertMessage, setAlertMessage] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  const handleCartClick = () => {
    if (!isInCart) {
      setCartMessage("Added to Cart!");
    } else {
      setCartMessage("Removed from Cart!");
    }
    setIsInCart(!isInCart);

    // Clear the alert after 3 seconds
    setTimeout(() => setCartMessage(""), 3000);
  };

  const handleButtonClick = () => {
    if (!isInWishlist) {
      setAlertMessage("Added to Wishlist!");
    } else {
      setAlertMessage("Removed from Wishlist!");
    }
    setIsInWishlist(!isInWishlist);

    // Clear the alert after 3 seconds
    setTimeout(() => setAlertMessage(""), 3000);
  };
  return (
    <>
      <div
        className="flex flex-wrap mx-auto flex-row"
        style={{ marginTop: "6rem", maxWidth: "70rem" }}
      >
        <div className="flex flex-wrap justify-around">
          <div className="flex flex-row mx-auto justify-around align-center">
            <div>
              <img
                className="m-4"
                src="/src/assets/Products/Men/1.jpeg"
                style={{ maxWidth: "4rem" }}
                alt=""
              />
              <img
                className="w-20 m-4"
                src="/src/assets/Products/Men/1b.jpeg"
                style={{ maxWidth: "4rem" }}
                alt=""
              />
              <img
                className="w-20 m-4"
                src="/src/assets/Products/Men/1.jpeg"
                style={{ maxWidth: "4rem" }}
                alt=""
              />
              <img
                className="w-20 m-4"
                src="/src/assets/Products/Men/1b.jpeg"
                style={{ maxWidth: "4rem" }}
                alt=""
              />
              <img
                className="w-20 m-4"
                src="/src/assets/Products/Men/1.jpeg"
                style={{ maxWidth: "4rem" }}
                alt=""
              />
            </div>

            <div className="Image">
              <img
                className="m-4"
                src="/src/assets/Products/Men/1.jpeg"
                style={{ maxWidth: "25rem" }}
                alt=""
              />
            </div>
          </div>

          <div style={{ flex: "1" }}>
            <div className="m-4 flex-one">
              <h1 className="text-gray-600 font-bold text-2xl">
                Black Oversided Butterfly Tshirt
              </h1>
              <h1 className="text-black font-semibold text-2xl">Rs. 999</h1>
              <p className="font-medium rtl:text-right text-medium text-gray-500">
                Color: Black
              </p>
              <div>
                <div>
                  <p className="font-medium text-medium rtl:text-right text-gray-500 mb-4">
                    Size:
                  </p>
                </div>
                <div className="flex justify-start">
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    XS
                  </button>
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    S
                  </button>
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    M
                  </button>
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    L
                  </button>
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    XL
                  </button>
                  <button
                    type="button"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-full text-sm px-5 py-2.5 me-2 mb-2 dark:bg-gray-800 dark:hover:bg-gray-700 dark:focus:ring-gray-700 dark:border-gray-700"
                  >
                    XXL
                  </button>
                </div>
                <div>
                  <p className="font-medium rtl:text-right text-medium text-gray-500">
                    Size Chart
                  </p>
                </div>
                <div>
                  <p className="font-medium text-medium rtl:text-right text-gray-500 mb-4">
                    Share:{" "}
                  </p>
                </div>
              </div>
              <div className="flex flex-row my-4">
                <button
                  type="button"
                  onClick={handleCartClick}
                  className="text-white me-4 bg-gray-800 hover:bg-gray-900 flex flex-column items-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  <svg
                    className="w-3.5 h-3.5 me-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 18 21"
                  >
                    <path d="M15 12a1 1 0 0 0 .962-.726l2-7A1 1 0 0 0 17 3H3.77L3.175.745A1 1 0 0 0 2.208 0H1a1 1 0 0 0 0 2h.438l.6 2.255v.019l2 7 .746 2.986A3 3 0 1 0 9 17a2.966 2.966 0 0 0-.184-1h2.368c-.118.32-.18.659-.184 1a3 3 0 1 0 3-3H6.78l-.5-2H15Z" />
                  </svg>
                  Add to card
                </button>
                <button
                  type="button"
                  className="text-white hover:bg-gray-900 flex flex-column items-center focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-3 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  style={{ backgroundColor: "#eee", color: "black" }}
                  onClick={handleButtonClick}
                >
                  <svg
                    className="w-4 h-4 me-2"
                    xmlns="http://www.w3.org/2000/svg"
                    fill={isInWishlist ? "red" : "white"}
                    viewBox="0 0 24 24"
                    aria-hidden="true"
                  >
                    <path d="M12.001 4.529c-2.349-2.42-6.176-2.42-8.526 0-2.418 2.496-2.418 6.545 0 9.04l7.506 7.75a1.2 1.2 0 0 0 1.68 0l7.506-7.75c2.418-2.495 2.418-6.544 0-9.04-2.35-2.42-6.177-2.42-8.526 0Z" />
                  </svg>
                  Wishlist
                </button>
              </div>
              <div>
                {/* Cart */}
                {cartMessage && (
                  <div
                    className={`flex items-center p-2 mb-2 text-sm rounded-lg ${
                      isInCart
                        ? "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400"
                        : "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    }`}
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 me-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="font-medium">{cartMessage}</span>
                  </div>
                )}
              </div>
              <div>
                {/* Alert */}
                {alertMessage && (
                  <div
                    className={`flex items-center p-2 mb-2 text-sm rounded-lg ${
                      isInWishlist
                        ? "text-green-800 bg-green-50 dark:bg-gray-800 dark:text-green-400"
                        : "text-red-800 bg-red-50 dark:bg-gray-800 dark:text-red-400"
                    }`}
                    role="alert"
                  >
                    <svg
                      className="flex-shrink-0 inline w-4 h-4 me-3"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="currentColor"
                      viewBox="0 0 20 20"
                      aria-hidden="true"
                    >
                      <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5ZM9.5 4a1.5 1.5 0 1 1 0 3 1.5 1.5 0 0 1 0-3ZM12 15H8a1 1 0 0 1 0-2h1v-3H8a1 1 0 0 1 0-2h2a1 1 0 0 1 1 1v4h1a1 1 0 0 1 0 2Z" />
                    </svg>
                    <span className="font-medium">{alertMessage}</span>
                  </div>
                )}
              </div>
              <div
                id="accordion-flush"
                data-accordion="collapse"
                data-active-classes="bg-white dark:bg-gray-900 text-gray-900 dark:text-white"
                data-inactive-classes="text-gray-500 dark:text-gray-400"
              >
                <h2 id="accordion-flush-heading-1">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    data-accordion-target="#accordion-flush-body-1"
                    aria-expanded="true"
                    aria-controls="accordion-flush-body-1"
                  >
                    <span>Product Description</span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-flush-body-1"
                  className="hidden"
                  aria-labelledby="accordion-flush-heading-1"
                >
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Product id:
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out this guide to learn how to{" "}
                      <a
                        href="/docs/getting-started/introduction/"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        get started
                      </a>{" "}
                      and start developing websites even faster with components
                      on top of Tailwind CSS.
                    </p>
                  </div>
                </div>
                <h2 id="accordion-flush-heading-2">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    data-accordion-target="#accordion-flush-body-2"
                    aria-expanded="false"
                    aria-controls="accordion-flush-body-2"
                  >
                    <span>Returns & Exchange?</span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-flush-body-2"
                  className="hidden"
                  aria-labelledby="accordion-flush-heading-2"
                >
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Flowbite is first conceptualized and designed using the
                      Figma software so everything you see in the library has a
                      design equivalent in our Figma file.
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      Check out the{" "}
                      <a
                        href="https://flowbite.com/figma/"
                        className="text-blue-600 dark:text-blue-500 hover:underline"
                      >
                        Figma design system
                      </a>{" "}
                      based on the utility classes from Tailwind CSS and
                      components from Flowbite.
                    </p>
                  </div>
                </div>
                <h2 id="accordion-flush-heading-3">
                  <button
                    type="button"
                    className="flex items-center justify-between w-full py-5 font-medium rtl:text-right text-gray-500 border-b border-gray-200 dark:border-gray-700 dark:text-gray-400 gap-3"
                    data-accordion-target="#accordion-flush-body-3"
                    aria-expanded="false"
                    aria-controls="accordion-flush-body-3"
                  >
                    <span>Look After me</span>
                    <svg
                      data-accordion-icon
                      className="w-3 h-3 rotate-180 shrink-0"
                      aria-hidden="true"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 10 6"
                    >
                      <path
                        stroke="currentColor"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        strokeWidth="2"
                        d="M9 5 5 1 1 5"
                      />
                    </svg>
                  </button>
                </h2>
                <div
                  id="accordion-flush-body-3"
                  className="hidden"
                  aria-labelledby="accordion-flush-heading-3"
                >
                  <div className="py-5 border-b border-gray-200 dark:border-gray-700">
                    <p className="mb-2 text-gray-500 dark:text-gray-400">
                      Machine wash according to instructions on care label
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
}
