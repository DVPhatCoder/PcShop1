const express = require("express");
const router = express.Router()
const OrderController = require('../controller/OrderController');
const { authUserMiddleware } = require("../middleware/authMiddleware");



router.post('/create', authUserMiddleware, OrderController.createOrder)
router.get('/get-order-details/:id', authUserMiddleware, OrderController.getOrderDetails)

module.exports = router