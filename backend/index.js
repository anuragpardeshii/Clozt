
require('dotenv').config();
const express = require('express');
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require('morgan');
app.use(morgan('dev'));
const multer = require('multer');
const fs = require('fs');
const path = require('path');
app.use(cors()); // Enable cross-origin requests
app.use(bodyParser.json()); // Parse JSON requests
const productRoutes = require("./Routes/productRoutes");
const PORT = process.env.PORT || 3000;
const MONGO_URI = process.env.MONGO_URI;

mongoose
  .connect(
    process.env.MONGO_URI
  )
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err);
  });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection is open");
});

app.get('/', (req, res) => {
    res.send('Hello, App is working');
});

app.use("/api/products", productRoutes);

app.listen(PORT, () => {
    console.log(`Server is running on http://localhost:${PORT}`);
});
