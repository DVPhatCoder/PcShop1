import React from 'react';
import { useParams, useNavigate, useLocation } from 'react-router-dom';
import { useQuery } from '@tanstack/react-query';
import * as OrderServices from '../../services/OrderServices';
import Loading from '../../components/LoadingComponent/Loading';
import { WrapperContainer, WrapperDetail, WrapperItem, WrapperStatus, CustomerInfo, TotalPrice, ButtonWrapper, InfoTitle, InfoText } from './style';
import { convertPrice } from '../../util';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { orderContant } from '../../contant';

const DetailsOrderPage = () => {
    const navigate = useNavigate();
    const params = useParams();
    const location = useLocation();
    const { id } = params;
    const { state } = location;

    const fetchDetailOrderPage = async () => {
        const res = await OrderServices.getOrderDetails(id, state?.token);
        return res.data;
    };

    const { data: orderDetails, isLoading } = useQuery({
        queryKey: ['orders-details'],
        queryFn: fetchDetailOrderPage,
        enabled: !!id,
    });

    return (
        <Loading isPending={isLoading}>
            <WrapperContainer>
                <div style={{ width: '1200px', margin: '0 auto' }}>
                    <h2>Chi tiết đơn hàng</h2>

                    {/* Thông tin khách hàng */}
                    <CustomerInfo>
                        <InfoTitle>Thông tin khách hàng</InfoTitle>
                        <InfoText>
                            <div className="info-label"><strong>Tên khách hàng:</strong></div>
                            <div className="info-value">{orderDetails?.shippingAddress?.fullName}</div>
                        </InfoText>
                        <InfoText>
                            <div className="info-label"><strong>Số điện thoại:</strong></div>
                            <div className="info-value">{orderDetails?.shippingAddress?.phone}</div>
                        </InfoText>
                        <InfoText>
                            <div className="info-label"><strong>Thành phố:</strong></div>
                            <div className="info-value">{orderDetails?.shippingAddress?.city}</div>
                        </InfoText>
                        <InfoText>
                            <div className="info-label"><strong>Địa chỉ giao hàng:</strong></div>
                            <div className="info-value">{orderDetails?.shippingAddress?.address}</div>
                        </InfoText>
                    </CustomerInfo>


                    {/* Trạng thái đơn hàng */}
                    <WrapperStatus>
                        <div><strong>Trạng thái giao hàng:</strong> {orderDetails?.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng'}</div>
                        <div><strong>Trạng thái thanh toán:</strong> {orderDetails?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán'}</div>
                        <div><strong>Ngày đặt hàng:</strong> {new Date(orderDetails?.createdAt).toLocaleString()}</div>
                        <div><strong>Phương thức thanh toán:</strong> {orderContant.payment[orderDetails?.paymentMethod]}</div>

                    </WrapperStatus>

                    {/* Chi tiết sản phẩm */}
                    <WrapperDetail>
                        <h3>Chi tiết sản phẩm</h3>
                        {orderDetails?.orderItems?.map((item) => (
                            <WrapperItem key={item?.id}>
                                <img
                                    src={item?.image}
                                    alt={item?.name}
                                    style={{ width: '100px', height: '100px', objectFit: 'cover', marginRight: '10px' }}
                                />
                                <div>
                                    <h4>Tên sản phẩm: {item?.name}</h4>
                                    <p><strong>Giá sản phẩm:</strong> {convertPrice(item?.price)}</p>
                                    <p><strong>Số lượng:</strong> {item?.amount}</p>
                                    <p><strong>Giảm giá:</strong> {item?.discount ? convertPrice(item?.price * (item?.discount / 100)) : '0 VND'}</p>

                                </div>
                            </WrapperItem>
                        ))}
                    </WrapperDetail>

                    {/* Tổng tiền đơn hàng */}
                    <TotalPrice>
                        <p><strong>Giá giao hàng:</strong> {convertPrice(orderDetails?.shippingPrice)}</p>
                        <strong>Tổng tiền:</strong> {convertPrice(orderDetails?.totalPrice)}
                    </TotalPrice>

                    {/* Nút quay lại */}
                    <ButtonWrapper>
                        <ButtonComponent
                            onClick={() => navigate(-1)} // Quay lại trang trước đó
                            textbutton="Quay lại"
                            size={40}
                            styleButton={{
                                marginTop: '20px',
                                padding: '10px 20px',
                                backgroundColor: 'FF0000',
                                color: 'black',
                                border: 'none',
                                borderRadius: '5px',
                                cursor: 'pointer',
                                transition: 'background-color 0.3s',
                            }}
                        />
                    </ButtonWrapper>
                </div>
            </WrapperContainer>
        </Loading>
    );
};

export default DetailsOrderPage;
