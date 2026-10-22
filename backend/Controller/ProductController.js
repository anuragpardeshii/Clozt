const Product = require("../Models/Product");
const Cart = require("../Models/Cart");
const Wishlist = require("../Models/Wishlist");
const Review = require("../Models/Review");
const pagination = require('../services/pagination');
const mongoose = require('mongoose');
exports.getAdminProducts = async (req, res) => {
  try {
    const { page, limit, skip } = pagination(req.query);
    const search = typeof req.query.search === 'string' ? req.query.search.trim().slice(0, 80) : '';
    const escaped = search.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
    const filter = search ? { $or: ['title', 'category', 'color'].map((field) => ({ [field]: { $regex: escaped, $options: 'i' } })) } : {};
    const [products, total] = await Promise.all([
      Product.find(filter).sort({ _id: -1 }).skip(skip).limit(limit).lean(),
      Product.countDocuments(filter),
    ]);
    return res.json({ products, total, page, limit, pages: Math.max(1, Math.ceil(total / limit)) });
  } catch (error) {
    console.error('Error fetching admin products:', error);
    return res.status(500).json({ message: 'Could not fetch products' });
  }
};
exports.getAdminProduct = async (req, res) => {
  try {
    if (!mongoose.isValidObjectId(req.params.id)) return res.status(400).json({ message: 'Invalid product ID' });
    const product = await Product.findById(req.params.id).lean();
    if (!product) return res.status(404).json({ message: 'Product not found' });
    return res.json(product);
  } catch (error) {
    console.error('Error fetching product:', error);
    return res.status(500).json({ message: 'Could not fetch product' });
  }
};
exports.getAllProducts = async (req, res) => {
  try {
    const products = await Product.find().lean();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products" });
  }
};

exports.getFilteredProducts = async (req, res) => {
  try {
    const { listing, category } = req.params;
    const categoryNames = {
      top: ['Top', 'T-shirt', 'T-shirts', 'Tshirt'],
      't-shirts': ['Top', 'T-shirt', 'T-shirts', 'Tshirt'],
      shirts: ['Shirt', 'Shirts'],
      denim: ['Denim'],
      'winter-wear': ['Winter', 'Winter Wear'],
    };
    const categories = categoryNames[category.toLowerCase()];
    if (!categories) return res.status(404).json({ message: 'Category not found' });
    const filter = { category: { $in: categories.map((name) => new RegExp(`^${name}$`, 'i')) } };
    const listingName = listing.toLowerCase();
    if (listingName === 'men') filter.gender = /^male$/i;
    else if (listingName === 'women') filter.gender = /^female$/i;
    else if (listingName === 'new-arrival') filter.listings = /^new arrivals$/i;
    else if (listingName === 'sale') filter.listings = /^sale$/i;
    else if (listingName !== 'all') return res.status(404).json({ message: 'Listing not found' });
    const products = await Product.find(filter).sort({ _id: -1 }).lean();

    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching filtered products:", error);
    res
      .status(500)
      .json({ message: "Error fetching products" });
  }
};

exports.updateProduct = async (req, res) => {
  try {
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ message: "Product ID is required" });
    }

    let updatedData = { ...req.body };

    // Parse JSON fields if they exist
    if (updatedData.listings) {
      try {
        updatedData.listings = JSON.parse(updatedData.listings);
      } catch (e) {
        return res.status(400).json({ message: "Invalid listings format" });
      }
    }
    if (updatedData.sizes) {
      try {
        updatedData.sizes = JSON.parse(updatedData.sizes);
      } catch (e) {
        return res.status(400).json({ message: "Invalid sizes format" });
      }
    }
    if (updatedData.existingImages) {
      try {
        updatedData.existingImages = JSON.parse(updatedData.existingImages);
      } catch (e) {
        return res.status(400).json({ message: "Invalid existingImages format" });
      }
    }

    // Handle new images if any were uploaded
    if (updatedData.existingImages || req.fileUrls.length > 0) {
      updatedData.images = [...(updatedData.existingImages || []), ...req.fileUrls];
    }

    // Handle sale price and discount
    if (updatedData.listings && updatedData.listings.includes("Sale")) {
      // Convert sale price and discount to numbers
      updatedData.salePrice = updatedData.salePrice ? Number(updatedData.salePrice) : null;
      updatedData.discount = updatedData.discount ? Number(updatedData.discount) : null;
    } else {
      // If not on sale, remove sale price and discount
      updatedData.salePrice = null;
      updatedData.discount = null;
    }

    // Remove unnecessary fields
    delete updatedData.existingImages;

    const updatedProduct = await Product.findByIdAndUpdate(
      id,
      updatedData,
      { new: true, runValidators: true }
    ).lean();

    if (!updatedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json(updatedProduct);
  } catch (error) {
    console.error("Error updating product:", error);
    res.status(500).json({ message: "Error updating product" });
  }
};

exports.listings = async (req, res) => {
  try {
    const listing = req.params.listing.toLowerCase();
    const filters = {
      men: { gender: /^male$/i },
      women: { gender: /^female$/i },
      'new-arrival': { listings: /^new arrivals$/i },
      sale: { listings: /^sale$/i },
      all: {},
    };
    if (!Object.hasOwn(filters, listing)) return res.status(404).json({ message: 'Listing not found' });
    const products = await Product.find(filters[listing]).sort({ _id: -1 }).lean();
    res.status(200).json(products);
  } catch (error) {
    console.error("Error fetching listings:", error);
    res
      .status(500)
      .json({ message: "Error fetching products" });
  }
};

exports.createProduct = async (req, res) => {
  try {
    const {
      title,
      description,
      price,
      color,
      gender,
      category,
      sizes,
      listings,
      salePrice,
      discount,
    } = req.body;

    // Validate required fields
    if (
      !title ||
      !description ||
      !price ||
      !color ||
      !gender ||
      !category ||
      !sizes ||
      !listings
    ) {
      return res.status(400).json({ message: "All fields are required" });
    }

    // Check if images are uploaded
    if (!req.fileUrls || req.fileUrls.length === 0) {
      return res.status(400).json({ message: "No images uploaded" });
    }

    const images = req.fileUrls;
    const parsedSizes = typeof sizes === "string" ? JSON.parse(sizes) : sizes;
    const parsedListings = typeof listings === "string" ? JSON.parse(listings) : listings;

    // Create a new product instance with optional sale fields
    const newProduct = new Product({
      title,
      description,
      price,
      color,
      gender,
      category,
      listings: parsedListings,
      sizes: parsedSizes,
      images,
      ...(salePrice && { salePrice: Number(salePrice) }),
      ...(discount && { discount: Number(discount) }),
    });

    await newProduct.save();

    res.status(201).json({ 
      message: "Product created successfully", 
      product: newProduct 
    });
  } catch (error) {
    console.error("Error creating product:", error);
    res.status(500).json({
      message: "Error creating product",
    });
  }
};

exports.deleteProduct = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);

    if (!deletedProduct) {
      return res.status(404).json({ message: "Product not found" });
    }

    await Promise.all([
      Cart.updateMany({}, { $pull: { products: { product: id } } }),
      Wishlist.updateMany({}, { $pull: { products: id } }),
      Review.deleteMany({ product: id }),
    ]);
    res.status(200).json({ message: "Product deleted successfully" });
  } catch (error) {
    console.error("Error deleting product:", error);
    res
      .status(500)
      .json({ message: "Error deleting product" });
  }
};
