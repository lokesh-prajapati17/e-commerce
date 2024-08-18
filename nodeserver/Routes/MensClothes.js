const express = require('express')
const router = express.Router();

router.get('/MensClothes',async(req,res)=>{
    try {
        res.send(global.fetchedMensClothes)
    } catch (error) {
        console.log("error to fetch data mens clothes",error)
        res.status(500).json({message:error})
    }
})

module.exports = router