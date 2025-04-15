const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

// Schema
const contactSchema = new mongoose.Schema({
  name: String,
  email: String,
  message: String,
});
const Contact = mongoose.model("Contact", contactSchema);

// POST route
router.post("/contact", async (req, res) => {
  try {
    const newContact = new Contact(req.body);
    await newContact.save();
    res.status(200).json({ message: "Message sent successfully!" });
  } catch (error) {
    console.error("Error saving contact:", error);
    res.status(500).json({ error: "Failed to send message" });
  }
});

module.exports = router;
