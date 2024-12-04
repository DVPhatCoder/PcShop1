const Product = require("../models/ProductModel.js")

const createProduct = (newProduct) => {
    return new Promise(async (resolve, reject) => {
        const { name, image, type, price, countInStock, rating, description, discount } = newProduct
        try {
            const checkProduct = await Product.findOne({
                name: name,
            })
            if (checkProduct !== null) {
                resolve({
                    status: 'lỗi',
                    message: 'Tên này đã được sử dụng'
                })
            }

            const newProduct = await Product.create({
                name, image, type, price, countInStock: Number(countInStock), rating, description, discount: Number(discount)
            })
            if (newProduct) {
                resolve({
                    status: 'thành công',
                    message: `Tạo sản phẩm thành công `,
                    data: newProduct,
                })

            }

        } catch (e) {
            reject(e)
        }
    });
}

const updateProduct = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                name: data.name,
                _id: { $ne: id }
            });

            if (checkProduct) {
                return reject({
                    status: 'Lỗi',
                    message: 'Tên này đã được sử dụng!',
                });
            }

            const productToUpdate = await Product.findById(id);
            if (!productToUpdate) {
                return reject({
                    status: 'Lỗi',
                    message: 'Không tìm thấy sản phẩm!',
                });
            }

            const updatedProduct = await Product.findByIdAndUpdate(id, data, { new: true });
            resolve({
                status: 'thành công',
                message: 'Cập nhật sản phẩm thành công',
                data: updatedProduct,
            });
        } catch (e) {
            reject({
                status: 'Lỗi',
                message: 'Có lỗi xảy ra trong quá trình cập nhật sản phẩm!',
                error: e.message,
            });
        }
    });
}

const getDetailsProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const product = await Product.findOne({
                _id: id
            })
            if (product === null) {
                resolve({
                    status: 'Lỗi',
                    message: 'Không tìm thấy sản phẩm!',
                })
            }
            resolve({
                status: 'Thành công',
                message: 'lấy data Product thành công ',
                data: product
            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteProduct = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkProduct = await Product.findOne({
                _id: id
            })
            if (checkProduct === null) {
                resolve({
                    status: 'Lỗi',
                    message: 'Không tìm thấy sản phẩm!',
                })
            }
            await Product.findByIdAndDelete(id)
            resolve({
                status: 'Thành công',
                message: 'Xóa Product thành công ',
            })
        } catch (e) {
            reject(e)
        }
    })
}

const getAllProdcut = (limit, page, sort, filter) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalProducct = await Product.countDocuments()
            if (filter) {
                const label = filter[0]
                const allProductFilter = await Product.find({ [label]: { '$regex': filter[1] } }).limit(limit).skip(limit * page)
                resolve({
                    message: "Lấy Product từ database thành công",
                    status: "thành công",
                    data: allProductFilter,
                    total: totalProducct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProducct / limit)

                })
            }
            if (sort) {
                const objectSort = {}
                objectSort[sort[1]] = sort[0]
                const allProductSort = await Product.find().limit(limit).skip(limit * page).sort(objectSort)
                resolve({
                    message: "Lấy Product từ database thành công",
                    status: "thành công",
                    data: allProductSort,
                    total: totalProducct,
                    pageCurrent: Number(page + 1),
                    totalPage: Math.ceil(totalProducct / limit)

                })
            }
            const allProduct = await Product.find().limit(limit).skip(limit * page)
            resolve({
                message: "Lấy Product từ database thành công",
                status: "thành công",
                data: allProduct,
                total: totalProducct,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalProducct / limit)

            })
        } catch (e) {
            reject(e)
        }
    })
}

const deleteManyProduct = (ids) => {
    return new Promise(async (resolve, reject) => {
        try {
            await Product.deleteMany({
                _id: ids
            })
            resolve({
                status: 'Thành công',
                message: 'Xóa nhiều sản phẩm thành công!',
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllType = () => {
    return new Promise(async (resolve, reject) => {
        try {
            const allType = await Product.distinct('type')
            resolve({
                message: "Lấy Type từ database thành công",
                status: "thành công",
                data: allType,
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProdcut,
    deleteManyProduct,
    getAllType
}
