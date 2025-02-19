// import PriceDetails from "./PriceDetails";
// import img1 from "/src/assets/Products/Men/1.jpeg";
// import img2 from "/src/assets/Products/Men/2.jpeg";
// import img3 from "/src/assets/Products/Men/3.jpeg";
// import React from "react";

// function Cart() {
//   return (
//     <>
//       <div
//         className="max-w-6xl mx-auto"
//         style={{ maxWidth: "80rem", marginTop: "6rem" }}
//       >
//         <ol className="flex p-8 mb-4 items-center w-full text-sm font-medium text-center text-gray-500 dark:text-gray-400 sm:text-base">
//           <li className="flex md:w-full items-center text-blue-600 dark:text-blue-500 sm:after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
//             <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
//               <svg
//                 className="w-3.5 h-3.5 sm:w-4 sm:h-4 me-2.5"
//                 aria-hidden="true"
//                 xmlns="http://www.w3.org/2000/svg"
//                 fill="currentColor"
//                 viewBox="0 0 20 20"
//               >
//                 <path d="M10 .5a9.5 9.5 0 1 0 9.5 9.5A9.51 9.51 0 0 0 10 .5Zm3.707 8.207-4 4a1 1 0 0 1-1.414 0l-2-2a1 1 0 0 1 1.414-1.414L9 10.586l3.293-3.293a1 1 0 0 1 1.414 1.414Z" />
//               </svg>
//               Shopping {" "}
//               <span className="hidden sm:inline-flex sm:ms-2">bag</span>
//             </span>
//           </li>
//           <li className="flex md:w-full items-center after:content-[''] after:w-full after:h-1 after:border-b after:border-gray-200 after:border-1 after:hidden sm:after:inline-block after:mx-6 xl:after:mx-10 dark:after:border-gray-700">
//             <span className="flex items-center after:content-['/'] sm:after:hidden after:mx-2 after:text-gray-200 dark:after:text-gray-500">
//               <span className="me-2">2</span>
//               Address{" "}
//               <span className="hidden sm:inline-flex sm:ms-2">Info</span>
//             </span>
//           </li>
//           <li className="flex items-center">
//             <span className="me-2">3</span>
//             Payment
//           </li>
//         </ol>

