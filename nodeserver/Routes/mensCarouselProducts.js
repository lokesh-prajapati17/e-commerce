const mongoose = require("mongoose")
const express = require('express')
const router = express.Router();

const productSchema = mongoose.Schema({
    id:String,
    title:String,
    price:Number,
    description:String,
    category:String,
    image:String,
    rate:Number,
    count:Number
})

const productModel = mongoose.model('menscarouselproducts',productSchema)

router.get('/menscarousel', async(req,res)=>{
    try {
        const data = await productModel.find({});
        res.status(200).json(data)
    } catch (error) {
        console.log(error)
        res.status(500).json({message:error.message})
    }
})

module.exports = router