import axios from "axios"
import { axiosJWT } from "./UserServices"

export const getAllProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAllProduct`,)
    return res.data
}
export const createProduct = async (data) => {
    const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
    return res.data
}
export const getDetailsProduct = async (id) => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-details/${id}`)
    return res.data
}

export const updateProduct = async (id, data, access_token) => {
    const res = await axiosJWT.put(`${process.env.REACT_APP_API_URL}/product/update/${id}`, data, {
        headers: {
            token: `Beare ${access_token}`,
        }
    })

    return res.data
}