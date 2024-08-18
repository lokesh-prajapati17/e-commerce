const express = require('express')
const mongoose = require('mongoose')
const router = express.Router()

const offersProductSchema = new mongoose.Schema({
    title: String,
    description: String,
    price: Number,
    discountPercentage: Number,
    rating: Number,
    stock: Number,
    brand: String,
    category: String,
    thumbnail: String,
    images: [String],
});

router.get('/offer',async(req, res)=>{
    try {
        res.send(global.fetchedOffersProducts)
    } catch (error) {
        console.log("error to fetch data offer", error)
        res.status(500).json({message:"error to fetch hotoffres products"})
    }
})

const modal = mongoose.model('offerProducts', offersProductSchema)

module.exports = router;