import axios from "axios"
import { axiosJWT } from "./UserServices"

// export const createProduct = async (data) => {
//     const res = await axios.post(`${process.env.REACT_APP_API_URL}/product/create`, data)
//     return res.data
// }
//http://localhost:5000/api/order/get-order-details/6711d747a1e34490dd3a167f
export const createOrder = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/order/create`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
export const getAllOrderUserDetails = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const getOrderDetails = async (id, access_token) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-details-order/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        }
    })
    return res.data
}
export const cancelOrder = async (id, access_token, orderItems) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/order/cancel-order/${id}`, { data: orderItems }, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
export const getAllOrderUser = async (access_token,) => {
    const res = await axiosJWT.get(`${process.env.REACT_APP_API_URL}/order/get-all-order-user`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
export const markOrderAsReceived = async (id, access_token) => {
    const res = await axios.put(`${process.env.REACT_APP_API_URL}/order/mark-received/${id}`,
        {},
        {
            headers: {
                token: `Bearer ${access_token}`,
            },
        }
    );
    return res.data;
};