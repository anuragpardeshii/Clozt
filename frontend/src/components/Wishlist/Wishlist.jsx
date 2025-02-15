// import { Button } from "flowbite-react";
// import { HR } from "flowbite-react";
// import React from 'react'
// import { useState } from "react";

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

// export default function Wishlist() {

//   const products = [
//     { id: 1, title: "Black Oversized Butterfly Tee", price: 999, image: img1, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 2, title: "Black Oversized Butterfly Tee", price: 999, image: img2, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 3, title: "Black Oversized Butterfly Tee", price: 999, image: img3, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 4, title: "Black Oversized Butterfly Tee", price: 999, image: img4, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 5, title: "Black Oversized Butterfly Tee", price: 999, image: img5, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 6, title: "Black Oversized Butterfly Tee", price: 999, image: img6, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 7, title: "Black Oversized Butterfly Tee", price: 999, image: img7, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 8, title: "Black Oversized Butterfly Tee", price: 999, image: img8, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 9, title: "Black Oversized Butterfly Tee", price: 999, image: img9, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 10, title: "Black Oversized Butterfly Tee", price: 999, image: img10, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 11, title: "Black Oversized Butterfly Tee", price: 999, image: img11, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 12, title: "Black Oversized Butterfly Tee", price: 999, image: img12, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 13, title: "Black Oversized Butterfly Tee", price: 999, image: img13, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 14, title: "Black Oversized Butterfly Tee", price: 999, image: img14, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 15, title: "Black Oversized Butterfly Tee", price: 999, image: img15, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 16, title: "Black Oversized Butterfly Tee", price: 999, image: img16, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 19, title: "Black Oversized Butterfly Tee", price: 999, image: img19, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//     { id: 20, title: "Black Oversized Butterfly Tee", price: 999, image: img20, description: "A stylish oversized tee with a butterfly design.", rating: 5.0 },
//   ];

//   const [visibleCount, setVisibleCount] = useState(10);

//   const handleLoadMore = () => {
//     setVisibleCount((prevCount) => prevCount + 10);
//   };
//   return (
//     <div className="mx-auto px-8" style={{ maxWidth: "90rem", marginTop: "6rem" }}>
//         <h2 className='text-2xl'>My Wishlist <span className="text-sm text-gray-800">20 items</span></h2>
//         <HR />
//         <div>
//         <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
//           {products.slice(0, visibleCount).map((product) => (
//             <div key={product.id} className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
//             <img className="p-4 rounded-t-lg" src={product.image} alt={product.title} />
//             <div className="px-5 pb-5">
//               <h5 className="text-md font-semibold text-gray-900 dark:text-white">{product.title}</h5>
//               <div className="flex items-center mt-2.5">
//                 {/* Rating code */}
//                 </div>
//               <div className="flex items-center justify-between flex-col">
//                 <p className="text-lg pb-5 font-bold text-gray-900 dark:text-white">MRP: ₹{product.price}</p>
//                 <div className="flex flex-row gap-2">
//                 <a
//                   href="/details"
//                   className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   Add to cart
//                 </a>
//                 <Button color="failure"
//                 //   className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-4 py-2 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//                 >
//                   Remove 
//                 </Button>
//                 </div>
//               </div>
//             </div>
//           </div>
//           ))}
//         </div>

//         {/* Load More Button */}
//         {visibleCount < products.length && (
//           <div className="text-center p-8">
//             <button
//               onClick={handleLoadMore}
//               className="text-white bg-gray-800 hover:bg-gray-900 focus:outline-none focus:ring-4 focus:ring-gray-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
//             >
//               Load More
//             </button>
//           </div>
//         )}
//         </div>
//     </div>
//   )
// }
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

export default function Wishlist() {
  const [wishlist, setWishlist] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchWishlist = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/wishlist", { withCredentials: true });
        setWishlist(response.data);
      } catch (error) {
        if (error.response && error.response.status === 401) {
          alert("Login First");
          navigate("/login");
        } else {
          console.error("Error fetching wishlist:", error);
        }
      }
    };
    fetchWishlist();
  }, [navigate]);

  const handleRemoveFromWishlist = async (productId) => {
    try {
      const response = await axios.delete(`http://localhost:3000/api/wishlist/remove/${productId}`, { withCredentials: true });
      setWishlist((prev) => prev.filter((item) => item._id !== productId));
      alert(response.data.message);
    } catch (error) {
      console.error("Error removing from wishlist:", error);
    }
  };

  return (
    <div className="mx-auto px-8">
      <h1 className="text-3xl font-bold text-center my-6">Your Wishlist</h1>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-5 gap-8 mb-8">
        {wishlist.length > 0 ? (
          wishlist.map((product) => (
            <div key={product._id} className="bg-white border border-gray-200 rounded-lg shadow">
              <img className="p-4 rounded-t-lg w-full h-[350px]" src={product.images?.[0] || "https://via.placeholder.com/300"} alt={product.title} />
              <div className="px-5 pb-5">
                <h5 className="text-md font-semibold">{product.title}</h5>
                <div className="flex justify-between">
                  <span className="text-lg font-bold">₹{product.price}</span>
                  <button className="text-white bg-gray-800 px-4 py-2 rounded-lg">Add to Cart</button>
                  <button onClick={() => handleRemoveFromWishlist(product._id)} className="text-white bg-red-500 px-4 py-2 rounded-lg">❌</button>
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
