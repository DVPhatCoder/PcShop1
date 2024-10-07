const mongoose = require('mongoose')
const orderSchema = new mongoose.Schema({
    orderItems: [
        {
            name: {
                type: String,
                required: [true, 'không được để trống '],
            },
            amount: { //so lượng
                type: Number,
                required: [true, 'không được để trống '],
            },
            image: {
                type: String,
                required: [true, 'không được để trống '],
            },
            price: {
                type: Number,
                required: [true, 'không được để trống '],
            },
            product: { // join bảng product vào trong orderproduct
                type: mongoose.Schema.Types.ObjectId,
                ref: 'Product',
                required: true,
            },
        }
    ],
    shippingAddress: {//dia chi giao hang
        fullName: {
            type: String,
            required: [true, 'không được để trống '],
        },
        address: {
            type: String,
            required: [true, 'không được để trống '],
        },
        city: {
            type: String,
            required: [true, 'không được để trống '],
        },
        phone: {
            type: number,
            required: [true, 'không được để trống '],
        },
    },
    paymentMethod: { //phuong thuc thanh toan
        type: String,
        required: true
    },
    itemsPrice: { // gia san pham
        type: Number,
        required: true
    },
    shippingPrice: { //gia ship
        type: Number,
        required: true
    },
    taxPrice: { //thue san pham
        type: Number,
        required: true
    },
    totalPrice: { //tong gia tien
        type: Number,
        required: true
    },
    user: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    isPaid: { //da tra tien hay chua
        type: Boolean,
        default: false
    },
    paidAt: {// thoi gian tra tien
        type: Date
    },
    isDelivered: { // da giao hang thanh cong hay chua
        type: Boolean,
        default: false
    },
    deliveredAt: { // thoi gian giao hang
        type: Date
    },
},
    {
        timestamps: true,
    }
);
const Order = mongoose.model('Order', orderSchema);
module.exports = Order
