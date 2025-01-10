const Cart = require('../modles/Cart');
const User = require('../modles/User');
const Product = require('../modles/Product');
const orders = require('../modles/Orders');
const { default: mongoose } = require('mongoose');
const { confirmMail, sendMail } = require('../Mail/Mail');

const addToCart = async (req, res) => {
    const { userId, productId } = req.body;
    console.log(userId, productId);
    if (!userId || !productId) {
        return res.status(400).json({ msg: "User  ID and Product ID are required" });
    }

    try {
        
        const user = await User.findById(userId);
        const product = await Product.findById(productId);

        if (!user || !product) {
            return res.status(404).json({ msg: "User  or Product not found" });
        }

        let cart = await Cart.findOne({ userId:user._id });

        if (!cart) {
            cart = new Cart({
                userId: user._id,
                userName: user.name,
                userEmail: user.email,
                products: []
            });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === productId);

        if (productIndex > -1) {
            cart.products[productIndex].quantity += 1;
        } else {
            cart.products.push({
                productId: product._id,
                name: product.name,
                price: product.price,
                quantity: 1
            });
        }

        await cart.save();
        res.status(200).json(cart);
    } catch (error) {
        res.status(500).json({ msg: "Server error", error });
    }
};

const getCartItems = async (req, res) => {
    const {id} = req.params; 

    try {
        const cart = await Cart.findOne({ userId: id }).populate('products.productId');
        
        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        const cartItems = cart.products.map(item => ({
            productId: item.productId._id,
            name: item.productId.name,
            price: item.productId.price,
            quantity: item.quantity,
            imageUrl: item.productId.imageUrl
        }));

        res.status(200).json(cartItems);
    } catch (error) {
        console.error('Error fetching cart items:', error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

const removeCartItem = async (req, res) => {
    const userId = req.user._id;
    // console.log(req.user)
    const { id } = req.params;

    try {
        const cart = await Cart.findOne({ userId: userId });

        if (!cart) {
            return res.status(404).json({ msg: "Cart not found" });
        }

        const productIndex = cart.products.findIndex(p => p.productId.toString() === id);

        if (productIndex === -1) {
            return res.status(404).json({ msg: "Product not found in cart" });
        }

        cart.products.splice(productIndex, 1);

        await cart.save();

        res.status(200).json({ msg: "Product removed from cart", cart });
    } catch (error) {
        console.error('Error removing item from cart:', error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

const create = async(req, res) =>
{
    try 
    {
        const { userId,  address } = req.body;
        const user = await User.findById(userId);
        const carts = await Cart.findOne({userId:new mongoose.Types.ObjectId(userId)});
        let Cartproducts = [];
        let totolAmt = 0;
        carts.products.map((data)=>{
            Cartproducts.push({
                product:data.productId,
                quantity:data.quantity,
                
            });
            totolAmt += data.price;
        })
        const order = new orders ({
                user: user._id,
                // userName: user.name,
                // userEmail: user.email,
                products: Cartproducts,
                totalAmount:totolAmt,
                shippingAddress:address
          });
          order.save();

          const productDetails = Cartproducts.map(item => 
            `Product ID: ${item.product}, Quantity: ${item.quantity}`
        ).join('\n');

        const emailContent = `
            Dear ${user.name},

            Thank you for choosing Royale Verite!,
            We are pleased to confirm that we have received your order.

            Order Details:
             ${productDetails}

            Total Amount: ₹${totolAmt.toFixed(2)}
            Shipping Address: ${address}

            We appreciate your business and hope you enjoy your purchase!

            Best regards,
            Royale Verite Team
        `;

        sendMail(user.email, "Order Confirmation - Thank You for Your Purchase!", emailContent);
       
          await Cart.deleteOne({userId:new mongoose.Types.ObjectId(userId)});
          
        
        res.status(200).json({sucess:true, msg: "Huraay ! order placed"});
    }
    catch(error){
        console.error('Error removing item from cart:', error);
        res.status(500).json({ msg: "Server error", error: error.message }); 
    }
}

const getAllOrders = async (req, res) => {
    try {
        const order = await orders.find().populate('user').populate('products.product');
        // console.log("orders");
        // console.log(order[0].products);
        const forders = order.flatMap(order => 
            order.products.map(product => ({
                orderId: order._id,
                // userId: order.user._id,
                userName: order.user.name,
                userEmail: order.user.email,
                productName: product.product.name,
                quantity: product.quantity,
                price: product.product.price,
                total: product.quantity * product.product.price,
                orderDate: order.updatedAt, 
                status: order.status
            }))
        );

        res.status(200).json(forders);
    } catch (error) {
        console.error('Error fetching all orders:', error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

const countOrders = async (req, res) => {
    try {
        const orderc = await orders.find();
        
        const totalOrders = orderc.reduce((total, count) => {
            return total + count.products.length;
        }, 0);

        res.status(200).json({ count: totalOrders });
    } catch (error) {
        console.error('Error counting orders:', error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};

const getTotalOrdersPrice = async (req, res) => {
    try {
        const orderp = await orders.find().populate('products.product');
        
        const totalPrice = orderp.reduce((total, op) => {
            return total + op.products.reduce((cartTotal, product) => {
                return cartTotal + (product.quantity * product.product.price);
            }, 0);
        }, 0);

        res.status(200).json({ totalPrice: totalPrice });
    } catch (error) {
        console.error('Error calculating total orders price:', error);
        res.status(500).json({ msg: "Server error", error: error.message });
    }
};





module.exports = {
    create,
    addToCart,
    getCartItems,
    removeCartItem,
    getAllOrders,
    countOrders,
    getTotalOrdersPrice
 };
