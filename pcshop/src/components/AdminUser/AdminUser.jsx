import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader, WrapperUploadFile } from './style'
import { Button, Form, Space } from 'antd';
import TableComponent from '../TableComponent/TableComponent';
import { ModalComponent } from '../ModalComponent/ModalComponent';
import Loading from '../LoadingComponent/Loading';
import InputComponent from '../InputComponent/InputComponent';
import { DrawComponent } from '../DrawComponent/DrawComponent';
import { getBase64 } from '../../util';
import * as Message from '../../components/Message/Message'
import { useSelector } from 'react-redux';
import { useMutationHooks } from '../../hooks/useMutationHook';
import * as UserServices from '../../services/UserServices'
import { useQuery } from '@tanstack/react-query';
import { DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import dayjs from 'dayjs';


const AdminUser = () => {
    const user = useSelector((state) => state?.user)
    const [rowSelected, setRowSelected] = useState('')
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isOpenDraw, setIsOpenDraw] = useState(false)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);

    const [stateUserDetail, setStateUserDetail] = useState({
        name: '',
        email: '',
        phone: '',
        address: '',
        avatar: '',
        isAdmin: false,
    })
    const [form] = Form.useForm();
    const mutationUpdate = useMutationHooks(
        async (data) => {
            console.log('data', data)
            try {
                const { id, token, ...rests } = data;
                const res = await UserServices.updateUser(id, { ...rests }, token);
                return res;
            } catch (error) {
                console.error("Lỗi khi cập nhập người dùng:", error.response?.data || error.message);
            }
        }

    );

    const mutationDeleted = useMutationHooks(
        async (data) => {
            try {
                const { id, token } = data;
                const res = await UserServices.deleteUser(id, token);
                return res;
            } catch (error) {
                console.error("Lỗi khi xóa người dùng:", error.response?.data || error.message);
            }
        }
    );
    const mutationDeletedMany = useMutationHooks(
        async (data) => {
            try {
                const { token, ...ids } = data;
                const res = await UserServices.deleteManyUser(ids, token);
                return res;
            } catch (error) {
                console.error("Lỗi khi xóa người dùng:", error.response?.data || error.message);
            }
        }
    );
    const handleDeleteManyUser = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }
    const handleOnChangeDetail = (e) => {
        setStateUserDetail({
            ...stateUserDetail,
            [e.target.name]: e.target.value
        });
    };

    const getAllUser = async () => {
        const res = await UserServices.getAllUser(user?.access_token)
        return res
    }

    const fetchGetDetailsUser = async (rowSelected) => {
        const res = await UserServices.getDetailsUser(rowSelected);
        if (res?.data) {
            setStateUserDetail({
                name: res?.data?.name,
                email: res?.data?.email,
                phone: res?.data?.phone,
                isAdmin: res?.data?.isAdmin,
                address: res?.data?.address,
                avatar: res?.data?.avatar,
            })
        }
        setIsPendingUpdate(false)
    }

    useEffect(() => {
        form.setFieldsValue(stateUserDetail)
    }, [form, stateUserDetail])

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsUser(rowSelected)
        }
    }, [rowSelected])

    const handleDetailsUser = () => {
        if (rowSelected) {
            fetchGetDetailsUser(rowSelected)
        }
        setIsOpenDraw(true)
    }

    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated, isPending: isPendingUpdated } = mutationUpdate
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted, isPending: isPendingDeleted } = mutationDeleted
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany, isPending: isPendingDeletedMany } = mutationDeletedMany
    const queryUser = useQuery({ queryKey: ['users'], queryFn: getAllUser });
    const { data: users, isPending: isLoadingUsers } = queryUser

    const handleSearch = (selectedKeys, confirm, dataIndex) => {
        confirm();
        setSearchText(selectedKeys[0]);
        setSearchedColumn(dataIndex);
    };
    const handleReset = (clearFilters) => {
        clearFilters();
        setSearchText('');

    };

    const renderAction = () => {
        return (
            <div style={{ fontSize: '25px', cursor: 'pointer' }}>
                <DeleteOutlined style={{ color: 'red' }} onClick={() => setIsModalOpenDelete(true)} />
                <EditOutlined style={{ padding: '0 10px', color: 'blue' }} onClick={handleDetailsUser} />
            </div>
        )
    }

    const getColumnSearchProps = (dataIndex) => ({
        filterDropdown: ({ setSelectedKeys, selectedKeys, confirm, clearFilters, close }) => (
            <div
                style={{
                    padding: 8,
                }}
                onKeyDown={(e) => e.stopPropagation()}
            >
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
            (record[dataIndex]?.toString() || '').toLowerCase().includes(value.toLowerCase()),
        onFilterDropdownOpenChange: (visible) => {
            if (visible) {
                setTimeout(() => searchInput.current?.select(), 100);
            }
        },
        // render: (text) =>
        //   searchedColumn === dataIndex ? (
        //     <Highlighter
        //       highlightStyle={{
        //         backgroundColor: '#ffc069',
        //         padding: 0,
        //       }}
        //       searchWords={[searchText]}
        //       autoEscape
        //       textToHighlight={text ? text.toString() : ''}
        //     />
        //   ) : (
        //     text
        //   ),
    });
    const columns = [
        {
            title: 'Tên người dùng',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name, 'vi'),
            ...getColumnSearchProps('name')
        },
        {
            title: 'Email',
            dataIndex: 'email',
            sorter: (a, b) => a.email.length - b.email.length,
            ...getColumnSearchProps('email')
        },
        {
            title: 'Số điện thoại',
            dataIndex: 'phone',
            ...getColumnSearchProps('phone')
        },
        {
            title: 'Admin',
            dataIndex: 'isAdmin',
            filters: [
                {
                    text: 'Quản trị viên',
                    value: true,
                },
                {
                    text: 'Người dùng',
                    value: false,
                }

            ]
        },
        {
            title: 'Địa chỉ',
            dataIndex: 'address',
            sorter: (a, b) => a.address.localeCompare(b.address, 'vi'),
            ...getColumnSearchProps('address')
        },
        {
            title: 'ngày tạo',
            dataIndex: 'createdAt',
            sorter: (a, b) => new Date(a.createdAt) - new Date(b.createdAt), // Sắp xếp ngày
            render: (text) => dayjs(text || '').format('DD/MM/YYYY'), // Nếu `text` là null hoặc undefined, nó sẽ sử dụng chuỗi rỗng
            ...getColumnSearchProps('createdAt')
        },
        {
            title: 'ngày cập nhập',
            dataIndex: 'updatedAt',
            sorter: (a, b) => new Date(a.updatedAt) - new Date(b.updatedAt), // Sắp xếp ngày
            render: (text) => dayjs(text).format('DD/MM/YYYY'), // Định dạng ngày hiển thị
            ...getColumnSearchProps('updatedAt')
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = users?.data?.length
        ? users?.data?.map((user) => {
            return {
                ...user,
                key: user._id,
                isAdmin: user?.isAdmin ? 'True' : 'False',
            };
        })
        : [];

    useEffect(() => {
        if (isSuccessUpdated) {
            if (dataUpdated?.status === 'thành công') {
                Message.success('Cập nhập người dùng thành công!'); // Thông báo cập nhập đúng
                handleCloseDrawer(); // Đóng modal sau khi cập nhập thành công
            } else {
                Message.error(dataUpdated?.message || 'Có lỗi xảy ra khi Cập nhập!'); // Nếu phản hồi không như mong muốn
            }
        } else if (isErrorUpdated) {
            Message.error('Có lỗi xảy ra khi Cập nhập!'); // Thông báo lỗi
        }
    }, [isSuccessUpdated, isErrorUpdated, dataUpdated]);

    useEffect(() => {
        if (isSuccessDeleted) {
            Message.success('Xóa người dùng thành công!');
            handleCancelDelete();
        } else if (isErrorDeleted) {
            Message.error('Có lỗi xảy ra khi xóa!');
        }
    }, [isSuccessDeleted, isErrorDeleted, dataDeleted]);
    useEffect(() => {
        if (isSuccessDeletedMany) {
            Message.success('Xóa nhiều người dùng thành công!');
            handleCancelDelete();
        } else if (isErrorDeletedMany) {
            Message.error('Có lỗi xảy ra khi xóa!');
        }
    }, [dataDeletedMany, isSuccessDeletedMany, isErrorDeletedMany])
    const handleCloseDrawer = () => {
        setIsOpenDraw(false);
        setStateUserDetail({
            name: '',
            email: '',
            phone: '',
            address: '',
            isAdmin: false,
        })
        form.resetFields()
    };
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }
    const handleDeleteUser = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryUser.refetch()
            }
        })
    }
    const handleOnchangeUserDetail = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateUserDetail({
            ...stateUserDetail,
            avatar: file.preview
        });
    }

    const onUpdateUser = () => {
        mutationUpdate.mutate({
            id: rowSelected,
            token: user?.access_token,
            ...stateUserDetail
        }, {
            onSettled: () => {
                queryUser.refetch()
            }
        });
    };

    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ margin: '15px' }}>
                <TableComponent handleDeleteMany={handleDeleteManyUser} columns={columns} isPending={isLoadingUsers} data={dataTable} onRow={(record, rowIndex) => {
                    return {
                        onClick: (event) => {
                            setRowSelected(record._id)
                        }, // click row
                    }
                }} />
            </div>
            <DrawComponent title='Chi tiết người dùng' isOpen={isOpenDraw} onClose={() => setIsOpenDraw(false)} width="83%">
                <Loading isPending={isPendingUpdate || isPendingUpdated}>
                    <Form
                        name="basic"
                        labelCol={{
                            span: 5,
                        }}
                        wrapperCol={{
                            span: 16,
                        }}
                        onFinish={onUpdateUser}
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
                            label="Email"
                            name="email"
                            rules={[
                                {
                                    required: true,
                                    message: 'Vui lòng nhập email!',
                                },
                            ]}
                        >
                            <InputComponent value={stateUserDetail.email} onChange={handleOnChangeDetail} name="email" />
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
                        <Form.Item
                            label="Admin"
                            name="isAdmin"
                        >
                            <InputComponent value={stateUserDetail.isAdmin} onChange={handleOnChangeDetail} name="isAdmin" />
                        </Form.Item>
                        <Form.Item
                            label="Ảnh người dùng"
                            name="avatar"
                            rules={[{ required: true, message: 'Vui lòng tải lên ảnh người dùng!' }]}>
                            <WrapperUploadFile onChange={handleOnchangeUserDetail} maxCount={1}>
                                <Button>Upload</Button>
                                {stateUserDetail?.avatar && (
                                    <img src={stateUserDetail?.avatar} style={{
                                        height: '100px',
                                        width: '100px',
                                        objectFit: 'cover',
                                        margin: '0 10px',
                                    }} alt="avatar" />
                                )}
                            </WrapperUploadFile>
                        </Form.Item>
                        <Form.Item
                            wrapperCol={{
                                offset: 5,
                                span: 16,
                            }}
                        >
                            <Button type="primary" htmlType="apply">
                                Apply
                            </Button>
                        </Form.Item>
                    </Form>
                </Loading>
            </DrawComponent>
            <ModalComponent forceRender title="Xóa Người dùng" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteUser}>
                <Loading isPending={isPendingDeleted}>
                    <div>Bạn có muốn xóa người dùng này không?</div>
                </Loading>
            </ModalComponent>
        </div>
    )
}

export default AdminUser