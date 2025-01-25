require("dotenv").config();
const express = require("express");
const app = express();
require("dotenv").config();
const mongoose = require("mongoose");
const morgan = require("morgan");
const userModel = require("./Models/User");
const multer = require("multer");
const fs = require("fs");
const cors = require("cors");
const bodyParser = require("body-parser"); 
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");
const productRoutes = require("./Routes/productRoutes");
const getProducts = require("./Routes/productRoutes");
const PORT = process.env.PORT || 3000;
const MONGO_URI = "mongodb+srv://pardeshianurag22:qwertyuiop@clozt.bxmri.mongodb.net/?retryWrites=true&w=majority&appName=Clozt";

app.use(bodyParser.json()); // Parse JSON requests
app.use(morgan("dev"));

// Middleware to parse incoming JSON and URL-encoded data
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));


app.use(cors({
  origin: "http://localhost:5173", // Vite dev server
  credentials: true, // Allow cookies to be sent
}));

mongoose
  .connect(MONGO_URI)
  .then(() => {
    console.log("MongoDB database connection established successfully");
  })
  .catch((err) => {
    console.error("Error connecting to MongoDB:", err.message);
  });

const connection = mongoose.connection;

connection.once("open", () => {
  console.log("MongoDB connection is open");
});

app.get("/", (req, res) => {
  res.send("Hello, App is working");
});

app.use("/api/products", productRoutes);

// Create user signin
app.post("/create", async (req, res) => {
  try {
    let { username, email, password, mobile } = req.body;

    bcrypt.genSalt(10, (err, salt) => {
      bcrypt.hash(password, salt, async (err, hash) => {
        
    // Validate input
    if (!username || !email || !password || !mobile) {
      return res.status(400).json({ message: "All fields are required." });
    }

    // Check if user already exists
    const existingUser = await userModel.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ message: "User with this email already exists." });
    }

    // Create user
    let createdUser = await userModel.create({
      username,
      email,
      password: hash,
      mobile,
    });

    let token = jwt.sign({email}, "secretkey");
    res.cookie("token", token);
    res.status(201).json({
      message: "User created successfully.",
      user: { username: createdUser.username, email: createdUser.email },
    });
  })
})
  } catch (err) {
    console.error("Error creating user:", err);

    // Handle unique email constraint error
    if (err.code === 11000) {
      return res.status(400).json({ message: "Email already in use." });
    }

    res.status(500).json({ message: "Internal server error." });
  }
});

// new file 
app.use("/api/products", productRoutes);
router.get("/products", getProducts);// New route to get all products

// login
app.post("/login-user", async (req, res) => {
  let user = await userModel.findOne({email: req.body.email});
  if(!user) return res.send("User does not exist");

  bcrypt.compare(req.body.password, user.password, function (err, result) {
    if (err) {
      console.error("Error during bcrypt comparison:", err);
      return res.status(500).send("Internal server error");
    }
    if (result) {
      let token = jwt.sign({ email: user.email }, "secretkey");
      res.cookie("token", token, { 
        httpOnly: true,
        secure: false, // Set true in production with HTTPS
        sameSite: "lax", // Controls cookie sharing between origins
          });
      res.send("yes you can login");
    } else {
      res.status(401).send("Wrong Password");
    }
  });
}); 

//log out
app.get("/logout", (req,res) => {
  res.cookie("token", "");
  res.redirect("/");
})

app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
