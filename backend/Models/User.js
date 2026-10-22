const mongoose = require("mongoose");
const { Schema } = mongoose;

const addressSchema = new Schema({
  label: { type: String, trim: true, maxlength: 40, default: "Address" },
  address: { type: String, required: true, trim: true, maxlength: 200 },
  city: { type: String, required: true, trim: true, maxlength: 80 },
  state: { type: String, required: true, trim: true, maxlength: 80 },
  postalCode: { type: String, required: true, trim: true, maxlength: 20 },
  country: { type: String, required: true, trim: true, maxlength: 80 },
  isDefault: { type: Boolean, default: false },
});

const userSchema = new Schema(
  {
    username: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    mobile: { type: String },
    password: { type: String, required: true },
    role: { type: String, enum: ["customer", "admin"], default: "customer" },
    addresses: { type: [addressSchema], default: [] },
    lastLoginAt: { type: Date },
    lastActiveAt: { type: Date },
  },
  { timestamps: true, optimisticConcurrency: true }
);

module.exports = mongoose.model("User", userSchema);
