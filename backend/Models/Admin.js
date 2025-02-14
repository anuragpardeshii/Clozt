const mongoose = require("mongoose");

const adminSchema = new mongoose.Schema({
  username: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true },
  mobile: { type: String, required: true },
});

const adminModel = mongoose.model("Admin", adminSchema);

module.exports = adminModel; // Correct export
