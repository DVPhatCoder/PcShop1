const mongoose = require('mongoose')
const productSchema = new mongoose.Schema(
    {
        name: {
            type: String,
            required: [true, 'không được để trống '],
            unique: true
        },
        image: {
            type: String,
            required: [true, 'không được để trống '],
        },
        type: {
            type: String,
            required: [true, 'không được để trống '],
        },
        price: {
            type: Number,
            required: [true, 'không được để trống '],
            min: [0, 'số lượng phải là số dương']
        },
        countInStock: {// so lượng sản phẩm còn trong kho
            type: Number,
            required: true,
            min: [0, 'số lượng phải là số dương']
        },
        rating: {
            type: Number,
            required: true,
            min: [0],
            max: [5]
        },
        description1: {
            type: String,
            default: '',

        },
        description: {
            type: String,
            default: '',
        },
        discount: {
            type: Number,

        },
        selled: {
            type: Number,
        },
    },
    {
        timestamps: true,
    }
);
const Product = mongoose.model('Product', productSchema);
module.exports = Product;