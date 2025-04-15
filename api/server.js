const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

// Connect to MongoDB
mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo Error", err));

// Routes
const contactRoutes = require("../routes/contactRoutes"); // Adjusted path!
app.use("/api", contactRoutes);

// ⚠️ DO NOT use app.listen()

// Export the handler
const serverless = require("serverless-http");
module.exports = serverless(app);
