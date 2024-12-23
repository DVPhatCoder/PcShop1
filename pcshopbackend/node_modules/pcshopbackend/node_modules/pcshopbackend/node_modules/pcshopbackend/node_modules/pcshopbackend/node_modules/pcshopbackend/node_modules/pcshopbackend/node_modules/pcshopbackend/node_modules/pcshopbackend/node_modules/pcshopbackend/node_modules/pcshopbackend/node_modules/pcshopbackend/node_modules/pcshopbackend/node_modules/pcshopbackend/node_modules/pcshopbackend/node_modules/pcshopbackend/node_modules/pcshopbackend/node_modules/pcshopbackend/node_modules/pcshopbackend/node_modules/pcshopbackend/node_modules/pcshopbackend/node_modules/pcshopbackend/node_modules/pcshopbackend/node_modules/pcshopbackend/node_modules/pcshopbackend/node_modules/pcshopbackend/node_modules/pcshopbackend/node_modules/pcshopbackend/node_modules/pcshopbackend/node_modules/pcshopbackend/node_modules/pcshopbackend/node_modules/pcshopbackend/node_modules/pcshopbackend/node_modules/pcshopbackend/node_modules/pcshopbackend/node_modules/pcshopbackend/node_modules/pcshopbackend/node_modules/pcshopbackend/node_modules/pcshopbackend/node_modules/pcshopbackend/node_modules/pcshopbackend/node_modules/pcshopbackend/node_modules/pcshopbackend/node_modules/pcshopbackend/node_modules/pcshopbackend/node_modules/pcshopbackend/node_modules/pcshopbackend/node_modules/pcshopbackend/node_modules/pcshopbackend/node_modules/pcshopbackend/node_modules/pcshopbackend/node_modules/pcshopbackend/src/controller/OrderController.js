const OrderServices = require('../services/OrderServices')
const createOrder = async (req, res) => {
    try {
        const { paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone } = req.body
        if (!paymentMethod || !itemsPrice || shippingPrice === undefined || !totalPrice || !fullName || !address || !city || !phone) {
            return res.status(400).json({
                status: 'Lỗi',
                message: 'Thiếu thông tin!',
            })
        }
        const response = await OrderServices.createOrder(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllOrderDetails = async (req, res) => {
    try {
        const userID = req.params.id
        if (!userID) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'người dùng không tồn tại',
            })
        }
        const response = await OrderServices.getAllOrderDetails(userID)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getOrderDetails = async (req, res) => {
    try {
        const orderID = req.params.id
        if (!orderID) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Order không tồn tại',
            })
        }
        const response = await OrderServices.getOrderDetails(orderID)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const cancelOrderDetails = async (req, res) => {
    try {
        const orderID = req.params.id
        if (!orderID) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Sản phẩm không tồn tại',
            })
        }
        const response = await OrderServices.cancelOrderDetails(orderID)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllOrderUser = async (req, res) => {
    try {
        const data = await OrderServices.getAllOrderUser()
        return res.status(200).json(data)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const markOrderAsReceivedController = async (req, res) => {
    try {
        const response = await OrderServices.markOrderAsReceived(req.params.id);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(500).json({
            message: e
        });
    }
};
module.exports = {
    createOrder,
    getAllOrderDetails,
    getOrderDetails,
    cancelOrderDetails,
    getAllOrderUser,
    markOrderAsReceivedController
} 
