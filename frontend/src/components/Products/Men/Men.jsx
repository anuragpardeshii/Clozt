import { useState, useEffect, useRef, useCallback } from "react";
import axios from "axios";
import { useNavigate, Link } from "react-router-dom";
import menVideo from "/src/assets/Videos/men.mp4";

export default function Men() {
  const navigate = useNavigate();
  const [products, setProducts] = useState([]);
  const [filteredProducts, setFilteredProducts] = useState([]);
  const [visibleCount, setVisibleCount] = useState(10);
  const [sortDropdownOpen, setSortDropdownOpen] = useState(false);
  const [categoryDropdownOpen, setCategoryDropdownOpen] = useState(false);
  const [selectedCategory, setSelectedCategory] = useState(null);
  const [sortOrder, setSortOrder] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [actionLoading, setActionLoading] = useState({ type: null, id: null });
  const sortRef = useRef(null);
  const categoryRef = useRef(null);

  // Close dropdowns when clicking outside
  useEffect(() => {
    function handleClickOutside(event) {
      if (sortRef.current && !sortRef.current.contains(event.target)) {
        setSortDropdownOpen(false);
      }
      if (categoryRef.current && !categoryRef.current.contains(event.target)) {
        setCategoryDropdownOpen(false);
      }
    }
    
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Fetch products
  useEffect(() => {
    const fetchProducts = async () => {
      setIsLoading(true);
      try {
        const response = await axios.get("https://clozt-backend.vercel.app/api/products");
        const maleProducts = response.data.filter((product) => product.gender === "Male");
        setProducts(maleProducts);
        setFilteredProducts(maleProducts);
      } catch (error) {
        console.error("Error fetching products:", error);
      } finally {
        setIsLoading(false);
      }
    };
    fetchProducts();
  }, []);

  // Apply filters and sorting - memoized with useCallback
  const applyFiltersAndSort = useCallback(() => {
    let result = [...products];
    
    // Apply category filter
    if (selectedCategory) {
      result = result.filter(product => 
        product.category && product.category.toLowerCase().includes(selectedCategory.toLowerCase())
      );
    }
    
    // Apply sorting
    if (sortOrder === 'lowToHigh') {
      result.sort((a, b) => a.price - b.price);
    } else if (sortOrder === 'highToLow') {
      result.sort((a, b) => b.price - a.price);
    }
    
    setFilteredProducts(result);
  }, [products, selectedCategory, sortOrder]);

  // Apply filters and sorting when dependencies change
  useEffect(() => {
    applyFiltersAndSort();
  }, [applyFiltersAndSort]);

  const handleSortChange = (order) => {
    setSortOrder(order);
    setSortDropdownOpen(false);
  };

  const handleCategoryChange = (category) => {
    setSelectedCategory(category);
    setCategoryDropdownOpen(false);
  };

  const handleProductClick = (productId) => {
    navigate(`/product/${productId}`);
  };

  const handleAddToWishlist = async (e, product) => {
    e.stopPropagation(); // Prevent product click event
    
    if (!product || !product._id) {
      console.error("Invalid product data", product);
      return;
    }

    setActionLoading({ type: 'wishlist', id: product._id });
    
    try {
      await axios.post(
        "https://clozt-backend.vercel.app/api/wishlist/add",
        { productId: product._id },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(
        "Error adding to wishlist:",
        error.response?.data || error.message
      );
    } finally {
      setActionLoading({ type: null, id: null });
    }
  };

  const handleAddToCart = async (e, productId) => {
    e.stopPropagation(); // Prevent product click event
    
    setActionLoading({ type: 'cart', id: productId });
    
    try {
      await axios.post(
        "https://clozt-backend.vercel.app/api/cart/add",
        { productId },
        { withCredentials: true }
      );
    } catch (error) {
      console.error(
        "Error adding to cart:",
        error.response?.data || error.message
      );
    } finally {
      setActionLoading({ type: null, id: null });
    }
  };

  const handleLoadMore = () => {
    setVisibleCount((prevCount) => prevCount + 10);
  };

  return (
    <div className="mx-auto px-8" style={{ maxWidth: "90rem" }}>
      {/* Video Section - unchanged */}
      <div
        className="relative rounded-lg mx-auto my-4"
        style={{
          height: "22rem",
          marginBottom: "1.5rem",
          overflow: "hidden",
        }}
      >
        {/* Video content unchanged */}
        <video
          autoPlay
          loop
          muted
          playsInline
          className="absolute top-0 left-0 w-full h-full object-cover"
        >
          <source src={menVideo} type="video/mp4" />
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

      {/* Product Categories - breadcrumb and filters */}
      <div className="flex justify-between flex-wrap items-center pb-4 mb-4 border-b-2 border-gray-100">
        {/* Breadcrumb navigation - unchanged */}
        <div>
          <nav className="flex" aria-label="Breadcrumb">
            <ol className="inline-flex items-center space-x-1 md:space-x-2 rtl:space-x-reverse">
              <li className="inline-flex items-center">
                <Link
                  to="/"
                  className="inline-flex items-center text-sm font-medium text-gray-700 hover:text-red-600 dark:text-gray-400 dark:hover:text-white"
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
                    to="/Men"
                    className="ms-1 capitalize text-sm font-medium text-gray-700 hover:text-red-600 md:ms-2 dark:text-gray-400 dark:hover:text-white"
                  >
                    Men
                  </Link>
                </div>
              </li>
            </ol>
          </nav>
        </div>
        
        {/* Filter dropdowns */}
        <div className="flex justify-center flex-wrap gap-2">
          {/* Sort Dropdown */}
          <div className="relative" ref={sortRef}>
            <button
              onClick={() => setSortDropdownOpen(!sortDropdownOpen)}
              className="text-white bg-black hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              {sortOrder === 'lowToHigh' ? 'Price: Low to High' : 
               sortOrder === 'highToLow' ? 'Price: High to Low' : 'Sort by'}
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
            {sortDropdownOpen && (
              <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleSortChange('lowToHigh')}
                    >
                      Low to High
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleSortChange('highToLow')}
                    >
                      High to low
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>

          {/* Category Dropdown */}
          <div className="relative" ref={categoryRef}>
            <button
              onClick={() => setCategoryDropdownOpen(!categoryDropdownOpen)}
              className="text-white bg-black hover:bg-zinc-700 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center inline-flex items-center"
              type="button"
            >
              {selectedCategory ? `Category: ${selectedCategory}` : 'Category'}
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
            {categoryDropdownOpen && (
              <div className="absolute z-10 bg-white divide-y divide-gray-100 rounded-lg shadow-sm w-44 dark:bg-gray-700">
                <ul className="py-2 text-sm text-gray-700 dark:text-gray-200">
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleCategoryChange(null)}
                    >
                      All Categories
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleCategoryChange('Top')}
                    >
                      Tshirt
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleCategoryChange('shirt')}
                    >
                      Shirt
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleCategoryChange('denim')}
                    >
                      Denim
                    </button>
                  </li>
                  <li>
                    <button
                      className="block w-full text-left px-4 py-2 hover:bg-gray-100 dark:hover:bg-gray-600 dark:hover:text-white"
                      onClick={() => handleCategoryChange('winter')}
                    >
                      Winter Wear
                    </button>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Loading State */}
      {isLoading ? (
        <div className="flex justify-center items-center h-64">
          <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-gray-900"></div>
        </div>
      ) : filteredProducts.length === 0 ? (
        <div className="text-center py-10">
          <h3 className="text-xl font-medium">No products found</h3>
          <p className="text-gray-500 mt-2">Try changing your filters or check back later</p>
        </div>
      ) : (
        <>
          {/* Product Cards */}
          <div className="grid sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 xl:grid-cols-5 gap-8 mb-8">
            {filteredProducts.slice(0, visibleCount).map((product) => (
              <div
                key={product._id}
                onClick={() => handleProductClick(product._id)}
                className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 hover:shadow-lg transition-shadow duration-300 flex flex-col h-full cursor-pointer"
              >
                <div className="p-4 flex-shrink-0">
                  <img
                    className="rounded-t-lg w-full h-[300px] object-cover object-center group-hover:scale-105 transition-transform duration-500"
                    src={product.images?.[0] || "https://via.placeholder.com/300"}
                    alt={product.title}
                    loading="lazy"
                  />
                </div>
                <div className="px-5 pb-5 flex flex-col flex-grow justify-between">
                  <div className="text-center">
                    <h5 className="text-md font-semibold text-gray-900 dark:text-white mb-2">
                      {product.title}
                    </h5>
                    <p className="text-lg font-bold text-gray-900 dark:text-white">
                      ₹{product.price}
                    </p>
                  </div>
                  <div className="flex gap-4 mt-4 justify-around">
                    <button
                      onClick={(e) => handleAddToCart(e, product._id)}
                      disabled={actionLoading.type === 'cart' && actionLoading.id === product._id}
                      className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800 disabled:opacity-70"
                    >
                      {actionLoading.type === 'cart' && actionLoading.id === product._id ? 
                        'Adding...' : 'Add to cart'}
                    </button>
                    <button
                      onClick={(e) => handleAddToWishlist(e, product)}
                      disabled={actionLoading.type === 'wishlist' && actionLoading.id === product._id}
                      className="text-white bg-red-500 hover:bg-red-600 px-4 py-2 rounded-lg font-medium text-sm disabled:opacity-70"
                    >
                      {actionLoading.type === 'wishlist' && actionLoading.id === product._id ? 
                        'Adding...' : 'Wishlist'}
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          {/* Load More Button */}
          {visibleCount < filteredProducts.length && (
            <div className="text-center p-8">
              <button
                onClick={handleLoadMore}
                className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Load More
              </button>
            </div>
          )}
        </>
      )}
    </div>
  );
}
