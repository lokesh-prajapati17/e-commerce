const express = require("express");
const mongoose = require("mongoose");
const router = express.Router();

const orderSchema = mongoose.Schema({
  userId: String,
  user: String,
  itemName: Array,
  price: Array,
  total: Number,
  address: String,
});

const orderModel = mongoose.model("orderdetails", orderSchema);

router.post("/finalorders", async (req, res) => {
  try {
    const { userId, user, itemName, price, total, address } = req.body;
    const data = new orderModel({
      userId,
      user,
      itemName,
      price,
      total,
      address,
    });
    await data.save();
    res.status(200).json(data);
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error });
  }
});

router.get("/finalorders/:name/:id", async (req, res) => {
  try {
    const uId = req.params.id;
    const name = req.params.name;
    const data = await orderModel.find({ user: name, userId: uId });
    res.status(200).json(data);
  } catch (error) {
    console.error(error);
    res.status(500).json({ message: "Internal Server Error" });
  }
});

module.exports = router;
