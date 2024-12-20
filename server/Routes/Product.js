const express = require('express');

const {create, deleteProduct, getAll, getOne, update, countProducts, getTotalValue, countStocks} = require('../controllers/ProductController.js');
const route = express.Router();
const multer = require('multer');

const storage = multer.diskStorage({
    destination: (req, file, cb)=>{
        cb(null, "uploads/");
    },
});
const upload = multer({storage});


route.post("/create", upload.single('imageUrl'),create);
route.get("/getAll",getAll);
route.get("/getOne/:id",getOne);
route.put("/update/:id",update);
route.delete("/deleteProduct/:id",deleteProduct);
route.get("/productcount",countProducts);
route.get("/totalprice",getTotalValue);
route.get("/totalstocks", countStocks);

module.exports = route;