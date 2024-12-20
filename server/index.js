require('dotenv').config();
const express = require('express');
const app = express();
const cors = require("cors");
const path = require("path");
require('./db');
const route = require('./Routes/Product.js');
const stories = require('./Routes/Stories.js');

const AuthRouter = require('./Routes/Auth');
const bodyParser = require('body-parser');

const cart_route = require('./Routes/Cart');
const { verifyJWT } = require('./middlewares/verifyJWT.js');
const orders = require('./Routes/Orders.js');
const custom = require('./Routes/Services.js');

app.use(bodyParser.json());
app.use(cors());
app.use("/uploads",express.static(path.join(__dirname,"uploads/")));
app.use('/auth',AuthRouter);
app.use("/api",route);
app.use("/stories",stories)
app.use("/orders",orders)
app.use("/custom",custom)
app.use(verifyJWT);
app.use('/cart',cart_route);

const PORT = process.env.PORT || 8000;
app.listen(PORT, ()=>{console.log(`Listening on port ${PORT}.....`)});


