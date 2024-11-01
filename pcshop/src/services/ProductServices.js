import axios from "axios"
import { axiosJWT } from "./UserServices"

export const getAllProduct = async (search, limit) => {
    let res = {}
    if (search?.length > 0) {
        // Gọi API với tham số tìm kiếm nếu search không rỗng
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAllProduct?filter=name&filter=${search}&limit=${limit}`);
    } else {
        // Gọi API lấy tất cả sản phẩm nếu search rỗng hoặc không tồn tại
        res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAllProduct?limit=${limit}`);
    }
    return res.data // Trả về dữ liệu từ phản hồi
}
export const getAllProductType = async (type, page, limit) => {
    if (type) {
        const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/getAllProduct?filter=type&filter=${type}&limit=${limit}&page=${page}`);
        return res
    }
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
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
export const deleteProduct = async (id, access_token) => {
    const res = await axiosJWT.delete(`${process.env.REACT_APP_API_URL}/product/delete/${id}`, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
export const deleteManyProduct = async (data, access_token) => {
    const res = await axiosJWT.post(`${process.env.REACT_APP_API_URL}/product/delete-many/`, data, {
        headers: {
            token: `Bearer ${access_token}`,
        },
    });
    return res.data;
};
export const getAllTypeProduct = async () => {
    const res = await axios.get(`${process.env.REACT_APP_API_URL}/product/get-all-type`)
    return res.data;
};