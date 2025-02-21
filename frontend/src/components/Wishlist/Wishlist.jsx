import { useState, useEffect } from "react";
import axios from "axios";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);

  const fetchWishlist = async () => {
    try {
      const response = await axios.get("http://localhost:3000/api/wishlist", {
        withCredentials: true,
      });
  
      console.log("Fetched wishlist response:", response.data); // Debug API response
  
      // Ensure response structure is correct
      if (!response.data || !response.data.wishlist || !response.data.wishlist.products) {
        console.error("Invalid wishlist response structure:", response.data);
        setWishlist([]); // Set wishlist to an empty array to prevent errors
        return;
      }
  
      // Extract products and ensure images exist
      const updatedWishlist = response.data.wishlist.products.map((product) => ({
        ...product,
        image: product.images?.[0] || "", // Handle missing images
      }));
  
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
      await axios.delete(`http://localhost:3000/api/wishlist/remove/${productId}`, {
        withCredentials: true,
      });
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
      <h1 className="text-3xl font-bold text-center my-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow">
              <img
                className="p-4 rounded-t-lg w-full h-[350px] object-cover"
                src={product.image}  
                alt={product.title || "Product Image"} 
              />
              <div className="px-5 pb-5">
                <h5 className="text-md font-semibold">{product.title}</h5>
                <p className="text-gray-600 text-sm">{product.description}</p>
                <p className="text-lg font-bold">₹{product.price}</p>
                <div className="flex justify-between space-x-2 mt-3">
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
                    Remove ❌
                  </button>
                </div>
              </div>
            </div>
          ))
        ) : (
          <p className="text-center text-gray-500">Your wishlist is empty.</p>
        )}
      </div>
    </div>
  );
}
