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

  const calculateDiscount = () => {
    if (
      formData.price &&
      formData.newPrice &&
      formData.price > formData.newPrice
    ) {
      return (
        ((formData.price - formData.newPrice) / formData.price) *
        100
      ).toFixed(2);
    }
    return 0;
  };

  const handleInputChange = (event) => {
    const { name, value } = event.target;
    setFormData((prev) => ({
      ...prev,
      [name]: name === "price" || name === "newPrice" ? Number(value) : value,
    }));
  };

  const handleImageChange = (event) => {
    const files = Array.from(event.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
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

    formData.images.forEach((image) => {
      newFormData.append("images", image);
    });

    try {
      const response = await axios.post(
        "http://localhost:3000/api/products/newproduct",
        newFormData,
        {
          headers: { "Content-Type": "multipart/form-data" },
          withCredentials: true,
        }
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

  return (
    <>
      <Admin />
      <div className="p-4 sm:ml-64">
        <div className="p-4 border-2 border-gray-200 border-dashed rounded-lg dark:border-gray-700 mt-14">
          <form
            className="max-w-xl mx-auto"
            encType="multipart/form-data"
            onSubmit={handleSubmit}
          >
            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Product Title
              </label>
              <input
                type="text"
                name="title"
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">
                Product Description
              </label>
              <textarea
                name="description"
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div className="grid md:grid-cols-2 md:gap-6">
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">Gender</label>
                <select
                  name="gender"
                  onChange={handleInputChange}
                  className="input-field"
                >
                  <option>Select Gender</option>
                  <option value="Male">Male</option>
                  <option value="Female">Female</option>
                </select>
              </div>

              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">
                  Category
                </label>
                <select
                  name="category"
                  onChange={handleInputChange}
                  className="input-field"
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
              <label className="block mb-2 text-sm font-medium">Price</label>
              <input
                type="number"
                name="price"
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">Color</label>
              <input
                type="text"
                name="color"
                onChange={handleInputChange}
                className="input-field"
                required
              />
            </div>

            {checkedItems.Sale && (
              <div className="mb-5">
                <label className="block mb-2 text-sm font-medium">
                  New Price
                </label>
                <input
                  type="number"
                  name="newPrice"
                  onChange={handleInputChange}
                  className="input-field"
                  required
                />
                <p className="text-sm text-gray-700">
                  Discount: {calculateDiscount()}%
                </p>
              </div>
            )}

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">Sizes</label>
              {Object.keys(formData.sizes).map((size) => (
                <input
                  key={size}
                  type="number"
                  name={size}
                  value={formData.sizes[size]}
                  onChange={handleSizeChange}
                  className="input-field mb-2"
                />
              ))}
            </div>

            <div className="mb-5">
              <label className="block mb-2 text-sm font-medium">Images</label>
              <input
                type="file"
                multiple
                onChange={handleImageChange}
                className="input-field"
              />
            </div>

            <button type="submit" className="btn-primary">
              Add Product
            </button>
          </form>
        </div>
      </div>
    </>
  );
}
