import axios from "axios";
import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Navigate } from "react-router-dom";

export default function Details() {
  const [isInWishlist, setIsInWishlist] = useState(false);
  const [isInCart, setIsInCart] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");
  const [cartMessage, setCartMessage] = useState("");

  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [user] = useState(null);

  if(!user){
    return <Navigate to="/login" />;
  }

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get("https://clozt-backend.vercel.app/api/products");
        const foundProduct = response.data.find((item) => item._id === id);

        if (foundProduct) {
          setProduct(foundProduct);
          console.log(foundProduct);
        } else {
          setError("Product not found.");
        }
      } catch (err) {
        setError("Failed to fetch product.");
        console.error("Error fetching product:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  const [selectedImage, setSelectedImage] = useState(null);

  useEffect(() => {
    if (product?.images?.length > 0) {
      setSelectedImage(product.images[0]);
    }
  }, [product]); // Run when `product` updates

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;

  const handleCartClick = () => {
    setIsInCart(!isInCart);
    setCartMessage(isInCart ? "Removed from Cart!" : "Added to Cart!");
    setTimeout(() => setCartMessage(""), 3000);
  };

  const handleWishlistClick = () => {
    setIsInWishlist(!isInWishlist);
    setAlertMessage(
      isInWishlist ? "Removed from Wishlist!" : "Added to Wishlist!"
    );
    setTimeout(() => setAlertMessage(""), 3000);
  };

  return (
    <div
      className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12"
      style={{ marginTop: "6rem" }}
    >
      <div className="grid grid-cols-1 md:grid-cols-6 gap-8 items-start">
        {/* Image Section */}
        <div className="flex flex-row col-span-3 mx-auto items-center md:items-start">
          <div className="flex gap-6">
            {/* Left Thumbnails */}
            <div className="flex flex-col gap-4">
              {product.images?.map((image, index) => (
                <img
                  key={index}
                  src={image}
                  alt={`Thumbnail ${index + 1}`}
                  className={`w-16 object-cover cursor-pointer border rounded-md 
                ${
                  selectedImage === image
                    ? "border-blue-500"
                    : "border-gray-300"
                } hover:opacity-75`}
                  onClick={() => setSelectedImage(image)}
                />
              ))}
            </div>

            {/* Right Main Image */}
            <img
              src={selectedImage}
              alt="Selected"
              className="w-full max-w-xs md:max-w-lg lg:max-w-sm h-auto rounded-lg shadow-lg"
            />
          </div>
        </div>

        {/* Product Details Section */}
        <div className="col-span-3">
          <h1 className="text-gray-700 font-bold text-2xl">{product.title}</h1>
          <h2 className="text-black font-semibold text-xl mt-2">
            Rs. {product.price}
          </h2>

          <p className="text-gray-500 mt-1">
            Product Description: <br /> {product.description}
          </p>
          <p className="text-gray-500 mt-1">Color: {product.color}</p>
          <p className="text-gray-500 mt-1">Size guide: view</p>

          {/* Sizes */}
          <p className="text-gray-500 mt-4">Size:</p>
          <div className="flex gap-2 flex-wrap mt-2">
            {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
              <button
                key={size}
                className="px-4 py-2 text-white bg-gray-800 rounded-full hover:bg-gray-900"
              >
                {size}
              </button>
            ))}
          </div>

          {/* Buttons */}
          <div className="flex gap-4 mt-6">
            <button
              onClick={handleCartClick}
              className="flex items-center px-4 py-2 bg-gray-800 text-white rounded-lg hover:bg-gray-900"
            >
              Add to Cart
            </button>
            <button
              onClick={handleWishlistClick}
              className="flex items-center px-4 py-2 bg-gray-200 text-black rounded-lg hover:bg-gray-300"
            >
              <svg
                className="w-5 h-5 mr-2"
                xmlns="http://www.w3.org/2000/svg"
                fill={isInWishlist ? "red" : "none"}
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path d="M12.001 4.529c-2.349-2.42-6.176-2.42-8.526 0-2.418 2.496-2.418 6.545 0 9.04l7.506 7.75a1.2 1.2 0 0 0 1.68 0l7.506-7.75c2.418-2.495 2.418-6.544 0-9.04-2.35-2.42-6.177-2.42-8.526 0Z" />
              </svg>
              Wishlist
            </button>
          </div>

          {/* Alerts */}
          {cartMessage && (
            <div
              className={`mt-4 p-2 rounded-lg text-sm ${
                isInCart
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {cartMessage}
            </div>
          )}
          {alertMessage && (
            <div
              className={`mt-4 p-2 rounded-lg text-sm ${
                isInWishlist
                  ? "bg-green-100 text-green-800"
                  : "bg-red-100 text-red-800"
              }`}
            >
              {alertMessage}
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
