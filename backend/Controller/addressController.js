const mongoose = require("mongoose");
const User = require("../Models/User");

const fields = {
  label: 40,
  address: 200,
  city: 80,
  state: 80,
  postalCode: 20,
  country: 80,
};

function addressInput(body) {
  if (!body || typeof body !== "object" || Array.isArray(body)) return null;
  const address = {};
  for (const [field, limit] of Object.entries(fields)) {
    const value = field === "label" && body[field] === undefined ? "Address" : body[field];
    if (typeof value !== "string" || !value.trim() || value.trim().length > limit) return null;
    address[field] = value.trim();
  }
  return address;
}

function makeDefault(user, addressId) {
  user.addresses.forEach((address) => {
    address.isDefault = address._id.toString() === addressId.toString();
  });
}

function addressResponse(user) {
  return { addresses: user.addresses };
}

function requestFailure(res, error, message) {
  if (error.name === "VersionError") {
    return res.status(409).json({ message: "Your addresses changed. Refresh and try again." });
  }
  console.error(message, error);
  return res.status(500).json({ message });
}

exports.list = (req, res) => res.json(addressResponse(req.user));

exports.create = async (req, res) => {
  const input = addressInput(req.body);
  if (!input) return res.status(400).json({ message: "Complete a valid address before saving" });
  try {
    const user = await User.findById(req.user._id);
    const isDefault = !user.addresses.some((address) => address.isDefault) || req.body.isDefault === true;
    user.addresses.push({ ...input, isDefault });
    if (isDefault) makeDefault(user, user.addresses[user.addresses.length - 1]._id);
    await user.save();
    return res.status(201).json(addressResponse(user));
  } catch (error) {
    return requestFailure(res, error, "Could not save address");
  }
};

exports.update = async (req, res) => {
  const input = addressInput(req.body);
  if (!mongoose.isValidObjectId(req.params.addressId) || !input) {
    return res.status(400).json({ message: "Complete a valid address before saving" });
  }
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });
    address.set(input);
    if (req.body.isDefault === true) makeDefault(user, address._id);
    else if (!user.addresses.some((entry) => entry.isDefault)) makeDefault(user, address._id);
    await user.save();
    return res.json(addressResponse(user));
  } catch (error) {
    return requestFailure(res, error, "Could not update address");
  }
};

exports.setDefault = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.addressId)) return res.status(400).json({ message: "Invalid address" });
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });
    makeDefault(user, address._id);
    await user.save();
    return res.json(addressResponse(user));
  } catch (error) {
    return requestFailure(res, error, "Could not set default address");
  }
};

exports.remove = async (req, res) => {
  if (!mongoose.isValidObjectId(req.params.addressId)) return res.status(400).json({ message: "Invalid address" });
  try {
    const user = await User.findById(req.user._id);
    const address = user.addresses.id(req.params.addressId);
    if (!address) return res.status(404).json({ message: "Address not found" });
    address.deleteOne();
    if (user.addresses.length && !user.addresses.some((entry) => entry.isDefault)) makeDefault(user, user.addresses[0]._id);
    await user.save();
    return res.json(addressResponse(user));
  } catch (error) {
    return requestFailure(res, error, "Could not delete address");
  }
};
