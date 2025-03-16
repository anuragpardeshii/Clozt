import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";

const Details = () => {
  const { id } = useParams(); // Extract the product ID from URL
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  useEffect(() => {
    console.log("Fetching product with ID:", id); // Debugging log

    const fetchProduct = async () => {
      try {
        const response = await axios.get(
          `http://localhost:3000/api/products/${id}`
        );
        console.log("Product response:", response.data);
        setProduct(response.data);
      } catch (err) {
        console.error(
          "Error fetching product:",
          err.response?.data || err.message
        );
        setError("Failed to fetch product details");
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
  }, [id]);

  if (loading) return <p>Loading...</p>;
  if (error) return <p className="text-red-500">{error}</p>;
  if (!product) return <p>No product found.</p>;

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white shadow-lg rounded-lg">
      {product.images?.length > 0 ? (
        <img
          src={product.images[0]}
          alt={product.title}
          className="w-full h-80 object-cover rounded-md mb-4"
        />
      ) : (
        <div className="w-full h-80 bg-gray-200 flex items-center justify-center">
          <p>No Image Available</p>
        </div>
      )}
      <h1 className="text-2xl font-bold">{product.title}</h1>
      <p className="text-gray-600">{product.description}</p>
      <p className="text-xl font-semibold mt-2">Price: ₹{product.price}</p>
      <p className="text-gray-700 mt-1">Color: {product.color}</p>
      <p className="text-gray-700 mt-1">Category: {product.category}</p>
      <p className="text-gray-700 mt-1">Gender: {product.gender}</p>
    </div>
  );
};

export default Details;
