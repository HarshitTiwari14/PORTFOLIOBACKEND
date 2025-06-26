const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
require("dotenv").config();

const app = express();
app.use(cors());
app.use(express.json());

const allowedOrigins = [
  "http://localhost:5173", // Vite dev
  "https://your-frontend.vercel.app" // Replace with actual frontend domain
];

app.use(cors({
  origin: allowedOrigins,
  methods: ["GET", "POST"],
  credentials: true
}));


mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB connected"))
  .catch(err => console.error("Mongo Error", err));

const contactRoutes = require("./routes/contactRoutes");
app.use("/api", contactRoutes);

// Optional: health route
app.get("/", (req, res) => {
  res.send("Backend deployed successfully 🎉");
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

app.use(express.json());