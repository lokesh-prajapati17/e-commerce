const express = require("express");
const router = express.Router();
const cors = require("cors");
const mongoose = require("mongoose");


const Schema = mongoose.Schema({
  fname: String,
  lname: String,
  number: Number,
  location: String,
  pincode: Number,
  email: String,
  password: String,
  address: String,
});

const DataSchema = mongoose.model("login", Schema);
router.use(cors());

router.post("/registration", async (req, res) => {
  try {
    const {
      fname,
      lname,
      number,
      location,
      pincode,
      email,
      password,
      address,
    } = req.body;

    const data = new DataSchema({
      fname,
      lname,
      number,
      location,
      pincode,
      email,
      password,
      address,
    });
    await data.save();
    res.status(201).json(data);
  } catch (error) {
    console.log("error to post data registration", error);
    res.status(500).json({ message: "Internal server Error" });
  }
});

router.put('/registration/:id',async(req, res)=>{
  try {
    const id = req.params.id;
    const data = req.body
    console.log(data)
    const newData = await DataSchema.findByIdAndUpdate(id,data,{new:true});
    await newData.save();
    res.status(200).json(newData) 
  } catch (error) {
    console.log(error)
    res.status(500).status({message:error})
  }
})

router.get('/getuser', async(req,res)=>{
    try {
        res.send(global.fetchedUser)
    } catch (error) {
        console.log("error to fetch data getuser", error)
        res.status(500).json({message:"Internal server error"})
    }
})

router.get('/getuser/:id', async(req, res)=>{
  try {
    const id = req.params.id;
    const data = await DataSchema.findById({_id:id})
    if(!data){
      console.log("user not found!!")
    }
    else{
    res.status(200).json(data)}
  } catch (error) {
    console.log(error)
    res.status(500).json(error.message)
  }
})

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    const user = await DataSchema.findOne({ email, password });
    if (!user) {
      return res.status(401).json({ message: "invalid email and password" });
    }
    res.status(200).json({ message: "login Successful", user });
  } catch (error) {
    console.log("error to post data login", error);
    res.status(500).json({ message: "Internal server error" });
  }
});

module.exports = router;
