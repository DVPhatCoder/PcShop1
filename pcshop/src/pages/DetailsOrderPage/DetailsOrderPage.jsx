import React from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as OrderServices from '../../services/OrderServices';
import Loading from '../../components/LoadingComponent/Loading';
import { WrapperContainer, WrapperDetail, WrapperItem, WrapperStatus } from './style';
import { convertPrice } from '../../util';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';

const DetailsOrderPage = () => {
    const { id } = useParams(); // Lấy ID từ URL
    const navigate = useNavigate();

    // Hàm fetch chi tiết đơn hàng
    const fetchOrderDetails = async () => {
        const res = await OrderServices.getOrderUserDetails(id); // Gọi API lấy chi tiết đơn hàng
        return res.data;
    };

    const { data: order, isLoading } = useQuery({
        queryKey: ['orderDetails', id], // Khóa query
        queryFn: fetchOrderDetails, // Hàm fetch dữ liệu
        enabled: !!id, // Chỉ chạy nếu ID tồn tại
    });

    return (
        <Loading isPending={isLoading}>
            <WrapperContainer>
                <div style={{ width: '1200px', margin: '0 auto' }}>
                    <h2>Chi tiết đơn hàng</h2>
                    <WrapperStatus>
                        <div>
                            <strong>Trạng thái giao hàng:</strong>{' '}
                            {order?.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}
                        </div>
                        <div>
                            <strong>Trạng thái thanh toán:</strong>{' '}
                            {order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}
                        </div>
                        <div>
                            <strong>Ngày đặt hàng:</strong> {new Date(order?.createdAt).toLocaleString()}
                        </div>
                    </WrapperStatus>
                    <WrapperDetail>
                        {order?.orderItems?.map((item) => (
                            <WrapperItem key={item?.id}>
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                                />
                                <div>
                                    <h4>{item?.name}</h4>
                                    <p>Giá: {convertPrice(item?.price)}</p>
                                    <p>Số lượng: {item?.quantity}</p>
                                </div>
                            </WrapperItem>
                        ))}
                    </WrapperDetail>
                    <div style={{ marginTop: '20px', fontSize: '16px', fontWeight: 'bold' }}>
                        Tổng tiền: {convertPrice(order?.totalPrice)}
                    </div>
                    <ButtonComponent
                        onClick={() => navigate(-1)} // Quay lại trang trước đó
                        textButton="Quay lại"
                        size={40}
                        styleButton={{
                            marginTop: '20px',
                            padding: '10px 20px',
                            backgroundColor: 'rgb(11,116,229)',
                            color: '#fff',
                            border: 'none',
                            borderRadius: '5px',
                        }}
                    />
                </div>
            </WrapperContainer>
        </Loading>
    );
};

export default DetailsOrderPage;
