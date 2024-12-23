
const UserServices = require('../services/UserServices')
const JwtServices = require('../services/JwtServices')

const createUser = async (req, res) => {
    try {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { email, password, confirmPassword } = req.body
        const isCheckEmail = reg.test(email)
        if (!email || !password || !confirmPassword) {
            return res.status(400).json({
                status: 'Lỗi',
                message: 'Không được để trống',
            })
        }
        if (!isCheckEmail) {
            return res.status(400).json({
                status: 'lỗi',
                message: 'Email không đúng vui lòng nhập lại email',
            })
        }
        if (password !== confirmPassword) {
            return res.status(400).json({
                status: 'Lỗi',
                message: 'Mật khẩu và xác nhận mật khẩu không đúng vui lòng nhập lại mật khẩu',
            })
        }
        const response = await UserServices.createUser(req.body)
        return res.status(201).json(response)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}
const loginUser = async (req, res) => {
    try {
        const reg = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;
        const { email, password } = req.body
        const isCheckEmail = reg.test(email)
        if (!email || !password) {
            return res.status(400).json({
                status: 'Lỗi',
                message: 'Không được bỏ trống',
            })

        } else if (!isCheckEmail) {
            return res.status(400).json({
                status: 'Lỗi',
                message: 'Email không hợp lệ',
            })
        }
        const response = await UserServices.loginUser(req.body)
        const { refresh_token, ...newResponse } = response
        res.cookie('refresh_token', refresh_token, {
            httpOnly: true,
            secure: false,
            samesite: 'strict'
        })
        return res.status(200).json(newResponse)
    } catch (e) {
        return res.status(500).json({
            message: e
        })
    }
}
const updateUser = async (req, res) => {
    try {
        const userId = req.params.id
        const data = req.body
        if (!userId) {
            return res.status(200).json({
                status: 'lỗi',
                message: 'Người dùng không tồn tại',
            })
        }
        const response = await UserServices.updateUser(userId, data)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const deleteUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Người dùng không tồn tại',
            })
        }
        const response = await UserServices.deleteUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getAllUser = async (req, res) => {
    try {
        const { limit, page } = req.query
        const response = await UserServices.getAllUser()
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const getDetailsUser = async (req, res) => {
    try {
        const userId = req.params.id
        if (!userId) {
            return res.status(400).json({
                status: 'Lỗi',
                message: 'Người dùng không tồn tại',
            })
        }
        const response = await UserServices.getDetailsUser(userId)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token
        if (!token) {
            return res.status(404).json({
                status: 'Lỗi',
                message: 'Xác thực refreshtoken thất bại',
            })
        }
        const response = await JwtServices.refreshTokenJwtService(token)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const logoutUser = async (req, res) => {
    try {
        res.clearCookie('refresh_token')
        return res.status(200).json({
            status: 'thành công',
            message: 'Đăng xuất thành công'
        })
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
const deleteMany = async (req, res) => {
    try {
        const ids = req.body.ids
        if (!ids) {
            return res.status(200).json({
                status: 'Lỗi',
                message: 'Đã có lỗi xảy ra. Vui lòng thử lại sau',
            })
        }
        const response = await UserServices.deleteManyUser(ids)
        return res.status(200).json(response)
    } catch (e) {
        return res.status(404).json({
            message: e
        })
    }
}
module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
    refreshToken,
    logoutUser,
    deleteMany
} 
