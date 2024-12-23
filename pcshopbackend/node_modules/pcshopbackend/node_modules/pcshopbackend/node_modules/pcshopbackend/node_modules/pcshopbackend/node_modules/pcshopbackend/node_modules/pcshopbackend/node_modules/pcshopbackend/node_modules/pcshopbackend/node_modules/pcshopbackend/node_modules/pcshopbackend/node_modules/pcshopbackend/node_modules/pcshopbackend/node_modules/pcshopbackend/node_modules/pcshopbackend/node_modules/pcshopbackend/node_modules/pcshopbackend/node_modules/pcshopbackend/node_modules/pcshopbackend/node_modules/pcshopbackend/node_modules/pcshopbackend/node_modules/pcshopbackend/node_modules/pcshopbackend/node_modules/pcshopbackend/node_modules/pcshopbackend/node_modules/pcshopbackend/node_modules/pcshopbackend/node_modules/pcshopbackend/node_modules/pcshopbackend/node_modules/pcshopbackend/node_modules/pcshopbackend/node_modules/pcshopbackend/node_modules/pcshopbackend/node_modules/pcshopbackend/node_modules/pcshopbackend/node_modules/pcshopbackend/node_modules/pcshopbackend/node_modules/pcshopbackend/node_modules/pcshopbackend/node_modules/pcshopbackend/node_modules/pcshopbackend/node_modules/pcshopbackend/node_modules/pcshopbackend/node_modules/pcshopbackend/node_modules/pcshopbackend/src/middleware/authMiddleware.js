const dotenv = require('dotenv')
const jwt = require('jsonwebtoken')
dotenv.config()

const authMiddleware = (req, res, next) => {
    const token = req.headers.token?.split(" ")[1]
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'Xác thực ACCESSTOKEN thất bại',
                status: 'Lỗi'
            })
        }
        if (user?.isAdmin) {
            next()
        } else
            return res.status(400).json({
                message: 'Xác thực admin thất bại ',
                status: 'Lỗi'
            })
    });
}
const authUserMiddleware = (req, res, next) => {
    const token = req.headers.token?.split(" ")[1]
    const userID = req.params.id
    jwt.verify(token, process.env.ACCESS_TOKEN, function (err, user) {
        if (err) {
            return res.status(401).json({
                message: 'Xác thực thất bại',
                status: 'Lỗi'
            })
        }
        if (user?.isAdmin || user?.id === userID) {
            next()
        } else
            return res.status(401).json({
                message: 'Xác thực thất bại',
                status: 'Lỗi'
            })
    });
}
module.exports = {
    authMiddleware,
    authUserMiddleware
}