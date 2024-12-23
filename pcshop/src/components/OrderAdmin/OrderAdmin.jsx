import React, { useRef, useState, useEffect } from 'react';
import { WrapperHeader } from './style';
import { Button, DatePicker, Form, Space } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import { useSelector } from 'react-redux';
import { useQuery } from '@tanstack/react-query';
import { SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';
import * as OrderServices from '../../services/OrderServices';
import { orderContant } from '../../contant';
import ColumnChart from './ColumnChart';
import { convertPrice } from '../../util';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as Message from '../../components/Message/Message';
import { useNavigate } from 'react-router-dom';

const { RangePicker } = DatePicker;

const OrderAdmin = () => {
    const navigate = useNavigate();
    const searchInput = useRef(null);
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const user = useSelector((state) => state?.user);
    const [form] = Form.useForm();

    const getAllOrderUser = async () => {
        const res = await OrderServices.getAllOrderUser(user?.access_token);
        return res;
    };

    const queryAllOrder = useQuery({ queryKey: ['orders'], queryFn: getAllOrderUser });
    const { data: orders, isPending: isLoadingOrder } = queryAllOrder;

    const mutation = useMutationHooks(
        (data) => {
            const { id, token } = data;
            const res = OrderServices.cancelOrder(id, token);
            return res;
        }
    );

    const handleCancelOrder = (id) => {
        mutation.mutate({ id, token: user?.access_token }, {
            onSuccess: () => {
                queryAllOrder.refetch(); // Refetch lại dữ liệu sau khi xóa thành công
            },
        });
    };

    const { isPending: isLoadingCancel, isSuccess: isSuccessCancel, isError: isErrorCancel, data: dataCancel } = mutation;

    useEffect(() => {
        if (isSuccessCancel && dataCancel?.status === 'thành công') {
            Message.success('Đơn hàng đã được hủy thành công!');
        } else if (isErrorCancel) {
            Message.error('Hủy đơn hàng thất bại. Vui lòng thử lại!');
        }
    }, [isSuccessCancel, isErrorCancel, dataCancel]);

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };

    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');
    };

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
                {dataIndex === 'createdAt' ? (
                    <RangePicker
                        style={{ width: '100%' }}
                        onChange={(dates, dateStrings) => setSelectedKeys(dateStrings)}
                    />
                ) : (
                    <InputComponent
                        ref={searchInput}
                        placeholder={`Search ${dataIndex}`}
                        value={selectedKeys[0]}
                        onChange={(e) => setSelectedKeys(e.target.value ? [e.target.value] : [])}
                        onPressEnter={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        style={{
                            marginBottom: 8,
                            display: 'block',
                        }}
                    />
                )}

                <Space>
                    <Button
                        type="primary"
                        onClick={() => handleSearch(selectedKeys, confirm, dataIndex)}
                        icon={<SearchOutlined />}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Search
                    </Button>
                    <Button
                        onClick={() => clearFilters && handleReset(clearFilters)}
                        size="small"
                        style={{
                            width: 90,
                        }}
                    >
                        Reset
                    </Button>
                    <Button
                        type="link"
                        size="small"
                        onClick={() => {
                            close();
                        }}
                    >
                        close
                    </Button>
                </Space>
            </div>
        ),
        filterIcon: (filtered) => (
            <SearchOutlined
                style={{
                    color: filtered ? '#1677ff' : undefined,
                }}
            />
        ),
        onFilter: (value, record) =>
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
    });

    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'userName',
            sorter: (a, b) => a.name.localeCompare(b.name, 'vi'),
            ...getColumnSearchProps('userName'),
            width: 160,
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            sorter: (a, b) => a.address.localeCompare(b.address, 'vi'),
            ...getColumnSearchProps('address'),
            width: 150,
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            ...getColumnSearchProps('phone'),
            width: 100,
        },
        {
            title: 'Tổng tiền',
            dataIndex: 'totalPrice',
            ...getColumnSearchProps('totalPrice'),
            width: 130,
        },
        {
            title: 'Phương thức thanh toán',
            dataIndex: 'paymentMethod',
            filters: [
                {
                    text: 'Thanh toán bằng paypal',
                    value: 'PaypalTrue',
                },
                {
                    text: 'Thanh toán khi nhận hàng',
                    value: 'paymentMethodTrue',
                },
            ],
            onFilter: (value, record) => {
                switch (value) {
                    case 'PaypalTrue':
                        return record.paymentMethod === 'Thanh toán bằng paypal';
                    case 'paymentMethodTrue':
                        return record.paymentMethod === 'Thanh toán khi nhận hàng'
                    default:
                        return false; // Nếu không khớp với giá trị nào, trả về false
                }
            },
        },
        {
            title: 'Trạng thái giao hàng',
            dataIndex: 'isDelivered',
            width: 120,
            filters: [
                {
                    text: 'Đã giao hàng',
                    value: 'isDeliveredTrue',
                },
                {
                    text: 'Chưa giao hàng',
                    value: 'isDeliveredFalse',
                },
            ],
            onFilter: (value, record) => {
                switch (value) {
                    case 'isDeliveredTrue':
                        return record.isDelivered === 'Đã giao hàng';
                    case 'isDeliveredFalse':
                        return record.isDelivered === 'Chưa giao hàng'
                    default:
                        return false; // Nếu không khớp với giá trị nào, trả về false
                }
            },
        },
        {
            title: 'Trạng thái',
            dataIndex: 'isPaid',
            width: 110,
            ellipsis: true,
            filters: [
                {
                    text: 'Đã thanh toán',
                    value: 'isPaidTrue',
                },
                {
                    text: 'Chưa thanh toán',
                    value: 'isPaidFalse',
                },

            ],
            onFilter: (value, record) => {
                switch (value) {
                    case 'isPaidTrue':
                        return record.isPaid === 'Đã thanh toán';
                    case 'isPaidFalse':
                        return record.isPaid === 'Chưa thanh toán'
                    default:
                        return false; // Nếu không khớp với giá trị nào, trả về false
                }
            },
        },
        {
            title: 'Ngày tạo',
            dataIndex: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt),
            render: (text) => dayjs(text || '').format('DD/MM/YYYY'),
            ...getColumnSearchProps('createdAt'),
            width: 130,
        },
        {
            title: 'Hành động',
            dataIndex: 'action',
            render: (_, record) => (
                <>
                    <Button
                        onClick={() => handleCancelOrder(record.key)}
                        size="small"
                        danger
                        loading={isLoadingCancel}
                    >
                        Hủy đơn hàng
                    </Button>
                    <Button
                        onClick={() => navigate(`/details-order/${record.key}`, { state: { token: user?.access_token } })}
                        size="small"
                        style={{ marginLeft: '10px', marginTop: '10px' }}
                    >
                        Xem chi tiết
                    </Button>
                </>
            ),
            width: 150,
        },
    ];

    const dataTable = orders?.data?.length
        ? orders?.data?.map((order) => {
            return {
                ...order,
                key: order._id,
                userName: order?.shippingAddress?.fullName,
                address: order?.shippingAddress?.address,
                phone: order?.shippingAddress?.phone,
                city: order?.shippingAddress?.city,
                paymentMethod: orderContant.payment[order?.paymentMethod],
                isPaid: order?.isPaid ? 'Đã thanh toán' : 'Chưa thanh toán',
                isDelivered: order?.isDelivered ? 'Đã giao hàng' : 'Chưa giao hàng',
                totalPrice: convertPrice(order.totalPrice),
            };
        })
        : [];

    return (
        <div>
            <WrapperHeader>Quản lý đơn hàng</WrapperHeader>
            <div style={{ width: '500px', height: '500px' }}>
                <ColumnChart data={orders?.data} />
            </div>
            <div style={{ margin: '15px' }}>
                <TableComponent columns={columns} isPending={isLoadingOrder} data={dataTable} />
            </div>
        </div>
    );
};

export default OrderAdmin;
