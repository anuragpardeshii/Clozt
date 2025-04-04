import { useState, useEffect } from "react";
import axios from "axios";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const { user, isAuthenticated, loading } = useAuth();

if (loading) {
  return <p className="text-center">Checking authentication...</p>;
}

if (!isAuthenticated) {
  return <Navigate to="/login" />;
}

  const fetchWishlist = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/wishlist", {
        withCredentials: true,
      });

      console.log("Fetched wishlist response:", response.data); // Debug API response

      // Ensure response structure is correct
      if (
        !response.data ||
        !response.data.wishlist ||
        !response.data.wishlist.products
      ) {
        console.error("Invalid wishlist response structure:", response.data);
        setWishlist([]); // Set wishlist to an empty array to prevent errors
        return;
      }

      // Extract products and ensure images exist
      const updatedWishlist = response.data.wishlist.products.map(
        (product) => ({
          ...product,
          image: product.images?.[0] || "", // Handle missing images
        })
      );

      setWishlist(updatedWishlist);
    } catch (error) {
      console.error(
        "Error fetching wishlist:",
        error.response ? error.response.data : error.message
      );
    }
  };

  useEffect(() => {
    fetchWishlist();
  }, []);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      await axios.delete(
        `http://localhost:3000/api/wishlist/remove/${productId}`,
        {
          withCredentials: true,
        }
      );
      fetchWishlist(); // Refresh wishlist after removal
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  const handleAddToCart = async (productId) => {
    try {
      await axios.post(
        "http://localhost:3000/api/cart/add",
        { productId, quantity: 1 },
        { withCredentials: true }
      );
      console.log("Added to cart");
    } catch (error) {
      console.error("Error adding to cart:", error);
    }
  };

  return (
    <div className="mx-auto px-8">
      {/* <h1 className="text-3xl font-bold text-center my-6">Your Wishlist</h1> */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-4 mb-8">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div
              key={product._id}
              className="bg-white text-center border border-gray-200 rounded-lg shadow"
            >
              <img
                className="p-4 rounded-t-lg w-full h-[350px] object-cover"
                src={product.image}
                alt={product.title || "Product Image"}
              />
              <div className="px-5 pb-5 text-center">
                <h5 className="text-md font-semibold">{product.title}</h5>
                {/* <p className="text-gray-600 text-sm">{product.description}</p> */}
                <p className="text-lg font-bold">₹{product.price}</p>
                <div className="flex justify-around space-x-2 mt-3">
                  <button
                    onClick={() => handleAddToCart(product._id)}
                    className="text-white bg-gray-800 px-4 py-2 rounded-lg"
                  >
                    Add to Cart
                  </button>
                  <button
                    onClick={() => handleRemoveFromWishlist(product._id)}
                    className="text-white bg-red-500 px-4 py-2 rounded-lg"
                  >
                    Remove
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <div className="col-span-full flex flex-col items-center justify-center py-12">
            <div className="w-32 h-32 border-4 border-gray-200 rounded-full flex items-center justify-center mb-6">
              <svg xmlns="http://www.w3.org/2000/svg" className="h-20 w-20 text-gray-200" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M3.172 5.172a4 4 0 015.656 0L10 6.343l1.172-1.171a4 4 0 115.656 5.656L10 17.657l-6.828-6.829a4 4 0 010-5.656z" clipRule="evenodd" />
              </svg>
            </div>
            <h2 className="text-3xl font-bold text-gray-800 mb-4">Wishlist is empty.</h2>
            <p className="text-gray-500 mb-2">You don't have any products in your wishlist yet.</p>
            <p className="text-gray-500 mb-6">You will find many interesting products on the "Shopping" page.</p>
            <a href="/" className="bg-red-600 text-white px-8 py-3 uppercase font-medium hover:bg-red-700 rounded-lg transition-colors">
              Return to shop
            </a>
          </div>
        )}
      </div>
    </div>
  );
}
