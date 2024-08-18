const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: String,
  price: String,
  description: String,
  category: String,
  image: String,
  rate: String,
  count: Number,
  userId: String,
  user: String,
});

const DataSchema = mongoose.model("carts", Schema);

router.get("/Cart/:name/:id", async (req, res) => {
  try {
    const name = req.params.name;
    const uId = req.params.id
    const data = await DataSchema.find({userId:uId, user:name});
    res.status(200).json(data)
  } catch (error) {
    console.log("error to fetch data cart", error);
    res.status(500).json({ message: error });
  }
});

router.post("/Cart", async (req, res) => {
  try {
    const {
      title,
      price,
      description,
      category,
      image,
      rate,
      count,
      userId,
      user,
    } = req.body;
    const data = new DataSchema({
      title,
      price,
      description,
      category,
      image,
      rate,
      count,
      userId,
      user,
    });

    await data.save();
    res.status(201).json(data);
  } catch (error) {
    console.error("Error saving cart data:", error);
    res.status(500).json({ message: "Error saving cart data" });
  }
});

router.delete("/Cart/:id", async (req, res) => {
  try {
    const ids = req.params.id.split(",");
    console.log("IDs received:", ids);

    const deletedItems = await DataSchema.deleteMany({ _id: { $in: ids } });

    if (!deletedItems) {
      return res.status(404).json({ message: "Items not found" });
    }

    res.json({ message: "Items deleted successfully", deletedItems });
  } catch (error) {
    console.error("Error deleting cart data:", error);
    res.status(500).json({ message: "Error deleting cart data", error });
  }
});

module.exports = router;
