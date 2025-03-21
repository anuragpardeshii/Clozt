import React, { useEffect, useState } from "react";
import Admin from "./Admin";
import axios from "axios";

export default function AllProducts() {
  const [products, setProducts] = useState([]);
  const [editingProduct, setEditingProduct] = useState(null);
  const [updatedProduct, setUpdatedProduct] = useState({
    title: "",
    description: "",
    price: "",
    newPrice: "",
    discount: "",
    color: "",
    category: "",
    gender: "",
    listing: [],
    sizes: { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
    images: [],
  });
  const [imagePreview, setImagePreview] = useState([]);

  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/products", {
          withCredentials: true,
        });
        setProducts(response.data);
      } catch (err) {
        console.error("Error fetching products:", err);
      }
    };

    fetchProducts();
  }, []);

  // Open Modal with Pre-Filled Data
  const handleEditClick = (product) => {
    if (!product || !product._id) {
      console.error("Error: Invalid product selected for editing", product);
      return;
    }

    setEditingProduct(product); // Store full product object
    setUpdatedProduct({
      title: product.title,
      description: product.description || "",
      price: product.price,
      newPrice: product.newPrice || "",
      discount: product.discount || "",
      color: product.color,
      category: product.category,
      gender: product.gender,
      listing: product.listing || [],
      sizes: product.sizes || { XS: 0, S: 0, M: 0, L: 0, XL: 0, XXL: 0 },
      images: product.images || [],
    });
    setImagePreview(product.images || []);
  };

  // Handle Checkbox for Listings
  const handleListingChange = (e) => {
    const { value, checked } = e.target;
    let updatedListings = updatedProduct.listings || []; // Ensure it's always an array
  
    if (checked) {
      // Add value if checkbox is checked
      if (!updatedListings.includes(value)) {
        updatedListings.push(value);
      }
    } else {
      // Remove value if unchecked
      updatedListings = updatedListings.filter((item) => item !== value);
    }
  
    // If listings become empty, set "N/A"
    if (updatedListings.length === 0) {
      updatedListings = ["N/A"];
    } else {
      updatedListings = updatedListings.filter((item) => item !== "N/A"); // Remove "N/A" if items exist
    }
  
    setUpdatedProduct((prev) => ({
      ...prev,
      listings: updatedListings,
    }));
  };
    

  // Handle Size Quantity Change
  const handleSizeChange = (size, value) => {
    setUpdatedProduct((prev) => ({
      ...prev,
      sizes: { ...prev.sizes, [size]: value },
    }));
  };

  // Handle Image Upload
  const handleImageUpload = (e) => {
    const files = Array.from(e.target.files);
    const imageUrls = files.map((file) => URL.createObjectURL(file));

    setUpdatedProduct((prev) => ({
      ...prev,
      images: [...prev.images, ...files], // Keep old images + new ones
    }));
    setImagePreview((prev) => [...prev, ...imageUrls]);
  };

  // Update Product
  const handleUpdateProduct = async () => {
    try {
      if (!editingProduct || !editingProduct._id) {
        alert("Product ID is missing. Cannot update.");
        return;
      }

      const formData = new FormData();
      formData.append("title", updatedProduct.title);
      formData.append("description", updatedProduct.description);
      formData.append("price", updatedProduct.price);
      formData.append("color", updatedProduct.color);
      formData.append("category", updatedProduct.category);
      formData.append("gender", updatedProduct.gender);
      formData.append("listing", JSON.stringify(updatedProduct.listing));
      formData.append("sizes", JSON.stringify(updatedProduct.sizes));

      if (updatedProduct.listing.includes("Sales")) {
        formData.append("newPrice", updatedProduct.newPrice);
        formData.append("discount", updatedProduct.discount);
      }

      // Separate new images from existing ones
      const newImages = updatedProduct.images.filter(
        (img) => img instanceof File
      );
      const existingImages = updatedProduct.images.filter(
        (img) => !(img instanceof File)
      );

      formData.append("existingImages", JSON.stringify(existingImages)); // Send as JSON
      newImages.forEach((image) => formData.append("images", image));

      const response = await fetch(
        `http://localhost:3000/api/products/${editingProduct._id}`,
        {
          method: "PUT",
          body: formData,
        }
      );

      if (!response.ok) {
        console.error("Error:", await response.text());
        alert(`Error updating product: ${response.status}`);
        return;
      }

      const data = await response.json();

      setProducts((prev) =>
        prev.map((product) =>
          product._id === editingProduct._id ? data : product
        )
      );

      alert("Product updated successfully!");
      setEditingProduct(null);
    } catch (error) {
      console.error("Error updating product:", error);
    }
  };


  return (
    <>
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <div className="relative overflow-x-auto shadow-md sm:rounded-lg">
            <div className="flex flex-column sm:flex-row flex-wrap space-y-4 sm:space-y-0 items-center justify-between pb-4">
              <div>
                <button
                  id="dropdownRadioButton"
                  data-dropdown-toggle="dropdownRadio"
                  className="inline-flex items-center text-gray-500 bg-white border border-gray-300 focus:outline-none hover:bg-gray-100 focus:ring-4 focus:ring-gray-100 font-medium rounded-lg text-sm px-3 py-1.5 dark:bg-gray-800 dark:text-white dark:border-gray-600 dark:hover:bg-gray-700 dark:hover:border-gray-600 dark:focus:ring-gray-700"
                  type="button"
                >
                  <svg
                    className="w-3 h-3 text-gray-500 dark:text-gray-400 me-3"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M10 0a10 10 0 1 0 10 10A10.011 10.011 0 0 0 10 0Zm3.982 13.982a1 1 0 0 1-1.414 0l-3.274-3.274A1.012 1.012 0 0 1 9 10V6a1 1 0 0 1 2 0v3.586l2.982 2.982a1 1 0 0 1 0 1.414Z" />
                  </svg>
                  Last 30 days
                  <svg
                    className="w-2.5 h-2.5 ms-2.5"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 10 6"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="m1 1 4 4 4-4"
                    />
                  </svg>
                </button>
                {/* <!-- Dropdown menu --> */}
                <div
                  id="dropdownRadio"
                  className="z-10 hidden w-48 bg-white divide-y divide-gray-100 rounded-lg shadow dark:bg-gray-700 dark:divide-gray-600"
                  data-popper-reference-hidden=""
                  data-popper-escaped=""
                  data-popper-placement="top"
                  style={{
                    position: "absolute",
                    inset: "auto auto 0px 0px",
                    margin: "0px",
                    transform: "translate3d(522.5px, 3847.5px, 0px)",
                  }}
                >
                  <ul
                    className="p-3 space-y-1 text-sm text-gray-700 dark:text-gray-200"
                    aria-labelledby="dropdownRadioButton"
                  >
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          id="filter-radio-example-1"
                          type="radio"
                          value=""
                          name="filter-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="filter-radio-example-1"
                          className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                        >
                          Last day
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          defaultChecked
                          id="filter-radio-example-2"
                          type="radio"
                          value=""
                          name="filter-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="filter-radio-example-2"
                          className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                        >
                          Last 7 days
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          id="filter-radio-example-3"
                          type="radio"
                          value=""
                          name="filter-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="filter-radio-example-3"
                          className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                        >
                          Last 30 days
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          id="filter-radio-example-4"
                          type="radio"
                          value=""
                          name="filter-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="filter-radio-example-4"
                          className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                        >
                          Last month
                        </label>
                      </div>
                    </li>
                    <li>
                      <div className="flex items-center p-2 rounded hover:bg-gray-100 dark:hover:bg-gray-600">
                        <input
                          id="filter-radio-example-5"
                          type="radio"
                          value=""
                          name="filter-radio"
                          className="w-4 h-4 text-blue-600 bg-gray-100 border-gray-300 focus:ring-blue-500 dark:focus:ring-blue-600 dark:ring-offset-gray-800 dark:focus:ring-offset-gray-800 focus:ring-2 dark:bg-gray-700 dark:border-gray-600"
                        />
                        <label
                          htmlFor="filter-radio-example-5"
                          className="w-full ms-2 text-sm font-medium text-gray-900 rounded dark:text-gray-300"
                        >
                          Last year
                        </label>
                      </div>
                    </li>
                  </ul>
                </div>
              </div>
              <label htmlFor="table-search" className="sr-only">
                Search
              </label>
              <div className="relative">
                <div className="absolute inset-y-0 left-0 rtl:inset-r-0 rtl:right-0 flex items-center ps-3 pointer-events-none">
                  <svg
                    className="w-5 h-5 text-gray-500 dark:text-gray-400"
                    aria-hidden="true"
                    fill="currentColor"
                    viewBox="0 0 20 20"
                    xmlns="http://www.w3.org/2000/svg"
                  >
                    <path
                      fillRule="evenodd"
                      d="M8 4a4 4 0 100 8 4 4 0 000-8zM2 8a6 6 0 1110.89 3.476l4.817 4.817a1 1 0 01-1.414 1.414l-4.816-4.816A6 6 0 012 8z"
                      clipRule="evenodd"
                    ></path>
                  </svg>
                </div>
                <input
                  type="text"
                  id="table-search"
                  className="block p-2 ps-10 text-sm text-gray-900 border border-gray-300 rounded-lg w-80 bg-gray-50 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Search for products"
                />
              </div>
            </div>
            <table className="w-full text-sm text-left rtl:text-right text-gray-500 dark:text-gray-400">
              <thead className="text-xs text-gray-700 uppercase bg-gray-50 dark:bg-gray-700 dark:text-gray-400">
                <tr>
                  <th scope="col" className="px-6 py-3">
                    Image
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Title
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Color
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Gender
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Category
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Listing
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Price
                  </th>
                  <th scope="col" className="px-6 py-3">
                    Action
                  </th>
                </tr>
              </thead>
              <tbody>
                {products.map((product) => (
                  <tr
                    key={product._id}
                    className="bg-white border-b dark:bg-gray-800 dark:border-gray-700 hover:bg-gray-50 dark:hover:bg-gray-600"
                  >
                    <th
                      scope="row"
                      className="px-6 py-4 font-medium text-gray-900 whitespace-nowrap dark:text-white"
                    >
                      <img src={product.images[0]} alt="" className="w-12" />
                    </th>
                    <td className="px-6 py-4">{product.title}</td>
                    <td className="px-6 py-4">{product.color}</td>
                    <td className="px-6 py-4">{product.gender}</td>
                    <td className="px-6 py-4">{product.category}</td>
                    <td className="px-6 py-4">
                      {Array.isArray(product.listings)
                        ? product.listings.join(", ")
                        : "N/A"}
                    </td>
                    <td className="px-6 py-4">${product.price}</td>
                    <td className="px-6 py-4">
                      <button
                        onClick={() => handleEditClick(product)}
                        className="text-blue-600 hover:underline"
                      >
                        Edit
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          {/* Modal */}
          {editingProduct && (
            <div
              className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center"
              style={{ zIndex: "1000" }}
            >
              <div className="bg-white p-6 rounded-lg w-96">
                <h2 className="text-lg font-bold mb-4">Edit Product</h2>
                <input
                  type="text"
                  value={updatedProduct.title}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      title: e.target.value,
                    })
                  }
                  className="block w-full p-2 mb-2 border rounded"
                  placeholder="Title"
                />
                <textarea
                  value={updatedProduct.description}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      description: e.target.value,
                    })
                  }
                  className="block w-full p-2 mb-2 border rounded"
                  placeholder="Description"
                ></textarea>
                <input
                  type="text"
                  value={updatedProduct.price}
                  onChange={(e) =>
                    setUpdatedProduct({
                      ...updatedProduct,
                      price: e.target.value,
                    })
                  }
                  className="block w-full p-2 mb-2 border rounded"
                  placeholder="Price"
                />

                {/* Listing Checkboxes */}
                <div className="mb-2">
                  <label>
                    <input
                      type="checkbox"
                      value="New Arrivals"
                      checked={updatedProduct.listing.includes("New Arrivals")}
                      onChange={handleListingChange}
                    />{" "}
                    New Arrivals
                  </label>
                  <label className="ml-4">
                    <input
                      type="checkbox"
                      value="Sales"
                      checked={updatedProduct.listing.includes("Sales")}
                      onChange={handleListingChange}
                    />{" "}
                    Sales
                  </label>
                </div>

                {/* Sales Fields */}
                {updatedProduct.listing.includes("Sales") && (
                  <>
                    <input
                      type="text"
                      value={updatedProduct.newPrice || ""}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          newPrice: e.target.value,
                        })
                      }
                      className="block w-full p-2 mb-2 border rounded"
                      placeholder="New Price"
                    />
                    <input
                      type="text"
                      value={updatedProduct.discount || ""}
                      onChange={(e) =>
                        setUpdatedProduct({
                          ...updatedProduct,
                          discount: e.target.value,
                        })
                      }
                      className="block w-full p-2 mb-2 border rounded"
                      placeholder="Discount %"
                    />
                  </>
                )}


                {/* Sizes */}
                {Object.keys(updatedProduct.sizes).map((size) => (
                  <input
                    key={size}
                    type="text"
                    value={updatedProduct.sizes[size]}
                    onChange={(e) => handleSizeChange(size, e.target.value)}
                    className="block w-full p-2 mb-2 border rounded"
                    placeholder={`${size} Quantity`}
                  />
                ))}

                <button
                  onClick={handleUpdateProduct}
                  className="bg-blue-600 text-white px-4 py-2 rounded mt-2"
                >
                  Save
                </button>
              </div>
            </div>
          )}
        </div>
      </div>
    </>
  );
}
