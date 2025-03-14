import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";

// // Import all product images
// import img1 from "/src/assets/Products/Men/1.jpeg";
// import img2 from "/src/assets/Products/Men/2.jpeg";
// import img3 from "/src/assets/Products/Men/3.jpeg";
// import img4 from "/src/assets/Products/Men/4.jpeg";
// import img5 from "/src/assets/Products/Men/5.jpeg";
// import img6 from "/src/assets/Products/Men/6.jpeg";
// import img7 from "/src/assets/Products/Men/7.jpeg";
// import img8 from "/src/assets/Products/Men/8.jpeg";
// import img9 from "/src/assets/Products/Men/9.jpeg";
// import img10 from "/src/assets/Products/Men/10.jpeg";
// import img11 from "/src/assets/Products/Men/11.jpeg";
// import img12 from "/src/assets/Products/Men/12.jpeg";
// import img13 from "/src/assets/Products/Men/13.jpeg";
// import img14 from "/src/assets/Products/Men/14.jpeg";
// import img15 from "/src/assets/Products/Men/15.jpeg";
// import img16 from "/src/assets/Products/Men/16.jpeg";
// import img19 from "/src/assets/Products/Men/19.jpeg";
// import img20 from "/src/assets/Products/Men/20.jpeg";

// Import video
// import womenVideo from "https://videos.pexels.com/video-files/5699614/5699614-uhd_2560_1440_24fps.mp4";
{/* <source src="https://videos.pexels.com/video-files/5699614/5699614-uhd_2560_1440_24fps.mp4" type="video/mp4" /> */}
export default function Women() {
  // const products = [
  //   { id: 1, title: "Black Oversized Butterfly Tee", price: 999, image: img1, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 2, title: "Black Oversized Butterfly Tee", price: 999, image: img2, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 3, title: "Black Oversized Butterfly Tee", price: 999, image: img3, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 4, title: "Black Oversized Butterfly Tee", price: 999, image: img4, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 5, title: "Black Oversized Butterfly Tee", price: 999, image: img5, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 6, title: "Black Oversized Butterfly Tee", price: 999, image: img6, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 7, title: "Black Oversized Butterfly Tee", price: 999, image: img7, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 8, title: "Black Oversized Butterfly Tee", price: 999, image: img8, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 9, title: "Black Oversized Butterfly Tee", price: 999, image: img9, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 10, title: "Black Oversized Butterfly Tee", price: 999, image: img10, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 11, title: "Black Oversized Butterfly Tee", price: 999, image: img11, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 12, title: "Black Oversized Butterfly Tee", price: 999, image: img12, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 13, title: "Black Oversized Butterfly Tee", price: 999, image: img13, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 14, title: "Black Oversized Butterfly Tee", price: 999, image: img14, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 15, title: "Black Oversized Butterfly Tee", price: 999, image: img15, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 16, title: "Black Oversized Butterfly Tee", price: 999, image: img16, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 19, title: "Black Oversized Butterfly Tee", price: 999, image: img19, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  //   { id: 20, title: "Black Oversized Butterfly Tee", price: 999, image: img20, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
  // ];
  const navigate = useNavigate();
  const [error, setError] = useState(""); 
  const [products, setProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products/women"); // Correct API URL
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
        setError("Failed to fetch products."); // Fix: Use setError properly
      }
    };
    fetchProducts();
  }, []);
  
  const handleAddToWishlist = async (product) => {
    console.log("Product Data:", product); // ✅ Debugging
  
    if (!product || !product._id) {
      console.error("Invalid product data", product);
      return;
    }
  
    try {
      console.log("Sending request with productId:", product._id);
  
      const response = await axios.post(
        "http://localhost:3000/api/wishlist/add",
        { productId: product._id },
        { withCredentials: true } // ✅ Ensures cookies are sent
      );
  
      console.log("Added to wishlist:", response.data);
    } catch (error) {
      console.error("Error adding to wishlist:", error.response?.data || error.message);
    }
  };  

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="mx-auto px-8" style={{ maxWidth: "90rem" }}>
      {/* Video Section */}
      <div
        className="relative rounded-lg mx-auto"
        style={{
          marginTop: "6rem",
          height: "22rem",
          marginBottom: "1.5rem",
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
          <source src="https://videos.pexels.com/video-files/5699614/5699614-uhd_2560_1440_24fps.mp4" type="video/mp4" />
          Your browser does not support the video tag.
        </video>
        <div
          className="relative z-10 flex flex-col gap-8 justify-center"
          style={{ height: "22rem" }}
        >
          <h1 className="mb-4 font-extrabold text-white text-3xl text-center lg:text-6xl">
            Women's Fashion
          </h1>
        </div>
        <div
          className="absolute top-0 left-0 w-full h-full bg-black opacity-50"
          style={{ zIndex: 5 }}
        ></div>
      </div>

      {/* Product Categories */}
      <div className="flex justify-between flex-wrap items-center pb-4 mb-4 border-b-2 border-gray-100">
        <div>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-blue-600 dark:text-gray-400 dark:hover:text-white"
                >
                  <svg
                    className="w-3 h-3 me-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="m19.707 9.293-2-2-7-7a1 1 0 0 0-1.414 0l-7 7-2 2a1 1 0 0 0 1.414 1.414L2 10.414V18a2 2 0 0 0 2 2h3a1 1 0 0 0 1-1v-4a1 1 0 0 1 1-1h2a1 1 0 0 1 1 1v4a1 1 0 0 0 1 1h3a2 2 0 0 0 2-2v-7.586l.293.293a1 1 0 0 0 1.414-1.414Z" />
                  </svg>
                  Home
                </Link>
              </li>
              <li>
                <div className="flex items-center">
                  <svg
                    className="rtl:rotate-180 w-3 h-3 text-gray-400 mx-1"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 6 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 9 4-4-4-4"
                    />
                  </svg>
                  <Link
                    to="/Women"
                    className="ms-1 capitalize text-sm font-medium text-gray-700 hover:text-blue-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Women
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        <div className="flex justify-center flex-wrap gap-2">
          {/* First Dropdown */}
          <button
            id="dropdownDelayButton"
            data-dropdown-toggle="dropdownDelay"
            data-dropdown-delay="500"
            data-dropdown-trigger="hover"
            className="text-white bg-black hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Sort by
            <svg
              className="w-2.5 h-2.5 ms-3"
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
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          <div
            id="dropdownDelay"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDelayButton"
            >
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Low to High
                </a>
              </li>
              <li>
                <a
                  href="#"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  High to low
                </a>
              </li>
            </ul>
          </div>

          {/* Second Dropdown */}
          <button
            id="dropdownDelayButton1"
            data-dropdown-toggle="dropdownDelay1"
            data-dropdown-delay="500"
            data-dropdown-trigger="hover"
            className="text-white bg-black hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            type="button"
          >
            Category
            <svg
              className="w-2.5 h-2.5 ms-3"
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
                d="m1 1 4 4 4-4"
              />
            </svg>
          </button>

          {/* Dropdown menu */}
          <div
            id="dropdownDelay1"
            className="z-10 hidden bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700"
          >
            <ul
              className="py-2 text-sm text-gray-700 dark:text-gray-200"
              aria-labelledby="dropdownDelayButton1"
            >
              <li>
                <a
                  href="/women/top"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Tshirt
                </a>
              </li>
              <li>
                <a
                  href="/women/shirt"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Shirt
                </a>
              </li>
              <li>
                <a
                  href="/women/denim"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Denim
                </a>
              </li>
              <li>
                <a
                  href="/women/winter"
                  className="block px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                >
                  Winter Wear
                </a>
              </li>
            </ul>
          </div>
        </div>
        {/* 
        <hr className="my-4" /> */}
      </div>

      {/* Product Cards */}
      <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-8">
        {products.slice(0, visibleCount).map((product) => (
          <div
            key={product._id}
            className="bg-white border border-gray-200 rounded-lg items-around justify-between shadow dark:bg-gray-800 dark:border-gray-700"
            style={{ display: "flex", flexDirection: "column" }}
          >
            <img
              className="p-4 rounded-t-lg w-full  h-[350px] bg-cover bg-center group-hover:scale-105 transition-transform duration-500"
              src={product.images?.[0] || "https://via.placeholder.com/300"}
              alt={product.title}
            />
            <div className="px-5 pb-5 flex flex-col justify-around items-center">
              <h5 className="text-md text-center font-semibold text-gray-900 dark:text-white">
                {product.title}
              </h5>
              <div className="flex items-center mt-2.5">{/* Rating */}</div>
              <p className="text-lg text-center font-bold text-gray-900 dark:text-white">
                ₹{product.price}
              </p>
              <div className="flex gap-4 mt-4 justify-around flex-wrap">
                <button
                  onClick={() => handleAddToCart(product._id)}
                  className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Add to cart
                </button>
                <button
                  key={product._id}
                  onClick={() => handleAddToWishlist(product)}
                  className="text-white bg-red-500 px-4 py-2 rounded-lg"
                >
                  Wishlist
                </button>
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
  );
}
