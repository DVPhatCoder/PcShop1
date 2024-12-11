const express = require("express");
const router = express.Router()
const OrderController = require('../controller/OrderController');
const { authUserMiddleware } = require("../middleware/authMiddleware");



router.post('/create', authUserMiddleware, OrderController.createOrder)
router.get('/get-all-order/:id', authUserMiddleware, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id', authUserMiddleware, OrderController.getOrderDetails)
router.delete('/cancel-order/:id', authUserMiddleware, OrderController.cancelOrderDetails)
module.exports = router