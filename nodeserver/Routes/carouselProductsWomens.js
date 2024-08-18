const express = require('express')
const router = express.Router()
const mongoose = require('mongoose')

router.get('/womensCar', async(req, res)=>{
    try {
        res.send(global.fetchedWomensCar)
    } catch (error) {
        console.log("error to fetch data womens Carousel", error)
        res.status(500).json({message:error})
    }
})

module.exports = router