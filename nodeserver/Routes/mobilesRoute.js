const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const MobileSchema = mongoose.Schema({
  _id: Number,
  brand: String,
  model: String,
  release_year: String,
  display_size: String,
  resolution: String,
  camera_setup: String,
  processor: String,
  ram: String,
  storage: String,
  battery_capacity: String,
  colors: {
    0: String,
    1: String,
  },
  price: Number,
  description: String,
  image: String,
  rating: {
    average: Number,
    count: Number,
  },
});

const mobileSchema = mongoose.model("mobiles", MobileSchema);

router.get("/mobile", async (req, res) => {
  try {
    const data = await mobileSchema.find({});
    res.status(200).send(data);
  } catch (err) {
    console.log(err);
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;
