const express = require('express');
const { create, getAllOrders, countOrders, getTotalOrdersPrice} = require('../controllers/CartController');
const router = express.Router();

router.post('/create',create);
router.get('/getAllOrders',getAllOrders);
router.get('/countOrders',countOrders);
router.get('/getTotalOrdersPrice',getTotalOrdersPrice);

module.exports = router;
