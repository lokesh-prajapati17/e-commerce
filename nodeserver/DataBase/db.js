const mongoose = require('mongoose')

const DATABASE_URL = "mongodb://127.0.0.1:27017/ecommerce"

const mongoDB = async() =>{
    try {
        await mongoose.connect(DATABASE_URL)
        console.log("database connected successfully")

        const hotOffersProducts = mongoose.connection.db.collection('offerProducts')
        const fetchedOffersProducts =await hotOffersProducts.find({}).toArray();
        global.fetchedOffersProducts = fetchedOffersProducts;

        const womensCar = mongoose.connection.db.collection('categoryCarousel');
        const fetchedWomensCar = await womensCar.find({}).toArray()
        global.fetchedWomensCar = fetchedWomensCar;

        const MensClothes = mongoose.connection.db.collection('mensCloths');
        const fetchedMensClothes = await MensClothes.find({}).toArray();
        global.fetchedMensClothes = fetchedMensClothes

        const WomensClothes = mongoose.connection.db.collection('WomenClothes')
        const fetchedWomensClothes = await WomensClothes.find({}).toArray();
        global.fetchedWomensClothes = fetchedWomensClothes

        const Cart = mongoose.connection.db.collection('carts')
        const fetchedCart = await Cart.find({}).toArray()
        global.fetchedCart  = fetchedCart

        const GetUser = mongoose.connection.db.collection('logins')
        const fetchedUser = await GetUser.find({}).toArray();
        global.fetchedUser = fetchedUser

        const GtOreders = mongoose.connection.db.collection('orders')
        const fetchedOrders = await GtOreders.find({}).toArray();
        global.fetchedOrders = fetchedOrders
    } catch (error) {
        console.log("error to connect", error)
    }
}

module.exports = mongoDB