//         <div className="relative mx-auto overflow-x-auto sm:rounded-lg">
//           <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
//             <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
//               <tr>
//                 <th scope="col" className="px-16 py-3">
//                   <span className="sr-only">Image</span>
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Product
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Qty
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Price
//                 </th>
//                 <th scope="col" className="px-6 py-3">
//                   Action
//                 </th>
//               </tr>
//             </thead>
//             <tbody>
//               <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td className="p-4">
//                   <img
//                     src={img1}
//                     className="w-16 md:w-32 max-w-full max-h-full"
//                     alt="t-shirt"
//                   />
//                 </td>
//                 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                 Black Oversized Butterfly Tee
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     <button
//                       className="inline-flex items-center justify-center p-1 me-3 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//                       type="button"
//                     >
//                       <span className="sr-only">Quantity button</span>
//                       <svg
//                         className="w-3 h-3"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 18 2"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M1 1h16"
//                         />
//                       </svg>
//                     </button>
//                     <div>
//                       <input
//                         type="number"
//                         id="first_product"
//                         className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="1"
//                         required
//                       />
//                     </div>
//                     <button
//                       className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//                       type="button"
//                     >
//                       <span className="sr-only">Quantity button</span>
//                       <svg
//                         className="w-3 h-3"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 18 18"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M9 1v16M1 9h16"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                   Rs. 999
//                 </td>
//                 <td className="px-6 py-4">
//                   <button
//                     data-modal-target="default-modal" data-modal-toggle="default-modal" 
//                     className="font-medium text-red-600 dark:text-red-500 hover:underline"
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//               <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td className="p-4">
//                   <img
//                     src={img2}
//                     className="w-16 md:w-32 max-w-full max-h-full"
//                     alt="Apple iMac"
//                   />
//                 </td>
//                 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                   iMac 27"
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     <button
//                       className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//                       type="button"
//                     >
//                       <span className="sr-only">Quantity button</span>
//                       <svg
//                         className="w-3 h-3"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 18 2"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M1 1h16"
//                         />
//                       </svg>
//                     </button>
//                     <div className="ms-3">
//                       <input
//                         type="number"
//                         id="first_product"
//                         className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="1"
//                         required
//                       />
//                     </div>
//                     <button
//                       className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//                       type="button"
//                     >
//                       <span className="sr-only">Quantity button</span>
//                       <svg
//                         className="w-3 h-3"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 18 18"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M9 1v16M1 9h16"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                   ₹2499
//                 </td>
//                 <td className="px-6 py-4">
//                   <button
//                     data-modal-target="default-modal" data-modal-toggle="default-modal" 
//                     className="font-medium text-red-600 dark:text-red-500 hover:underline"
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//               <tr className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600">
//                 <td className="p-4">
//                   <img
//                     src={img3}
//                     className="w-16 md:w-32 max-w-full max-h-full"
//                     alt="iPhone 12"
//                   />
//                 </td>
//                 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                   IPhone 12
//                 </td>
//                 <td className="px-6 py-4">
//                   <div className="flex items-center">
//                     <button
//                       className="inline-flex items-center justify-center p-1 text-sm font-medium h-6 w-6 text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//                       type="button"
//                     >
//                       <span className="sr-only">Quantity button</span>
//                       <svg
//                         className="w-3 h-3"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 18 2"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M1 1h16"
//                         />
//                       </svg>
//                     </button>
//                     <div className="ms-3">
//                       <input
//                         type="number"
//                         id="first_product"
//                         className="bg-gray-50 w-14 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block px-2.5 py-1 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
//                         placeholder="1"
//                         required
//                       />
//                     </div>
//                     <button
//                       className="inline-flex items-center justify-center h-6 w-6 p-1 ms-3 text-sm font-medium text-gray-500 bg-white border border-gray-300 rounded-full focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-200 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
//                       type="button"
//                     >
//                       <span className="sr-only">Quantity button</span>
//                       <svg
//                         className="w-3 h-3"
//                         aria-hidden="true"
//                         xmlns="http://www.w3.org/2000/svg"
//                         fill="none"
//                         viewBox="0 0 18 18"
//                       >
//                         <path
//                           stroke="currentColor"
//                           strokeLinecap="round"
//                           strokeLinejoin="round"
//                           strokeWidth="2"
//                           d="M9 1v16M1 9h16"
//                         />
//                       </svg>
//                     </button>
//                   </div>
//                 </td>
//                 <td className="px-6 py-4 font-semibold text-gray-900 dark:text-white">
//                   ₹999
//                 </td>
//                 <td className="px-6 py-4">
//                   <button
//                     data-modal-target="default-modal" data-modal-toggle="default-modal" 
//                     className="font-medium text-red-600 dark:text-red-500 hover:underline"
//                   >
//                     Remove
//                   </button>
//                 </td>
//               </tr>
//             </tbody>
//           </table>
//           <div id="default-modal" tabindex="-1" aria-hidden="true" class="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full" style={{zIndex: "10000"}}>
//     <div class=" p-4 w-full max-w-2xl max-h-full" >
//         {/* <!-- Modal content --> */}
//         <div class=" bg-white rounded-lg shadow dark:bg-gray-700" style={{zIndex: "100000"}}>
//             {/* <!-- Modal header --> */}
//             <div class="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
//                 <h3 class="text-xl font-semibold text-gray-900 dark:text-white">
//                     Terms of Service
//                 </h3>
//                 <button type="button" class="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white" data-modal-hide="default-modal">
//                     <svg class="w-3 h-3" aria-hidden="true" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 14 14">
//                         <path stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"/>
//                     </svg>
//                     <span class="sr-only">Close modal</span>
//                 </button>
//             </div>
//             {/* <!-- Modal body --> */}
//             <div class="p-4 md:p-5 space-y-4">
//                 <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
//                     With less than a month to go before the European Union enacts new consumer privacy laws for its citizens, companies around the world are updating their terms of service agreements to comply.
//                 </p>
//                 <p class="text-base leading-relaxed text-gray-500 dark:text-gray-400">
//                     The European Union’s General Data Protection Regulation (G.D.P.R.) goes into effect on May 25 and is meant to ensure a common set of data rights in the European Union. It requires organizations to notify users as soon as possible of high-risk data breaches that could personally affect them.
//                 </p>
//             </div>
//             {/* <!-- Modal footer --> */}
//             <div class="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
//                 <button data-modal-hide="default-modal" type="button" class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">I accept</button>
//                 <button data-modal-hide="default-modal" type="button" class="py-2.5 px-5 ms-3 text-sm font-medium text-gray-900 focus:outline-none bg-white rounded-lg border border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-100 dark:focus:ring-gray-700 dark:bg-gray-800 dark:text-gray-400 dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700">Decline</button>
//             </div>
//         </div>
//     </div>
// </div>
// <PriceDetails/>
//         </div>
//       </div>
//     </>
//   );
// }

// export default Cart;

import { useState, useEffect } from "react";
import axios from "axios";

export default function Cart() {
  const [cart, setCart] = useState({ products: [], total: 0 });
  const [loading, setLoading] = useState(true);
  
  useEffect(() => {
    const fetchCart = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/cart", { withCredentials: true });
        console.log("Cart API Response:", response.data);
        setCart(response.data || { products: [], total: 0 }); // Ensure default fallback
      } catch (error) {
        console.error("Error fetching cart:", error.response ? error.response.data : error);
        setCart({ products: [], total: 0 }); // Set empty cart if API fails
      } finally {
        setLoading(false);
      }
    };
    fetchCart();
  }, []);

  if (loading) return <p className="text-center">Loading...</p>;

  return (
    <div className="mx-auto px-8">
      <h1 className="text-3xl font-bold text-center my-6">Your Cart</h1>
      
      {cart.products && cart.products.length > 0 ? ( // Safe access check
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-8">
          {cart.products.map((product) => (
            <div key={product.productId || product._id} className="bg-white border border-gray-200 rounded-lg shadow">
              <img className="p-4 w-full h-[350px]" src={product.image} alt={product.title} />
              <div className="px-5 pb-5">
                <h5 className="text-md font-semibold">{product.title}</h5>
                <p>₹{product.price} x {product.quantity}</p>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <h2 className="text-center text-gray-500 mt-4">Your cart is empty.</h2>
      )}

      <h2 className="text-xl text-center my-4">Total: ₹{cart.total}</h2>
    </div>
  );
}
