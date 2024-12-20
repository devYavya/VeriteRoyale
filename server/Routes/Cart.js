const express = require('express');
const { addToCart, getCartItems, removeCartItem , getAllOrders} = require('../controllers/CartController');
const router = express.Router();

router.post('/addtocart', addToCart);
router.get('/getcart/:id',getCartItems);
router.delete('/removeitem/:id',removeCartItem);
router.get('/getAllOrders',getAllOrders);
// router.put('/updatequnatity:id',)
module.exports = router;
