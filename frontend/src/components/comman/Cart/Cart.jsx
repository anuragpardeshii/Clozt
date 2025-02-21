import PriceDetails from "./PriceDetails";
import { useState, useEffect } from "react";
import axios from "axios";
import React from "react";

function Cart() {
  const [cart, setCart] = useState({ products: [], total: 0 });
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cart", {
          withCredentials: true,
        });
        setCart(response.data || { products: [], total: 0 });
      } catch (error) {
        console.error("Error fetching cart:", error.response ? error.response.data : error);
        setCart({ products: [], total: 0 });
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  const updateQuantity = async (productId, quantity) => {
    try {
      if (quantity === 0) {
        await axios.delete(`http://localhost:3000/api/cart/remove/${productId}`, {
          withCredentials: true,
        });
      } else {
        await axios.put(`http://localhost:3000/api/cart/update/${productId}`, { quantity }, {
          withCredentials: true,
        });
      }
      const response = await axios.get("http://localhost:3000/api/cart", { withCredentials: true });
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
        products: prevCart.products.filter((item) => item.product._id !== productId),
        total: prevCart.total,
      }));
    } catch (error) {
      console.error("Error removing item:", error);
    }
  };

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <>
      <div className="max-w-6xl mx-auto" style={{ maxWidth: "80rem", marginTop: "6rem" }}>
        <ol className="flex p-8 mb-4 items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
          <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500">
            <span className="flex items-center">Shopping Bag</span>
          </li>
          <li className="flex md:w-full items-center">
            <span className="flex items-center">2 Address Info</span>
          </li>
          <li className="flex items-center">3 Payment</li>
        </ol>

        {cart.products.length > 0 ? (
          <div className="relative mx-auto overflow-x-auto sm:rounded-lg">
            <table className="w-full text-sm text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th className="px-16 py-3">Image</th>
                  <th className="px-6 py-3">Product</th>
                  <th className="px-6 py-3">Qty</th>
                  <th className="px-6 py-3">Price</th>
                  <th className="px-6 py-3">Action</th>
                </tr>
              </thead>
              <tbody>
                {cart.products.map((item) => (
                  <tr
                    key={item.product._id}
                    className="bg-white text-center items-center border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <td className="p-4 flex items-center justify-center">
                      <img
                        src={item.product.images?.[0] || "https://via.placeholder.com/100"}
                        className="w-16 md:w-32 max-w-full max-h-full"
                        alt={item.product.title || "No Image"}
                      />
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      {item.product.title || "No Title"}
                    </td>
                    <td className="px-6 py-4">
                      <div className="flex items-center justify-center">
                        <button
                          className="p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                          onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                        >
                          -
                        </button>
                        <input
                          type="number"
                          value={item.quantity}
                          className="w-14 text-center border border-gray-300 rounded-lg"
                          readOnly
                        />
                        <button
                          className="p-1 text-gray-500 bg-white border border-gray-300 rounded-full hover:bg-gray-100"
                          onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                        >
                          +
                        </button>
                      </div>
                    </td>
                    <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
                      Rs. {item.product.price}
                    </td>
                    <td className="px-6 py-4">
                      <button
                        className="text-red-600 hover:underline"
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
          <h2 className="text-center text-gray-500 mt-4">Your cart is empty.</h2>
        )}

        <PriceDetails cart={cart} />
      </div>
    </>
  );
}

export default Cart;