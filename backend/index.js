const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();

// Middleware
app.use(cors());
app.use(bodyParser.json());

// Connect to MongoDB
mongoose
  .connect("mongodb://localhost:27017/userdata")
  .then(() => console.log("MongoDB connected"))
  .catch((err) => console.log(err));

// Define a user schema
const userSchema = new mongoose.Schema({
  name: String,
  email: String,
  age: Number,
});

const User = mongoose.model("User", userSchema);

// API to receive POST requests from React
app.post("/api/users", async (req, res) => {
  const { name, email, age } = req.body;
  try {
    const newUser = new User({ name, email, age });
    await newUser.save();
    res.status(201).json(newUser);
  } catch (err) {
    res.status(500).json({ error: "Error saving user to database" });
  }
});

// Start the server
app.listen(3000, () => {
  console.log("Server is running on port 3000");
});
