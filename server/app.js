require("dotenv").config({ path: "./config/config.env" });
const express = require("express");
const mongoose = require("mongoose");
const morgan = require("morgan");

const app = express();
const PORT = 3000;

// Middleware
app.use(require("cors")());
app.use(express.json());
app.use(morgan("dev"));

// routes
app.use("/api", require("./routes/auth"));

// Connect to MongoDB
mongoose
  .connect("mongodb://127.0.0.1/mydatabase")
  .then(() => {
    console.log("Connected to MongoDB");
    // Start the server
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((error) => {
    console.error("Error connecting to MongoDB:", error);
  });
