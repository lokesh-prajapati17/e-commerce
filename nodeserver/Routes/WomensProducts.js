const express = require('express')
const router = express.Router();

router.get('/WomensClothes', async(req,res)=>{
    try {

        res.send(global.fetchedWomensClothes)
    } catch (error) {
        console.log("error to fetch data womens clothes",error)
        res.status(500).json({message:error})
    }
})
module.exports = router