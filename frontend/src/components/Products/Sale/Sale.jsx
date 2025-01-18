import { useState } from "react";

// Import all product images
import img1 from "/src/assets/Products/Men/1.jpeg";
import img2 from "/src/assets/Products/Men/2.jpeg";
import img3 from "/src/assets/Products/Men/3.jpeg";
import img4 from "/src/assets/Products/Men/4.jpeg";
import img5 from "/src/assets/Products/Men/5.jpeg";
import img6 from "/src/assets/Products/Men/6.jpeg";
import img7 from "/src/assets/Products/Men/7.jpeg";
import img8 from "/src/assets/Products/Men/8.jpeg";
import img9 from "/src/assets/Products/Men/9.jpeg";
import img10 from "/src/assets/Products/Men/10.jpeg";
import img11 from "/src/assets/Products/Men/11.jpeg";
import img12 from "/src/assets/Products/Men/12.jpeg";
import img13 from "/src/assets/Products/Men/13.jpeg";
import img14 from "/src/assets/Products/Men/14.jpeg";
import img15 from "/src/assets/Products/Men/15.jpeg";
import img16 from "/src/assets/Products/Men/16.jpeg";
import img19 from "/src/assets/Products/Men/19.jpeg";
import img20 from "/src/assets/Products/Men/20.jpeg";

// Import video
import menVideo from "/src/assets/Videos/men.mp4";

export default function Sale() {
  const products = [
    { id: 1, title: "Black Oversized Butterfly Tee", price: 999, image: img1, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 2, title: "Black Oversized Butterfly Tee", price: 999, image: img2, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 3, title: "Black Oversized Butterfly Tee", price: 999, image: img3, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 4, title: "Black Oversized Butterfly Tee", price: 999, image: img4, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 5, title: "Black Oversized Butterfly Tee", price: 999, image: img5, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 6, title: "Black Oversized Butterfly Tee", price: 999, image: img6, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 7, title: "Black Oversized Butterfly Tee", price: 999, image: img7, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 8, title: "Black Oversized Butterfly Tee", price: 999, image: img8, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 9, title: "Black Oversized Butterfly Tee", price: 999, image: img9, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 10, title: "Black Oversized Butterfly Tee", price: 999, image: img10, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 11, title: "Black Oversized Butterfly Tee", price: 999, image: img11, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 12, title: "Black Oversized Butterfly Tee", price: 999, image: img12, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 13, title: "Black Oversized Butterfly Tee", price: 999, image: img13, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 14, title: "Black Oversized Butterfly Tee", price: 999, image: img14, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 15, title: "Black Oversized Butterfly Tee", price: 999, image: img15, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 16, title: "Black Oversized Butterfly Tee", price: 999, image: img16, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 19, title: "Black Oversized Butterfly Tee", price: 999, image: img19, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
    { id: 20, title: "Black Oversized Butterfly Tee", price: 999, image: img20, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  ];

  const [visibleCount, setVisibleCount] = useState(10);

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <>
      <div className="mx-auto px-8" style={{ maxWidth: "82rem" }}>
        <div className="relative rounded-lg mx-auto" style={{ marginTop: "6rem", height: "22rem", marginBottom: "1.5rem", overflow: "hidden" }}>
          <video autoPlay loop muted playsInline className="absolute top-0 left-0 w-full h-full object-cover">
            <source src="https://videos.pexels.com/video-files/6120789/6120789-uhd_2732_1440_25fps.mp4" type="video/mp4" />
            Your browser does not support the video tag.
          </video>
          <div className="relative z-10 flex flex-col gap-8 justify-center" style={{ height: "22rem" }}>
            <h1 className="mb-4 font-extrabold text-white text-3xl text-center lg:text-6xl">Sale is live</h1>
          </div>
          <div className="absolute top-0 left-0 w-full h-full bg-black opacity-50" style={{ zIndex: 5 }}></div>
        </div>

        {/* Buttons */}
        <div className="pb-4 mb-4">
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
          {products.slice(0, visibleCount).map((product) => (
            <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
            <img className="p-4 rounded-t-lg" src={product.image} alt={product.title} />
            <div className="px-5 pb-5">
              <h5 className="text-md font-semibold text-gray-900 dark:text-white">{product.title}</h5>
              <div className="flex items-center mt-2.5">
                {/* Rating code */}
                </div>
              <div className="flex items-center justify-between">
                <span className="text-lg font-bold text-gray-900 dark:text-white">₹{product.price}</span>
                <a
                  href="/details"
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
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
