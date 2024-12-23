const express = require("express");
const router = express.Router()
const OrderController = require('../controller/OrderController');
const { authUserMiddleware, authMiddleware } = require("../middleware/authMiddleware");



router.post('/create', OrderController.createOrder)
router.get('/get-all-order/:id', authUserMiddleware, OrderController.getAllOrderDetails)
router.get('/get-details-order/:id', authUserMiddleware, OrderController.getOrderDetails)
router.delete('/cancel-order/:id', OrderController.cancelOrderDetails)
router.get('/get-all-order-user', authMiddleware, OrderController.getAllOrderUser)
router.put('/mark-received/:id', OrderController.markOrderAsReceivedController);
module.exports = router