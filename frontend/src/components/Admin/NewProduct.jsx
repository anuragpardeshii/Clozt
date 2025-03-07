import React, { useState } from "react";
import Admin from "./Admin";
import axios from "axios";

export default function NewProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    newPrice: "",
    color: "",
    gender: "",
    category: "",
    listings: [],
    sizes: {
      XS: 0,
      S: 0,
      M: 0,
      L: 0,
      XL: 0,
      XXL: 0,
    },
    images: [],
  });

  const config = {
    headers: { "Content-Type": "multipart/form-data" },
    withCredentials: true,
  };

  
  const [checkedItems, setCheckedItems] = useState({
    "New Arrivals": false,
    Sale: false,
    Men: false,
    Women: false,
  });

  const handleCheckboxChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({ ...prev, [name]: checked }));

    setFormData((prev) => {
      const updatedListings = checked
        ? [...prev.listings, name]
        : prev.listings.filter((item) => item !== name);
      return { ...prev, listings: updatedListings };
    });
  };

  const handleSizeChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      sizes: { ...prev.sizes, [name]: Number(value) },
    }));
  };

  const [prices, setPrices] = useState({
    previousPrice: "",
    currentPrice: "",
  });

  const handleChange = (event) => {
    const { name, checked } = event.target;
    setCheckedItems((prev) => ({ ...prev, [name]: checked }));
  };

  const calculateDiscount = () => {
    const { previousPrice, currentPrice } = prices;
    if (previousPrice > currentPrice) {
      return (((previousPrice - currentPrice) / previousPrice) * 100).toFixed(
        2
      );
    }
    return 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent page reload

    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("description", formData.description);
    newFormData.append("price", formData.price);
    newFormData.append("color", formData.color);
    newFormData.append("gender", formData.gender);
    newFormData.append("category", formData.category);
    newFormData.append("listings", JSON.stringify(formData.listings));
    newFormData.append("sizes", JSON.stringify(formData.sizes));

    // Append images
    formData.images.forEach((image) => {
      newFormData.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/products/newproduct",
        newFormData, // ✅ Send newFormData, not formData
        { withCredentials: true } // ✅ Ensures authentication cookies are sent
        , newFormData, config
      );

      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");
    } catch (error) {
      console.error(
        "Error adding product:",
        error.response?.data?.message || error.message
      );
      alert(
        `Error: ${error.response?.data?.message || "Something went wrong"}`
      );
    }
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => {
      if (name === "price" && checkedItems.Sale) {
        return { ...prev, price: Number(value), newPrice: prev.newPrice || "" };
      }
      return {
        ...prev,
        [name]: name === "price" || name === "newPrice" ? Number(value) : value,
      };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  return (
    <>
      <Admin />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <form
            action="/newproduct"
            method="POST"
            className="max-w-xl mx-auto"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <label
                htmlFor="product"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Title
              </label>
              <input
                type="text"
                name="title"
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>

            <div className="mb-5">
              <label
                htmlFor="description"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Product Description
              </label>
              <textarea
                name="description"
                onChange={handleChange}
                className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-5">
                <label
                  htmlFor="gender"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Gender
                </label>
                <select
                  name="gender"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                >
                  <option>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>
              <div className="mb-5">
                <label
                  htmlFor="category"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Category
                </label>
                <select
                  name="category"
                  onChange={handleChange}
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  required
                >
                  <option>Select Category</option>
                  <option value="Top">Top</option>
                  <option value="Shirts">Shirts</option>
                  <option value="Denim">Denim</option>
                  <option value="Winter Wear">Winter Wear</option>
                </select>
              </div>
            </div>

            <div className="mb-5">
              <h3 className="mb-5 text-md font-medium text-gray-900 dark:text-white">
                Listings:
              </h3>
              <ul className="grid w-full mb-5 gap-6 md:grid-cols-4">
                {Object.keys(checkedItems).map((listing) => (
                  <li key={listing}>
                    <label className="flex items-center space-x-2 cursor-pointer">
                      <input
                        type="checkbox"
                        name={listing}
                        checked={checkedItems[listing]}
                        onChange={handleCheckboxChange}
                        className="w-4 h-4 text-blue-600 border-gray-300 rounded focus:ring-blue-500"
                      />
                      <span className="text-sm font-semibold text-gray-900">
                        {listing}
                      </span>
                    </label>
                  </li>
                ))}
              </ul>

              {/* Main Input Fields */}
              <div className="grid md:grid-cols-2 md:gap-6">
                {/* Price Field (Used as Previous Price when Sale is checked) */}
                <div className="mb-5">
                  <label
                    htmlFor="price"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Price
                  </label>
                  <input
                    type="number"
                    name="price"
                    value={formData.price || ""}
                    onChange={handleInputChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>

                {/* Color Field */}
                <div className="mb-5">
                  <label
                    htmlFor="color"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                    required
                  />
                </div>
              </div>

              {/* Show Sale Price and Discount Calculation if "Sale" is checked */}
              {checkedItems.Sale && (
                <div className="p-4 border rounded-lg bg-gray-100">
                  <h4 className="text-lg font-medium text-gray-900">
                    Sale Details
                  </h4>

                  <div className="grid md:grid-cols-2 md:gap-6">
                    {/* Previous Price (Linked to Price Input) */}
                    <div className="mb-5">
                      <label
                        htmlFor="previousPrice"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Previous Price
                      </label>
                      <input
                        type="number"
                        name="previousPrice"
                        value={formData.price} // Linked to Price
                        disabled
                        className="shadow-sm bg-gray-200 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light cursor-not-allowed"
                      />
                    </div>

                    {/* New Price Input */}
                    <div className="mb-5">
                      <label
                        htmlFor="newPrice"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        New Price
                      </label>
                      <input
                        type="number"
                        name="newPrice"
                        value={formData.newPrice || ""}
                        onChange={handleInputChange}
                        className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                        required
                      />
                    </div>
                  </div>

                  {/* Discount Percentage Display */}
                  {formData.price && formData.newPrice && (
                    <p className="text-sm text-gray-700">
                      <span className="font-semibold">Discount:</span>{" "}
                      <span className="text-red-500">
                        {calculateDiscount()}%
                      </span>
                    </p>
                  )}
                </div>
              )}
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium text-gray-900 dark:text-white">
                Quantity
              </label>
              <div className="grid md:grid-cols-4 md:gap-6">
                {["XS", "S", "M", "L", "XL", "XXL"].map((size) => (
                  <div key={size}>
                    <label
                      htmlFor={size}
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      {size}
                    </label>
                    <input
                      type="number"
                      name={size}
                      value={formData.sizes[size]}
                      onChange={handleSizeChange}
                      className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                      required
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-5">
              <label
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                htmlFor="file_input"
              >
                Upload Images (max: 4)
              </label>
              <input
                type="file"
                name="image"
                onChange={handleImageChange}
                multiple
                className="block w-full text-sm text-gray-900 border border-gray-300 rounded-lg cursor-pointer bg-gray-50 dark:text-gray-400 focus:outline-none dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400"
              />
              <p className="mt-1 text-sm text-gray-500 dark:text-gray-300">
                SVG, PNG, JPG or GIF (MAX. 800x400px).
              </p>
            </div>

            <button
              type="submit"
              className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
