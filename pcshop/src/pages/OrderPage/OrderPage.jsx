import { Checkbox, Form, Steps, } from 'antd';
import React, { useEffect, useMemo, useState } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { WrapperCountOrder, WrapperInfor, WrapperInputNumber, WrapperItemOrder, WrapperLeft, WrapperListOrder, WrapperPriceDiscount, WrapperRight, WrapperStyleHeader, WrapperStyleHeaderDelivery, WrapperTotal } from './style'
import { PlusOutlined, DeleteOutlined, MinusOutlined } from '@ant-design/icons';
import { addOrderProduct, decreaseAmount, increaseAmount, removeAllOrderProduct, removeOrderProduct, selectedOrder } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../util';
import ButtonComponent from '../../components/ButtonComponent/ButtonComponent';
import { ModalComponent } from '../../components/ModalComponent/ModalComponent';
import Loading from '../../components/LoadingComponent/Loading';
import InputComponent from '../../components/InputComponent/InputComponent';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserServices from '../../services/UserServices'
import * as Message from '../../components/Message/Message'
import { updateUser } from '../../redux/slides/useSlide';
import { useNavigate } from 'react-router-dom';
const OrderPage = () => {
    const navigate = useNavigate()
    const [isModalOpenUpdateInfor, setIsModalOpenUpdateInfor] = useState(false)
    const dispatch = useDispatch()
    const order = useSelector((state) => state.order);
    const user = useSelector((state) => state.user);
    const [listChecked, setListChecked] = useState([])
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
    const onChange = (e) => {
        if (listChecked.includes(e.target.value)) {
            const newListCheck = listChecked.filter((item) => item !== e.target.value)
            setListChecked(newListCheck)
        } else {
            setListChecked([...listChecked, e.target.value])
        }
    }
    const handleChangeCount = (type, idProduct, max) => {
        if (type === 'increase') {
            const product = order.orderItems.find((item) => item.product === idProduct);
            if (product.amount < max) {
                dispatch(increaseAmount({ idProduct }));
            } else {
                Message.error('Số lượng vượt quá số lượng trong kho!');
            }
        } else if (type === 'decrease') {
            dispatch(decreaseAmount({ idProduct }));
        }
    };
    useEffect(() => {
        form.setFieldsValue(stateUserDetail)
    }, [form, stateUserDetail])

    useEffect(() => {
        dispatch(selectedOrder({ listChecked }))
    }, [listChecked])

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
    const handleOnchangeCheckAll = (e) => {
        if (e.target.checked) {
            const newListChecked = order?.orderItems?.map(item => item?.product) || [];
            setListChecked(newListChecked);
        } else {
            setListChecked([]);
        }
    };
    const handleAddAdress = () => {
        setIsModalOpenUpdateInfor(true)
    }
    const handleDelteOrder = (idProduct) => {
        dispatch(removeOrderProduct({ idProduct }))
    }
    const handleRemoveAllOrder = () => {
        if (listChecked?.length > 1) {
            dispatch(removeAllOrderProduct({ listChecked }))
        } else {
        }
    }
    const priceMemo = useMemo(() => {
        const result = order?.orderItemSlected?.reduce((total, cur) => {
            return total + ((cur.price * cur.amount))
        }, 0)
        return result
    }, [order])
    const priceDiscountMemo = useMemo(() => {
        const result = order?.orderItemSlected?.reduce((total, cur) => {
            return total + ((cur.discount / 100) * cur.price * cur.amount);
        }, 0);
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
    const handleAddCart = () => {
        if (!order?.orderItemSlected?.length) {
            Message.error('Vui lòng chọn sản phẩm!');
        } else if (!user?.phone || !user?.address || !user?.name || !user?.city) {
            setIsModalOpenUpdateInfor(true)
        } else {
            navigate('/payment')
        }
    }
    const { data, isPending: isPendingUpdated } = mutationUpdate
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
    const itemsStep = [
        {
            title: 'Phí giao hàng 200.000 VND',
            description: 'Đơn hàng dưới 10 triệu',
        },
        {
            title: 'Phí giao hàng 100.000 VND',
            description: 'Đơn hàng từ 10 triệu đồng đến 30 triệu đồng',
        },
        {
            title: 'Miễn phí giao hàng',
            description: 'Đơn hàng trên 30 triệu',
        },

    ]

    return (
        <div style={{ background: '#f5f5fa', width: '100%', height: '100vh', fontSize: '14px' }}>
            <div style={{ height: '100%', width: '1270px', marginLeft: '84px' }}>
                <h3>Giỏ hàng</h3>
                <div style={{ display: 'flex', justifyContent: 'center' }}>
                    <WrapperLeft>
                        <WrapperStyleHeaderDelivery>
                            <Steps items={itemsStep} current={diliveryPriceMemo === 200000 ? 1 : diliveryPriceMemo === 100000 ? 2 : 3} />
                        </WrapperStyleHeaderDelivery>
                        <WrapperStyleHeader>
                            <span style={{ margin: '10px 20px' }}>
                                <Checkbox onChange={handleOnchangeCheckAll} checked={listChecked?.length === order?.orderItems?.length} style={{ margin: '0 5px' }} >
                                </Checkbox>
                                <span style={{ display: 'inline-block' }}>
                                    tất cả ({order?.orderItems?.length}sản phẩm)
                                </span>
                            </span>
                            <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'space-around', paddingLeft: '100px' }}>
                                <span>Đơn giá</span>
                                <span>Số lượng</span>
                                <span>Giảm giá</span>
                                <span>Thành Tiền</span>
                                <DeleteOutlined style={{ cursor: 'pointer' }} onClick={handleRemoveAllOrder} />
                            </div>
                        </WrapperStyleHeader>

                        <WrapperListOrder>
                            {order?.orderItems?.map((order) => {
                                return (
                                    <WrapperItemOrder key={order?.product}>
                                        <div style={{ width: '280px', display: 'flex', alignItems: 'center', gap: 4 }}>
                                            <Checkbox onChange={onChange} value={order?.product} checked={listChecked.includes(order?.product)} style={{ margin: '0 5px' }}></Checkbox>
                                            <img src={order?.image} style={{ width: '77px', height: '79px', objectFit: 'cover' }} />
                                            <div style={{ width: '260px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap', margin: '0 10px' }}>
                                                {order?.name}
                                            </div>
                                        </div>
                                        <div style={{ flex: '1', display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
                                            <span style={{ display: 'flex' }}>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>
                                                    {convertPrice(order?.price)}
                                                </span>
                                            </span>
                                            <WrapperCountOrder>
                                                <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleChangeCount('decrease', order?.product)}>
                                                    <MinusOutlined style={{ color: '#000', fontSize: '20px' }} size="10px" />
                                                </button>
                                                <WrapperInputNumber defaultValue={order?.amount} value={order?.amount} size="small" />
                                                <button
                                                    style={{ border: 'none', background: 'transparent', cursor: 'pointer' }}
                                                    onClick={() => handleChangeCount('increase', order?.product, order?.countInStock)}
                                                >
                                                    <PlusOutlined style={{ color: '#000', fontSize: '20px' }} size="10px" />
                                                </button>

                                            </WrapperCountOrder>
                                            <span style={{ display: 'flex', width: '10px' }}>
                                                <span style={{ fontSize: '13px', color: '#242424' }}>
                                                    {order?.discount || 0}%
                                                </span>
                                            </span>
                                            <span style={{ color: 'rgb(255,66,78)', fontSize: '13px', fontWeight: 500, }}>{convertPrice(order?.price * order?.amount)} </span>

                                            <DeleteOutlined style={{ cursor: 'pointer', marginRight: '25px' }} onClick={() => handleDelteOrder(order?.product)} />

                                        </div>
                                    </WrapperItemOrder>
                                )
                            })}

                        </WrapperListOrder>
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
                        <ButtonComponent
                            onClick={() => handleAddCart()}
                            size={40}
                            styleButton={{ background: 'rgb(255, 57,69)', height: '48px', border: 'none', borderRadius: '4px', width: '320px' }}
                            textbutton={'Mua hàng'}
                            styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}>
                        </ButtonComponent>

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
                        // onFinish={onUpdateUser}
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
        </div >
    )
}

export default OrderPage