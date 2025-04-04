import React, { useState } from "react";
import Admin from "./Admin";
import axios from "axios";

export default function NewProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
    salePrice: "", // Add salePrice field
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

  const [checkedItems, setCheckedItems] = useState({
    "New Arrivals": false,
    Sale: false,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newFormData = new FormData();
    newFormData.append("title", formData.title);
    newFormData.append("description", formData.description);
    newFormData.append("price", formData.price);
    newFormData.append("color", formData.color);
    newFormData.append("gender", formData.gender);
    newFormData.append("category", formData.category);
    newFormData.append("listings", JSON.stringify(formData.listings));
    newFormData.append("sizes", JSON.stringify(formData.sizes));

    // Add sale price and discount if item is on sale
    if (checkedItems.Sale) {
      newFormData.append("salePrice", formData.salePrice);
      const discountPercentage = calculateDiscount();
      newFormData.append("discount", discountPercentage);
    } else {
      newFormData.append("discount", 0); // Set discount to 0 if not on sale
    }

    formData.images.forEach((image) => {
      newFormData.append("images", image);
    });

    try {
      const response = await axios.post(
        "https://clozt-backend.vercel.app/api/products/newproduct",
        newFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
      );

      console.log("Product added successfully:", response.data);
      alert("Product added successfully!");

      // Reset form after successful submission
      setFormData({
        title: "",
        description: "",
        price: "",
        salePrice: "",
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
      setCheckedItems({
        "New Arrivals": false,
        Sale: false,
      });
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

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  // Add discount calculation function
  const calculateDiscount = () => {
    if (
      formData.price &&
      formData.salePrice &&
      formData.price > formData.salePrice
    ) {
      return Math.round(
        ((formData.price - formData.salePrice) / formData.price) * 100
      );
    }
    return 0;
  };

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

  // Update handleInputChange to handle salePrice
  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "salePrice" ? Number(value) : value,
    }));
  };

  // Update form JSX for listings and sale price
  return (
    <>
      <Admin />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <form
            className="max-w-2xl mx-auto bg-white p-8 rounded-xl shadow-lg"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <h2 className="text-2xl font-bold mb-6 text-gray-800 border-b pb-2">
              Add New Product
            </h2>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                required
              />
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Product Description
              </label>
              <textarea
                name="description"
                onChange={handleInputChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all min-h-[100px]"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Gender
                </label>
                <select
                  name="gender"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
                >
                  <option>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Category
                </label>
                <select
                  name="category"
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all bg-white"
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

            <div className="grid md:grid-cols-2 gap-6 mb-6">
              <div>
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>

              {checkedItems.Sale && (
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Sale Price
                  </label>
                  <input
                    type="number"
                    name="salePrice"
                    value={formData.salePrice}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                    max={formData.price}
                  />
                  {formData.price && formData.salePrice && (
                    <p className="mt-2 text-sm text-green-600 font-medium">
                      Discount: {calculateDiscount()}%
                    </p>
                  )}
                </div>
              )}

              {!checkedItems.Sale && (
                <div>
                  <label className="block mb-2 text-sm font-semibold text-gray-700">
                    Color
                  </label>
                  <input
                    type="text"
                    name="color"
                    value={formData.color}
                    onChange={handleInputChange}
                    className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    required
                  />
                </div>
              )}
            </div>

            {checkedItems.Sale && (
              <div className="mb-6">
                <label className="block mb-2 text-sm font-semibold text-gray-700">
                  Color
                </label>
                <input
                  type="text"
                  name="color"
                  value={formData.color}
                  onChange={handleInputChange}
                  className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                  required
                />
              </div>
            )}

            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Listings
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-4 gap-4 p-4 border rounded-lg bg-gray-50">
                {Object.keys(checkedItems).map((item) => (
                  <div key={item} className="flex items-center">
                    <input
                      type="checkbox"
                      id={item}
                      name={item}
                      checked={checkedItems[item]}
                      onChange={handleCheckboxChange}
                      className="w-4 h-4 text-blue-600 rounded focus:ring-blue-500"
                    />
                    <label
                      htmlFor={item}
                      className="ml-2 text-sm font-medium text-gray-700"
                    >
                      {item}
                    </label>
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Sizes
              </label>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                {Object.keys(formData.sizes).map((size) => (
                  <div key={size} className="flex flex-col">
                    <label className="text-sm text-gray-600 mb-1">{size}</label>
                    <input
                      type="number"
                      name={size}
                      value={formData.sizes[size]}
                      onChange={handleSizeChange}
                      className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
                    />
                  </div>
                ))}
              </div>
            </div>

            <div className="mb-6">
              <label className="block mb-2 text-sm font-semibold text-gray-700">
                Images
              </label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="w-full px-4 py-2 border rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-blue-50 file:text-blue-700 hover:file:bg-blue-100"
              />
            </div>

            <button
              type="submit"
              className="w-full bg-blue-600 text-white py-3 px-6 rounded-lg hover:bg-blue-700 transition-colors font-semibold shadow-md"
            >
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
