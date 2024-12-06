const Order = require("../models/OrderProduct");
const Product = require("../models/ProductModel");
const User = require("../models/UserModel")

const createOrder = (newOrder) => {
    return new Promise(async (resolve, reject) => {
        const { orderItems, paymentMethod, itemsPrice, shippingPrice, totalPrice, fullName, address, city, phone, user } = newOrder;
        try {
            const promises = orderItems.map(async (order) => {
                const productData = await Product.findOneAndUpdate(
                    {//tim san pham co id la product va co countinstock du de ban
                        _id: order?.product,
                        countInStock: { $gte: order?.amount },
                    },
                    {
                        $inc: {
                            countInStock: -order?.amount, // Giảm số lượng trong kho
                            selled: +order?.amount, // Tăng số lượng đã bán
                        },
                    },
                    { new: true } // Trả về dữ liệu đã cập nhật
                );
                console.log('productData', productData)
                if (productData) { // Nếu sản phẩm đủ số lượng, tạo đơn hàng
                    const createOrder = await Order.create({
                        orderItems,
                        shippingAddress: {
                            fullName,
                            address,
                            city,
                            phone,
                        },
                        paymentMethod,
                        itemsPrice,
                        shippingPrice,
                        totalPrice,
                        user: user,
                    });
                    if (createOrder) {
                        return {
                            status: 'thành công',
                            message: 'Đặt hàng thành công!',
                        };
                    }
                } else {
                    return {
                        status: 'thất bại',
                        message: 'Đặt hàng không thành công!',
                        id: order?.product, // ID sản phẩm không hợp lệ
                    };
                }
            });

            // Chờ tất cả các promises hoàn thành
            const results = await Promise.all(promises);
            const newData = results && results.filter((item) => item.id)//tra ve gia tri nhung san pham co id ko hop le
            if (newData.length) {
                resolve({
                    status: 'thất bại',
                    message: `sản phẩm với id${newData.join(', ')} đã hết hàng `
                })
            } else {
                resolve({
                    status: 'thành công',
                    message: 'Đặt hàng thành công',
                })
            }
            console.log('results', results);
        } catch (e) {
            reject(e); // Xử lý lỗi nếu có
        }
    });
};
const getOrderDetails = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const order = await Order.find({
                user: id
            })
            if (order === null) {
                resolve({
                    status: 'Lỗi',
                    message: 'Không tìm thấy sản phẩm!',
                })
            }
            resolve({
                status: 'Thành công',
                message: 'lấy data Order thành công ',
                data: order
            })
        } catch (e) {
            reject(e)
        }
    })
}
module.exports = {
    createOrder,
    getOrderDetails
};
