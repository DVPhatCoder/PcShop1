
import React, { } from 'react'
import { useSelector } from 'react-redux';
import { WrapperInfor, WrapperContainer, WrapperValue, WrapperTotal, WrapperTotalMoney } from './style'
import Loading from '../../components/LoadingComponent/Loading';
import { WrapperItemOrder } from './style';
import { WrapperCountOrder } from './style';
import { WrapperInputNumber } from './style';
import { useLocation } from 'react-router-dom';
import { orderContant } from '../../contant';
import { convertPrice } from '../../util';
const OrderSucces = () => {
    const order = useSelector((state) => state.order);
    const localtion = useLocation()
    console.log('localtion', localtion)
    const { state } = localtion
    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh', fontSize: '14px' }}>
            <Loading isPending={false}>
                <div style={{ height: '100%', width: '1270px', marginLeft: '84px', paddingTop: '10px' }}>
                    <h3 style={{ marginLeft: '123px' }}>Đơn hàng đã đặt đơn hàng thành công</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperContainer>
                            <WrapperInfor>
                                <div><label>Phương thức giao hàng</label>
                                    <WrapperValue>
                                        <span style={{ color: '#ea8500', fontWeight: '700' }}>{orderContant.delivery[state?.delivery]}</span> Giao hàng tiết kiệm
                                    </WrapperValue>
                                </div>
                            </WrapperInfor>
                            <WrapperInfor>
                                <div><label>Chọn phương thức thanh toán</label>
                                    <WrapperValue>
                                        {orderContant.payment[state?.payment]}
                                    </WrapperValue>
                                </div>
                            </WrapperInfor>
                            <WrapperInfor>
                                {state?.orders?.map((order) => {
                                    return (
                                        <WrapperItemOrder key={order?.product}>
                                            <div style={{ width: '280px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                                <img src={order.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                                <div style={{ width: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', marginLeft: '10px', }}>
                                                    {order?.name}
                                                </div>
                                            </div>
                                            <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                                <span style={{ display: 'flex', width: '200px' }}>
                                                    <span style={{ fontSize: '13px', color: '#242424' }}>
                                                        Giá sản phẩm:{convertPrice(order?.price)}
                                                    </span>
                                                </span>
                                                <span>
                                                    <span>
                                                        Số lượng:{order?.amount}
                                                    </span>
                                                </span>

                                                <span style={{ color: 'rgb(255,66,78)', fontSize: '13px', fontWeight: 500, width: '200px' }}>Thành tiền:{convertPrice(order?.price * order?.amount)} </span>
                                            </div>
                                        </WrapperItemOrder>

                                    )
                                })}
                            </WrapperInfor>
                            <WrapperTotalMoney>
                                <span style={{ marginLeft: 'auto', color: 'rgb(255,66,78)', fontSize: '16px', fontWeight: 'bold', width: '200px' }}>Tổng tiền:{convertPrice(state?.totalPriceMemo)}</span>
                            </WrapperTotalMoney>
                        </WrapperContainer>
                    </div>
                </div >
            </Loading>
        </div >
    )
}

export default OrderSucces
