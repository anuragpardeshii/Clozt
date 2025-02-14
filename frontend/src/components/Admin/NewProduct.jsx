import React, { useState } from "react";
import Admin from "./Admin";
import axios from "axios";

export default function NewProduct() {
  const [formData, setFormData] = useState({
    title: "",
    description: "",
    price: "",
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
    image: [],
  });
  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;

    if (type === "checkbox") {
      setFormData((prev) => ({
        ...prev,
        listings: checked
          ? [...prev.listings, name]
          : prev.listings.filter((item) => item !== name),
      }));
    } else if (["XS", "S", "M", "L", "XL", "XXL"].includes(name)) {
      setFormData((prev) => ({
        ...prev,
        sizes: {
          ...prev.sizes,
          [name]: Number(value),
        },
      }));
    } else {
      setFormData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files, // Store files in state
    }));
  };

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

    // Append each image file
    formData.images.forEach((image) => {
      newFormData.append("images", image);
    });

    try {
      const response = await fetch(
        "http://localhost:3000/api/products/newproduct",
        {
          method: "POST",
          body: newFormData,
        }
      );

      const data = await response.json();
      if (!response.ok) throw new Error(data.error);

      console.log("Product added successfully:", data);
    } catch (error) {
      console.error("Error adding product:", error.message);
    }
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
                  htmlFor="price"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Price
                </label>
                <input
                  type="number"
                  name="price"
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
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
                  onChange={handleChange}
                  className="shadow-sm bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500 dark:shadow-sm-light"
                  required
                />
              </div>
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
                {["New Arrivals", "Sale", "Men", "Women"].map((listing) => (
                  <li key={listing}>
                    <input
                      type="checkbox"
                      id={listing}
                      name={listing}
                      onChange={handleChange}
                      className="hidden peer"
                    />
                    <label
                      htmlFor={listing}
                      className="inline-flex items-center w-full p-2 text-gray-500 bg-white border-2 border-gray-200 rounded-lg cursor-pointer peer-checked:border-blue-600 hover:text-gray-600"
                    >
                      <div className="block">
                        <div className="w-full text-sm font-semibold">
                          {listing}
                        </div>
                      </div>
                    </label>
                  </li>
                ))}
              </ul>
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
                      onChange={handleChange}
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
