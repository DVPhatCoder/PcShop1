const User = require("../models/UserModel")
const bcrypt = require("bcrypt")
const { genneralAccessToken, genneralRefreshToken } = require("./JwtServices")

const createUser = (newUser) => {

    return new Promise(async (resolve, reject) => {
        const { name, email, password, phone } = newUser
        try {
            const checkUser = await User.findOne({
                email: email,
            })
            if (checkUser !== null) {
                reject({
                    status: 'Lỗi',
                    message: 'Email này đã được đăng ký! ',
                })
            }
            const hash = bcrypt.hashSync(password, 10)
            const createdUser = await User.create({
                name,
                email,
                password: hash,
                phone
            })
            if (createdUser) {
                resolve({
                    status: 'thành công',
                    message: 'Tạo tài khoản thành công! ',
                    data: createdUser,
                })

            }

        } catch (e) {
            reject(e)
        }
    })
}
const loginUser = (userLogin) => {

    return new Promise(async (resolve, reject) => {
        const { email, password } = userLogin
        try {
            const checkUser = await User.findOne({
                email: email,
            })
            if (checkUser === null) {
                reject({
                    status: 'Lỗi',
                    message: 'Email không tồn tại vui lòng nhập lại'
                })
            }
            const comparePassword = bcrypt.compareSync(password, checkUser.password)

            if (!comparePassword) {
                reject({
                    status: 'Lỗi',
                    message: 'mật khẩu không đúng vui lòng nhập lại'
                })
            }
            const access_token = await genneralAccessToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            const refresh_token = await genneralRefreshToken({
                id: checkUser.id,
                isAdmin: checkUser.isAdmin
            })
            resolve({
                status: 'thành công',
                message: 'Đăng nhập thành công ',
                access_token,
                refresh_token,
            })
        } catch (e) {
            reject(e)
        }
    })
}
const updateUser = (id, data) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'lỗi',
                    message: 'Không tìm thấy người dùng!',
                })
            }
            const updatedUser = await User.findByIdAndUpdate(id, data, { new: true })
            resolve({
                status: 'thành công',
                message: 'Cập nhập User thành công ',
                data: updatedUser,
            })
        } catch (e) {
            reject(e)
        }
    })
}
const deleteUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const checkUser = await User.findOne({
                _id: id
            })
            if (checkUser === null) {
                resolve({
                    status: 'Lỗi',
                    message: 'Không tìm thấy người dùng!',
                })
            }
            await User.findByIdAndDelete(id)
            resolve({
                status: 'Thành công',
                message: 'Xóa User thành công ',
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getAllUser = (limit = 8, page = 0) => {
    return new Promise(async (resolve, reject) => {
        try {
            const totalUser = await User.countDocuments()
            const allUser = await User.find().limit(limit).skip(limit * page)
            resolve({
                message: "Lấy User từ database thành công",
                status: "thành công",
                data: allUser,
                total: totalUser,
                pageCurrent: Number(page + 1),
                totalPage: Math.ceil(totalUser / limit)
            })
        } catch (e) {
            reject(e)
        }
    })
}
const getDetailsUser = (id) => {
    return new Promise(async (resolve, reject) => {
        try {
            const user = await User.findOne({
                _id: id
            })
            if (user === null) {
                resolve({
                    status: 'Lỗi',
                    message: 'Không tìm thấy người dùng!',
                })
            }
            resolve({
                status: 'Thành công',
                message: 'lấy data User thành công ',
                data: user
            })
        } catch (e) {
            reject(e)
        }
    })
}

module.exports = {
    createUser,
    loginUser,
    updateUser,
    deleteUser,
    getAllUser,
    getDetailsUser,
}
