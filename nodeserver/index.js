const express = require('express');
const mongoDB = require('./DataBase/db');

const bodyParser = require('body-parser');
const cors = require('cors'); 

mongoDB();

const app = express();
const PORT = 5000;

app.use(cors());

app.use(express.json());
app.use(bodyParser.json());

app.use('/api', require('./Routes/Login/Registration'));
app.use('/api', require('./Routes/HotOffersProduc'));
app.use('/api', require('./Routes/carouselProductsWomens'));
app.use('/api', require('./Routes/MensClothes'));
app.use('/api', require('./Routes/WomensProducts'));
app.use('/api', require('./Routes/Cart'));
app.use('/api', require('./Routes/ConformedOrders'));
app.use('/api',require('./Routes/mobilesRoute'))
app.use('/api', require('./Routes/finalOrderDetails'))
app.use('/api',require('./Routes/mensCarouselProducts'))
app.listen(PORT, () => console.log(`Server running on ${PORT}`));
