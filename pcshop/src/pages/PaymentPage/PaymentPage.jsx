import { Form, message, Radio, } from 'antd';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { WrapperInfor, WrapperLeft, WrapperRight, WrapperTotal, WrapperRadio } from './style'
import { removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../util';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { ModalComponent } from '../../components/ModalComponent/ModalComponent';
import Loading from '../../components/LoadingComponent/Loading';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserServices from '../../services/UserServices'
import * as OrderServices from '../../services/OrderServices'
import * as Message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/useSlide';
import { useNavigate } from 'react-router-dom';
import { PayPalButton } from "react-paypal-button-v2";
import * as PaymentServices from '../../services/PaymentServices'
const PaymentPage = () => {
    const navigate = useNavigate()
    const [isModalOpenUpdateInfor, setIsModalOpenUpdateInfor] = useState(false)
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const [delivery, setDelivery] = useState('fast')
    const [payment, setPayment] = useState('last_money')
    const [sdkReady, setSdkReady] = useState(false)
    const [stateUserDetail, setStateUserDetail] = useState({
        name: '',
        phone: '',
        address: '',
        city: '',
    })
    const [form] = Form.useForm();
    const mutationUpdate = useMutationHooks(
        async (data) => {
            try {
                const { id, token, ...rests } = data;
                const res = await UserServices.updateUser(id, { ...rests }, token);
                return res;
            } catch (error) {
                console.error("Lỗi khi cập nhập người dùng:", error.response?.data || error.message);
            }
        }

    );

    const mutationAddOrder = useMutationHooks(
        async (data) => {
            try {
                const { token, ...rests } = data;
                const res = await OrderServices.createOrder({ ...rests }, token);
                return res;
            } catch (error) {
                console.error("Lỗi khi thêm sản phẩm:", error.response?.data || error.message);
            }
        }

    );
    useEffect(() => {
        form.setFieldsValue(stateUserDetail)
    }, [form, stateUserDetail])
    useEffect(() => {
        if (isModalOpenUpdateInfor) {
            setStateUserDetail({
                city: user?.city,
                name: user?.name,
                address: user?.address,
                phone: user?.phone
            })
        }
    }, [isModalOpenUpdateInfor])

    const priceMemo = useMemo(() => {
        const result = order?.orderItemSlected?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])
    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemSlected?.reduce((total, cur) => {
            console.log('Product:', cur);
            return total + ((cur.discount / 100) * cur.price * cur.amount);
        }, 0);

        console.log('Total Price Discount:', result); // Kiểm tra kết quả sau khi tính toán
        return result || 0;
    }, [order]);

    const diliveryPriceMemo = useMemo(() => {
        if (priceMemo <= 10000000 && priceMemo !== 0) {
            return 200000
        } else if (priceMemo > 10000000 && priceMemo <= 30000000) {
            return 100000
        } else {
            return 0
        }
    }, [order])
    const totalPriceMemo = useMemo(() => {
        return Number(priceMemo) - Number(priceDiscountMemo) + Number(diliveryPriceMemo)
    }, [priceMemo, priceDiscountMemo, diliveryPriceMemo])

    const handleAddOrder = () => {
        if (user?.access_token && order?.orderItemSlected && user?.name && user?.address && user?.phone && user?.city && priceMemo && user?.id) {
            mutationAddOrder.mutate({
                token: user?.access_token,
                orderItems: order?.orderItemSlected,
                fullName: user?.name,
                address: user?.address,
                phone: user?.phone,
                city: user?.city,
                paymentMethod: payment,
                itemsPrice: priceMemo,
                shippingPrice: diliveryPriceMemo,
                totalPrice: totalPriceMemo,
                user: user?.id,
            }
            )
        }
    }
    const handleAddAdress = () => {
        setIsModalOpenUpdateInfor(true)
    }
    const { isPending: isPendingUpdated } = mutationUpdate
    const { data, isPending: isPendingAddOrder, isError, isSuccess } = mutationAddOrder

    useEffect(() => {
        if (isSuccess && data?.status === 'thành công') {
            const arrayOrder = []
            order?.orderItemSlected?.forEach(element => {
                arrayOrder.push(element.product)
            });
            dispatch(removeAllOrderProduct({ listChecked: arrayOrder }));
            Message.success('Đặt hàng thành công');
            navigate('/orderSuccess', {
                state: {
                    delivery,
                    payment,
                    orders: order?.orderItemSlected,
                    totalPriceMemo,

                },
            });
        } else if (isError && data?.status === 'thất bại') {
            Message.error('Đặt hàng thất bại');
        }
    }, [isError, isSuccess])

    const handleCancelUpdateInfor = () => {
        setStateUserDetail({
            name: '',
            email: '',
            phone: '',
            address: '',
            isAdmin: false,
        })
        form.resetFields()
        setIsModalOpenUpdateInfor(false)
    }

    const handleUpdateInfor = () => {
        const { name, address, phone, city } = stateUserDetail
        if (name && address && phone && city) {

            mutationUpdate.mutate({
                id: user?.id,
                token: user?.access_token,
                ...stateUserDetail,

            }, {
                onSuccess: () => {
                    dispatch(updateUser({ name, address, phone, city }));
                    setIsModalOpenUpdateInfor(false)
                }
            });
        }
    }

    const handleOnChangeDetail = (e) => {
        setStateUserDetail({
            ...stateUserDetail,
            [e.target.name]: e.target.value
        });
    };
    const handleDilivery = (e) => {
        setDelivery(e.target.value)
    }
    const handlePayment = (e) => {
        setPayment(e.target.value)
    }
    const onSuccessPaypal = (details, data) => {
        mutationAddOrder.mutate({
            token: user?.access_token,
            orderItems: order?.orderItemSlected,
            fullName: user?.name,
            address: user?.address,
            phone: user?.phone,
            city: user?.city,
            paymentMethod: payment,
            itemsPrice: priceMemo,
            shippingPrice: diliveryPriceMemo,
            totalPrice: totalPriceMemo,
            user: user?.id,
            isPaid: true,
            paidAt: details.update_time

        }
        )
    }

    const addPaypalScript = async () => {
        const { data } = await PaymentServices.getConfig()
        console.log('data', data)
        const script = document.createElement('script')
        script.type = 'text/javascript'
        script.src = `https://www.paypal.com/sdk/js?client-id=${data}`
        script.async = true
        script.onload = () => {
            setSdkReady(true)
        }
        document.body.appendChild(script)
    }

    useEffect(() => {
        if (!window.paypal) { // nếu màn hình ko hiển thị paypal thì tải lại 
            addPaypalScript()
        } else {
            setSdkReady(true)
        }
    }, [])
    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh', fontSize: '14px' }}>
            <Loading isPending={isPendingAddOrder}>
                <div style={{ height: '100%', width: '1270px', marginLeft: '84px' }}>
                    <h3>Thanh toán</h3>
                    <div style={{ display: 'flex', justifyContent: 'center' }}>
                        <WrapperLeft>
                            <WrapperInfor>
                                <div><label>Chọn phương thức giao hàng</label>
                                    <WrapperRadio onChange={handleDilivery} value={delivery}>
                                        <Radio value="fast"><span style={{ color: '#ea8500', fontWeight: '700' }}>FAST</span> Giao hàng nhanh</Radio>
                                        <Radio value="gojeck"><span style={{ color: '#ea8500', fontWeight: '700' }}>GOJECK</span> Giao hàng tiết kiệm</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfor>
                            <WrapperInfor>
                                <div><label>Chọn phương thức thanh toán</label>
                                    <WrapperRadio onChange={handlePayment} value={payment}>
                                        <Radio value="last_money">Thanh toán trước khi nhận hàng</Radio>
                                        <Radio value="paypal">Thanh toán bằng paypal</Radio>
                                    </WrapperRadio>
                                </div>
                            </WrapperInfor>
                        </WrapperLeft>
                        <WrapperRight>
                            <div style={{ width: '100%' }}>
                                <WrapperInfor style={{ background: '#FFFFFD', marginBottom: '10px' }} >
                                    <div style={{ display: 'flex', alignItems: 'center', }}>
                                        <span style={{ marginRight: '5px' }}>
                                            Địa chỉ :
                                        </span>
                                        <span style={{ fontWeight: 'bold', }}>{`${user?.address} ${user?.city}`}</span>
                                        <span onClick={handleAddAdress} style={{ color: 'blue', cursor: 'pointer', marginLeft: '10px' }}>Thay đổi</span>
                                    </div>
                                </WrapperInfor>
                                <WrapperInfor style={{ background: '#FFFFFD' }} >
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                        <span>
                                            Tạm Tính
                                        </span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceMemo)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '8px 0' }}>
                                        <span>Được giảm Giá</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(priceDiscountMemo)}</span>
                                    </div>
                                    <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', margin: '8px 0' }}>
                                        <span>Phí giao hàng</span>
                                        <span style={{ color: '#000', fontSize: '14px', fontWeight: 'bold' }}>{convertPrice(diliveryPriceMemo)}</span>
                                    </div>
                                </WrapperInfor>
                                <WrapperTotal>
                                    <span>Tổng Tiền</span>
                                    <div style={{ textAlign: 'right', marginLeft: '50px' }}>
                                        <span style={{ display: 'flex', flexDirection: 'column', marginLeft: '50px' }}>
                                            <span style={{ color: 'rgb(254,56,52)', fontSize: '24px', fontWeight: 'bold' }}>{convertPrice(totalPriceMemo)}</span>
                                            <span style={{ color: '#000', fontSize: '11px' }}>(Đã bao gồm phí VAT)</span>
                                        </span>
                                    </div>
                                </WrapperTotal>
                            </div>
                            {payment === 'paypal' && sdkReady ? (
                                <div style={{ height: '48px', border: 'none', borderRadius: '4px', width: '320px' }}>
                                    <PayPalButton
                                        amount={totalPriceMemo / 25000}
                                        // shippingPreference="NO_SHIPPING" // default is "GET_FROM_FILE"
                                        onSuccess={onSuccessPaypal}
                                        onError={() => {
                                            alert('Lỗi xảy ra trong quá trình thanh toán');
                                        }}
                                    />
                                </div>

                            ) : (
                                <ButtonComponent
                                    onClick={() => handleAddOrder()}
                                    size={40}
                                    styleButton={{ background: 'rgb(255, 57,69)', height: '48px', border: 'none', borderRadius: '4px', width: '320px' }}
                                    textButton={'Đặt hàng'}
                                    styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                                </ButtonComponent>
                            )}

                        </WrapperRight>
                    </div>
                </div >
                <ModalComponent forceRender title="Cập nhập thông tin giao hàng" open={isModalOpenUpdateInfor} onCancel={handleCancelUpdateInfor} onOk={handleUpdateInfor}>
                    <Loading isPending={isPendingUpdated}>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 7,
                            }}
                            wrapperCol={{
                                span: 20,
                            }}
                            // onFinish={mutationUpdate}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                label="Tên người dùng"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên người dùng!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateUserDetail.name} onChange={handleOnChangeDetail} name="name" />
                            </Form.Item>
                            <Form.Item
                                label="Thành Phố"
                                name="city"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập địa chỉ!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateUserDetail.city} onChange={handleOnChangeDetail} name="city" />
                            </Form.Item>
                            <Form.Item
                                label="Nhập số điện thoại"
                                name="phone"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập số điện thoại!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateUserDetail.phone} onChange={handleOnChangeDetail} name="phone" />
                            </Form.Item>
                            <Form.Item
                                label="Nhập địa chỉ"
                                name="address"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng địa chỉ!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateUserDetail.address} onChange={handleOnChangeDetail} name="address" />
                            </Form.Item>
                        </Form>
                    </Loading>

                </ModalComponent>
            </Loading >
        </div >
    )
}

export default PaymentPage
