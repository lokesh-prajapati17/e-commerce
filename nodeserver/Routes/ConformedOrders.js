const express = require("express");
const router = express.Router();
const mongoose = require("mongoose");

const Schema = mongoose.Schema({
  title: String,
  price: String,
  image: String,
  rate: String,
  date: {
    type: Date,
    default: Date.now,
  },
  userId: String,
  user: String,
});

const dataSchema = mongoose.model("orders", Schema);
// router.post('/order',async(req, res)=>{
//     try {
//         const {title, price, image, rate} = req.body;
//         const data = new dataSchema({
//             title,
//             price,
//             image,
//             rate
//         })
//         await data.save()
//         res.status(201).json(data)
//     } catch (error) {
//         console.log("error to store data orders",error)
//         res.status(500).json({message:"error to store order data"})
//     }
// })

router.post("/order", async (req, res) => {
  const orders = req.body;
  const objectData = await Promise.all(
    orders.map((item) => {
      const { title, image, rate, price, userId, user } = item;
      const data = new dataSchema({
        title,
        image,
        rate,
        price,
        userId,
        user,
      });
      return data.save();
    })
  );
  res.status(201).json(objectData);
});

router.get("/order/:name/:id", async (req, res) => {
  try {
    const name = req.params.name;
    const uId = req.params.id;
    const data = await dataSchema.find({ userId: uId, user: name });
    res.status(200).json(data);
  } catch (error) {
    console.log("error to fetch data order", error);
    res.status(500).json({ message: error });
  }
});

router.delete("/order/:id", async (req, res) => {
  try {
    const id = req.params.id;
    const deletedItem = await dataSchema.findByIdAndDelete(id);
    res.status(200).json({ message: "success" });
    res.send(deletedItem);
  } catch (error) {
    console.log("error to delete", error);
    res.status(500).json({ message: error });
  }
});

module.exports = router;
