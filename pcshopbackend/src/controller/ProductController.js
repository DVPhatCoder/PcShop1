const ProductServices = require('../services/ProductServices')

const createProduct = async (req, res) => {
    try {
        const { name, image, type, price, countInStock, rating, description } = req.body
        if (!name || !image || !type || !price || !countInStock || !rating) {
            return res.status(400).json({
                status: 'Lỗi',
                message: 'Không được để trống các trường bắt buộc!',
            })
        }
        const response = await ProductServices.createProduct(req.body)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const updateProduct = async (req, res) => {
    try {
        const productId = req.params.id
        const data = req.body
        if (!productId) {
            return res.status(200).json({
                status: 'lỗi',
                message: 'sản phẩm không tồn tại',
            })
        }
        const response = await ProductServices.updateProduct(productId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getDetailsProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'sản phẩm không tồn tại',
            })
        }
        const response = await ProductServices.getDetailsProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const deleteProduct = async (req, res) => {
    try {
        const productId = req.params.id
        if (!productId) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Sản phẩm không tồn tại',
            })
        }
        const response = await ProductServices.deleteProduct(productId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllProdcut = async (req, res) => {
    try {
        let { limit, page, sort, filter } = req.query;

        // Kiểm tra nếu không có limit thì gán bằng null để lấy hết sản phẩm
        limit = limit ? Number(limit) : null;
        page = page ? Number(page) : 0;

        const response = await ProductServices.getAllProdcut(limit, page, sort, filter);
        return res.status(200).json(response);
    } catch (e) {
        return res.status(404).json({
            message: e.message
        });
    }
}

const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Danh sách ID không được cung cấp hoặc không hợp lệ',
            })
        }
        const response = await ProductServices.deleteManyProduct(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllType = async (req, res) => {
    try {
        const response = await ProductServices.getAllType()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    createProduct,
    updateProduct,
    getDetailsProduct,
    deleteProduct,
    getAllProdcut,
    deleteMany,
    getAllType
} 
