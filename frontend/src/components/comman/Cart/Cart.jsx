import PriceDetails from "./PriceDetails";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../../../context/AuthContext"; // adjust path as needed

function Cart() {
  const [cart, setCart] = useState({ products: [], total: 0 });

  const { user, isAuthenticated, loading } = useAuth();

  if (loading) {
    return <p className="text-center">Checking authentication...</p>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cart", {
          withCredentials: true,
        });
        setCart(response.data || { products: [], total: 0 });
      } catch (error) {
        console.error(
          "Error fetching cart:",
          error.response ? error.response.data : error
        );
        setCart({ products: [], total: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  // Finally check if cart data is valid
  if (!cart || !cart.products) {
    return <p>Loading cart data...</p>;
  }

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity === 0) {
        await axios.delete(
          `http://localhost:3000/api/cart/remove/${productId}`,
          {
            withCredentials: true,
          }
        );
      } else {
        await axios.put(
          `http://localhost:3000/api/cart/update/${productId}`,
          { quantity },
          {
            withCredentials: true,
          }
        );
      }
      const response = await axios.get("http://localhost:3000/api/cart", {
        withCredentials: true,
      });
      setCart(response.data);
    } catch (error) {
      console.error("Error updating quantity:", error);
    }
  };

  const removeItem = async (productId) => {
    try {
      await axios.delete(`http://localhost:3000/api/cart/remove/${productId}`, {
        withCredentials: true,
      });
      setCart((prevCart) => ({
        products: prevCart.products.filter(
          (item) => item.product._id !== productId
        ),
        total: prevCart.total,
      }));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  return (
    <>
      <div className="max-w-6xl mx-auto px-4 py-10">
        {cart.products.length > 0 ? (
          <div className="relative mx-auto overflow-x-auto sm:rounded-lg border">
            <table className="w-full text-sm text-gray-600">
              <thead className="text-xs text-gray-700 uppercase bg-gray-100 border-b">
                <tr>
                  <th className="px-6 py-4 text-left">Image</th>
                  <th className="px-6 py-4 text-left">Product</th>
                  <th className="px-6 py-4 text-center">Qty</th>
                  <th className="px-6 py-4 text-right">Price</th>
                  <th className="px-6 py-4 text-center">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((item) => (
                  <tr
                    key={item.product._id}
                    className="bg-white border-b hover:bg-gray-50 transition"
                  >
                    <td className="p-4">
                      <img
                        src={
                          item.product.images?.[0] ||
                          "https://via.placeholder.com/100"
                        }
                        className="w-20 h-20 object-cover rounded-lg"
                        alt={item.product.title || "No Image"}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-800">
                      {item.product.title || "No Title"}
                    </td>
                    <td className="">
                      <div className="flex items-center justify-center">
                        <div className="flex items-center border border-gray-300 rounded-md overflow-hidden w-28">
                          <button
                            className="px-3 py-2 font-bold text-xl transition flex-1 flex justify-center"
                            onClick={() =>
                              updateQuantity(item.product._id, item.quantity - 1)
                            }
                          >
                            −
                          </button>
                          <span className="px-3 py-1 text-lg font-medium flex-1 text-center">
                            {item.quantity}
                          </span>
                          <button
                            className="px-3 py-2 font-bold text-xl transition flex-1 flex justify-center"
                            onClick={() =>
                              updateQuantity(item.product._id, item.quantity + 1)
                            }
                          >
                            +
                          </button>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-right font-medium text-gray-800">
                      ₹{item.product.price}
                    </td>
                    <td className="px-6 py-4 text-center">
                      <button
                        className="text-red-500 hover:underline font-medium"
                        onClick={() => removeItem(item.product._id)}
                      >
                        Remove
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <div className="flex flex-col items-center justify-center py-20">
            <div className="bg-red-50 rounded-full p-8 mb-6">
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="100"
                height="100"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="1"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="text-red-400 animate-pulse"
              >
                <circle cx="8" cy="21" r="1"></circle>
                <circle cx="19" cy="21" r="1"></circle>
                <path d="M2.05 2.05h2l2.66 12.42a2 2 0 0 0 2 1.58h9.78a2 2 0 0 0 1.95-1.57l1.65-7.43H5.12"></path>
              </svg>
            </div>
            <h2 className="text-2xl font-semibold text-gray-800 mb-4">
              Your cart is empty
            </h2>
            <p className="text-gray-500 text-center max-w-md mb-8">
              Looks like you haven’t added anything yet. Start shopping and fill
              your cart with happiness!
            </p>
            <a
              href="/"
              className="bg-red-600 text-white px-6 py-3 rounded-md font-semibold hover:bg-red-700 transition"
            >
              Continue Shopping
            </a>
          </div>
        )}

        {/* Place PriceDetails below or beside depending on layout */}
        <div className="mt-10">
          <PriceDetails cart={cart} />
        </div>
      </div>
    </>
  );
}

export default Cart;
