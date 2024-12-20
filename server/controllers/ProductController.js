const Product = require('../modles/Product.js');
// const mongoose = require('mongoose');

const create = async(req, res)=>{
    try
    {
        console.log(req.body);
        const ProductData1 = req.body;
        ProductData1.imageUrl = req.file.path;
        const ProductData = new Product(ProductData1);
        
        if(!ProductData)
        {
            return res.status(404).json({msg:"Product not found"});
        }

        const saveData = await ProductData.save();
        res.status(200).json(saveData);
    }
    catch(error)
    {
        res.status(500).json({error:error});
    }

}

const getAll = async(req,res) =>
{
    try{
        const ProductData = await Product.find();

        if(!ProductData)
        {
            return res.status(404).json({msg:"Product not found"});
        }

        res.status(200).json(ProductData);

    }
    catch(error)
    {
        res.status(500).json({msg:"OOPS! Something went Wrong"});
    }
}

const getOne = async (req, res) => {
    try {
        const productId = req.params.id;
        const productExist = await Product.findById(productId);

        if (!productExist) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json(productExist);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const update = async (req, res) => {
    try {
        const productId = req.params.id;
        const updatedProduct = await Product.findByIdAndUpdate(productId, req.body, { new: true });// update kr rahi hai yaha pe 

        if (!updatedProduct) {
            return res.status(401).json({ msg: "Product not found" });
        }

        res.status(200).json(updatedProduct);
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

 const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id;
        const deletedProduct = await Product.findByIdAndDelete(productId);

        if (!deletedProduct) {
            return res.status(404).json({ msg: "Product not found" });
        }

        res.status(200).json({ msg: "Product deleted successfully" });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const countProducts = async (req, res) => {
    try {
        const count = await Product.countDocuments();
        res.status(200).json({ count: count });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}
const getTotalValue = async (req, res) => {
    try {
        const products = await Product.find();
        const totalValue = products.reduce((sum, product) => {
            return sum + (product.price * product.stock);
        }, 0);
        
        res.status(200).json({ totalValue: totalValue });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}

const countStocks = async (req, res) => {
    try {
        const result = await Product.aggregate([
            {
                $group: {
                    _id: null,
                    totalStocks: { $sum: "$stock" }
                }
            }
        ]);

        const totalStocks = result.length > 0 ? result[0].totalStocks : 0;
        res.status(200).json({ totalStocks: totalStocks });
    } catch (error) {
        res.status(500).json({ error: error.message });
    }
}



module.exports=
{
    create,
    getAll,
    getOne,
    update,
    deleteProduct,
    countProducts,
    getTotalValue,
    countStocks
}