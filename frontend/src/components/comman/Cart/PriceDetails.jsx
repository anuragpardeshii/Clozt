import React from "react";
import axios from "axios";

function PriceDetails({ cart }) {
  if (!cart || cart.products.length === 0) return null;

  // Calculate total price and total quantity
  const totalPrice = cart.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalQty = cart.products.reduce((sum, item) => sum + item.quantity, 0);

  const handlePayment = async () => {
    try {
      // Step 1: Create an order on your backend
      const orderResponse = await axios.post(
        "http://localhost:3000/api/payment/create-order",
        {
          amount: totalPrice * 100, // Razorpay expects amount in paise
          currency: "INR",
        },
        { withCredentials: true }
      );

      const options = {
        key: "rzp_test_YOUR_KEY_ID", // Replace with your Razorpay key ID
        amount: totalPrice * 100,
        currency: "INR",
        name: "Clozt",
        description: "Payment for your order",
        order_id: orderResponse.data.id,
        handler: async function (response) {
          // Handle successful payment
          try {
            const paymentVerification = await axios.post(
              "http://localhost:3000/api/payment/verify",
              {
                razorpay_order_id: response.razorpay_order_id,
                razorpay_payment_id: response.razorpay_payment_id,
                razorpay_signature: response.razorpay_signature,
              },
              { withCredentials: true }
            );
            
            if (paymentVerification.data.success) {
              // Create the order in your database
              await axios.post(
                "http://localhost:3000/api/orders/create",
                { paymentId: response.razorpay_payment_id },
                { withCredentials: true }
              );
              
              alert("Payment successful! Your order has been placed.");
              window.location.href = "/orders"; // Redirect to orders page
            }
          } catch (error) {
            console.error("Payment verification failed:", error);
            alert("Payment verification failed. Please contact support.");
          }
        },
        prefill: {
          name: "Customer Name",
          email: "customer@example.com",
          contact: "9999999999",
        },
        theme: {
          color: "#DC2626", // Red color to match your button
        },
      };

      // Initialize Razorpay
      const razorpay = new window.Razorpay(options);
      razorpay.open();
    } catch (error) {
      console.error("Error creating order:", error);
      alert("Could not process payment. Please try again.");
    }
  };

  return (
    <div className="flex flex-wrap">
      <div className="relative mx-auto overflow-x-auto w-full border rounded-lg">
        <table className="w-full text-sm text-left text-gray-500 bg-white">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3">Price</th>
            </tr>
          </thead>
          <tbody>
            {cart.products.map((item) => (
              <tr key={item.product._id} className="border-b">
                <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">
                  {item.product.title}
                </th>
                <td className="px-6 py-4">{item.quantity}</td>
                <td className="px-6 py-4">₹{item.product.price * item.quantity}</td>
              </tr>
            ))}
            <tr className="border-t">
              <th scope="row" className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap">Shipping Fee</th>
              <td className="px-6 py-4"></td>
              <td className="px-6 py-4">Free</td>
            </tr>
          </tbody>
          <tfoot>
            <tr className="font-semibold text-gray-900 bg-gray-100">
              <th scope="row" className="px-6 py-3 text-base">Total Amount</th>
              <td className="px-6 py-3">{totalQty}</td>
              <td className="px-6 py-3">₹{totalPrice}</td>
            </tr>
          </tfoot>
        </table>
      </div>

      <div className="w-full text-center p-4 text-md text-gray-700 bg-gray-100 border-t rounded-md my-4">
        <p className="mx-auto">By placing the order, you agree to Clozt's Terms of Use and Privacy Policy.</p>
      </div>
      <div className="mx-auto">
        <button 
          className="w-full mt-4 text-lg bg-red-600 text-white py-2 px-4 rounded-lg hover:bg-red-700"
          onClick={handlePayment}
        >
          Place Your Order
        </button>
      </div>
    </div>
  );
}

export default PriceDetails;