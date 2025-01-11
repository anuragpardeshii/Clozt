import { useState } from "react";

export default function Men() {
  const products = [
    {
      id: 1,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/1.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 2,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/2.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 3,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/3.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 4,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/4.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 5,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/5.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 6,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/6.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 7,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/7.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 8,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/8.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 9,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/9.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 10,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/10.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 11,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/11.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 12,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/12.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 13,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/13.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 14,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/14.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 15,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/15.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 16,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/16.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    // {
    //   id: 17,
    //   title: "Black Oversized Butterfly Tee",
    //   price: 999,
    //   image: "/src/assets/Products/Men/17.jpeg",
    //   description: "A stylish oversized tee with a butterfly design.",
    //   rating: 5.0,
    // },
    // {
    //   id: 18,
    //   title: "Black Oversized Butterfly Tee",
    //   price: 999,
    //   image: "/src/assets/Products/Men/18.jpeg",
    //   description: "A stylish oversized tee with a butterfly design.",
    //   rating: 5.0,
    // },
    {
      id: 19,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/19.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
    {
      id: 20,
      title: "Black Oversized Butterfly Tee",
      price: 999,
      image: "/src/assets/Products/Men/20.jpeg",
      description: "A stylish oversized tee with a butterfly design.",
      rating: 5.0,
    },
  ];

  const [visibleCount, setVisibleCount] = useState(8); // Initially show 8 products

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 8); // Load 4 more products
  };

  return (
    <>
      <div className="max-w-6xl mx-auto" style={{ maxWidth: "80rem" }}>
        {/* Video Background and Heading */}
        <div
          className="relative max-w-6xl mx-auto"
          style={{
            marginTop: "6rem",
            height: "22rem",
            marginBottom: "3rem",
            overflow: "hidden",
          }}
        >
          <video
            autoPlay
            loop
            muted
            playsInline
            className="absolute top-0 left-0 w-full h-full object-cover"
          >
            <source src="/src/assets/Videos/men.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div
            className="relative z-10 flex flex-col gap-8 justify-center"
            style={{ height: "22rem" }}
          >
            <h1 className="mb-4 font-extrabold text-white text-3xl text-center lg:text-6xl">
              Men's Fashion
            </h1>
          </div>
          <div
            className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
            style={{ zIndex: 5 }}
          ></div>
        </div>
        <div className="pb-4 mx-4 mb-4">
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            T-shirts
          </button>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Shirts
          </button>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Denims
          </button>
          <button
            type="button"
            className="py-2.5 px-5 me-2 mb-4 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
          >
            Winter Wear
          </button>
          <br />
          <hr />
        </div>


        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 mx-auto px-4 gap-8 mb-8">
          {products.slice(0, visibleCount).map((product) => (
            <div
              key={product.id}
              className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700"
            >
              <a href="#">
                <img
                  className="p-8 rounded-t-lg"
                  src={product.image}
                  alt={product.title}
                />
              </a>
              <div className="px-5 pb-5">
                <a href="#">
                  <h5 className="text-xl font-semibold tracking-tight text-gray-900 dark:text-white">
                    {product.title}
                  </h5>
                </a>
                <div className="flex items-center mt-2.5 mb-5">
                  <div className="flex items-center space-x-1 rtl:space-x-reverse">
                    {Array.from({ length: Math.floor(product.rating) }).map(
                      (_, index) => (
                        <svg
                          key={index}
                          className="w-4 h-4 text-yellow-300"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="currentColor"
                          viewBox="0 0 22 20"
                        >
                          <path d="M20.924 7.625a1.523 1.523 0 0 0-1.238-1.044l-5.051-.734-2.259-4.577a1.534 1.534 0 0 0-2.752 0L7.365 5.847l-5.051.734A1.535 1.535 0 0 0 1.463 9.2l3.656 3.563-.863 5.031a1.532 1.532 0 0 0 2.226 1.616L11 17.033l4.518 2.375a1.534 1.534 0 0 0 2.226-1.617l-.863-5.03L20.537 9.2a1.523 1.523 0 0 0 .387-1.575Z" />
                        </svg>
                      )
                    )}
                  </div>
                  <span className="bg-blue-100 text-blue-800 text-xs font-semibold px-2.5 py-0.5 rounded dark:bg-blue-200 dark:text-blue-800 ms-3">
                    {product.rating.toFixed(1)}
                  </span>
                </div>
                <div className="flex items-center justify-between">
                  <span className="text-2xl font-bold text-gray-900 dark:text-white">
                    ₹{product.price}
                  </span>
                  <a
                    href="/details"
                    className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Add to cart
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Load More Button */}
        {visibleCount < products.length && (
          <div className="text-center p-8">
            <button
              onClick={handleLoadMore}
              className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Load More
            </button>
          </div>
        )}
      </div>
    </>
  );
}
