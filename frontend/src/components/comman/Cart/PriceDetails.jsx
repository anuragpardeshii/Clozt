import React from "react";

function PriceDetails({ cart }) {
  if (!cart || cart.products.length === 0) return null;

  // Calculate total price and total quantity
  const totalPrice = cart.products.reduce((sum, item) => sum + item.product.price * item.quantity, 0);
  const totalQty = cart.products.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <div className="flex flex-wrap">
      <div className="relative mx-auto p-4 overflow-x-auto w-full">
        <table className="w-full text-sm text-left text-gray-500 bg-white border rounded-lg shadow-md">
          <thead className="text-xs text-gray-700 uppercase bg-gray-100">
            <tr>
              <th scope="col" className="px-6 py-3 rounded-s-lg">Product</th>
              <th scope="col" className="px-6 py-3">Qty</th>
              <th scope="col" className="px-6 py-3 rounded-e-lg">Price</th>
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

      <div className="w-full p-4 text-md text-gray-700 bg-gray-100 border-t">
        <p>By placing the order, you agree to Clozt's Terms of Use and Privacy Policy.</p>
      </div>

      <button className="w-full mt-4 bg-blue-600 text-white py-2 rounded-lg hover:bg-blue-700">
        Place Your Order
      </button>
    </div>
  );
}

export default PriceDetails;
