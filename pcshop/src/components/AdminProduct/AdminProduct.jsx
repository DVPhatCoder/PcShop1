import React, { useEffect, useRef, useState } from 'react'
import { WrapperHeader } from './style'
import { Button, Form, Select, Space } from 'antd';
import { PlusOutlined, DeleteOutlined, EditOutlined, SearchOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';
import InputComponent from '../InputComponent/InputComponent';
import { getBase64, renderOptions } from '../../util';
import { WrapperUploadFile } from '../../pages/ProfilePage/style';
import * as ProductServices from '../../services/ProductServices'
import { useMutationHooks } from '../../hooks/useMutationHook'
import Loading from '../LoadingComponent/Loading';
import * as Message from '../../components/Message/Message'
import { useQuery } from '@tanstack/react-query';
import { DrawComponent } from '../DrawComponent/DrawComponent';
import { useSelector } from 'react-redux';
import { ModalComponent } from '../ModalComponent/ModalComponent';




const AdminProduct = () => {
    const truncateText = (text, maxLength) => {
        if (text.length <= maxLength) {
            return text; // Nếu chuỗi ngắn hơn hoặc bằng độ dài yêu cầu, trả về chuỗi gốc
        }
        return text.substring(0, maxLength) + '...'; // Cắt chuỗi và thêm dấu ba chấm
    };
    const [isModalOpen, setIsModalOpen] = useState(false);
    const user = useSelector((state) => state?.user)
    const [rowSelected, setRowSelected] = useState('')
    const [isModalOpenDelete, setIsModalOpenDelete] = useState(false)
    const [isOpenDraw, setIsOpenDraw] = useState(false)
    const [isPendingUpdate, setIsPendingUpdate] = useState(false)
    const [searchText, setSearchText] = useState('');
    const [searchedColumn, setSearchedColumn] = useState('');
    const searchInput = useRef(null);
    const innittial = () => ({
        name: '',
        type: '',
        price: '',
        image: '',
        countInStock: '',
        rating: '',
        description: '',
        newType: '',
        discount: '',
    })
    const [stateProduct, setStateProduct] = useState(innittial())
    const [stateProductDetail, setStateProductDetail] = useState(innittial())
    const [form] = Form.useForm();
    const mutation = useMutationHooks(
        async (data) => {
            try {
                const {
                    name,
                    image,
                    type,
                    price,
                    rating,
                    description,
                    countInStock,
                    discount,
                } = data;
                const res = await ProductServices.createProduct({
                    name,
                    image,
                    type,
                    price,
                    rating,
                    description,
                    countInStock,
                    discount,
                });
                return res;
            } catch (error) {
                console.error("Lỗi khi tạo sản phẩm:", error.response?.data || error.message);
            }

        }
    );

    const mutationUpdate = useMutationHooks(
        async (data) => {
            try {
                const { id, token, ...rests } = data;
                const res = await ProductServices.updateProduct(id, { ...rests }, token);
                return res;
            } catch (error) {
                console.error("Lỗi khi cập nhập sản phẩm:", error.response?.data || error.message);
            }
        }

    );
    const mutationDeleted = useMutationHooks(
        async (data) => {
            try {
                const { id, token } = data;
                const res = await ProductServices.deleteProduct(id, token);
                return res;
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm:", error.response?.data || error.message);
            }
        }
    );
    const mutationDeletedMany = useMutationHooks(
        async (data) => {
            try {
                const { token, ...ids } = data;
                const res = await ProductServices.deleteManyProduct(ids, token);
                return res;
            } catch (error) {
                console.error("Lỗi khi xóa sản phẩm:", error.response?.data || error.message);
            }
        }
    );
    const handleOnChange = (e) => {
        setStateProduct({
            ...stateProduct,
            [e.target.name]: e.target.value
        });
    };

    const handleOnChangeDetail = (e) => {
        setStateProductDetail({
            ...stateProductDetail,
            [e.target.name]: e.target.value
        });
    };

    const getAllProduct = async () => {
        const res = await ProductServices.getAllProduct()
        return res
    }

    const fetchGetDetailsProduct = async (rowSelected) => {
        const res = await ProductServices.getDetailsProduct(rowSelected);
        if (res?.data) {
            setStateProductDetail({
                name: res?.data?.name,
                type: res?.data?.type,
                price: res?.data?.price,
                countInStock: res?.data?.countInStock,
                description: res?.data?.description,
                rating: res?.data?.rating,
                image: res?.data?.image,
                discount: res?.data?.discount,
            })
        }
        setIsPendingUpdate(false)
    }
    useEffect(() => {
        if (!isModalOpen) {
            form.setFieldsValue(stateProductDetail)
        } else {
            form.setFieldsValue(innittial())
        }
    }, [form, stateProductDetail, isModalOpen])

    useEffect(() => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected)
        }
    }, [rowSelected])

    const handleDetailsProduct = () => {
        if (rowSelected) {
            fetchGetDetailsProduct(rowSelected)
        }
        setIsOpenDraw(true)
    }
    const handleDeleteManyProduct = (ids) => {
        mutationDeletedMany.mutate({ ids: ids, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }
    const fetchAllTypeProduct = async () => {
        const res = await ProductServices.getAllTypeProduct()
        return res
    }
    const { data, isPending, isSuccess, isError } = mutation
    const { data: dataUpdated, isSuccess: isSuccessUpdated, isError: isErrorUpdated, isPending: isPendingUpdated } = mutationUpdate
    const { data: dataDeleted, isSuccess: isSuccessDeleted, isError: isErrorDeleted, isPending: isPendingDeleted } = mutationDeleted
    const { data: dataDeletedMany, isSuccess: isSuccessDeletedMany, isError: isErrorDeletedMany, isPending: isPendingDeletedMany } = mutationDeletedMany
    const typeProduct = useQuery({ queryKey: ['type-product'], queryFn: fetchAllTypeProduct });
    const queryProduct = useQuery({ queryKey: ['products'], queryFn: getAllProduct });
    const { data: products, isPending: isLoadingProducts } = queryProduct
    console.log('typeProduct', typeProduct)
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
                <EditOutlined style={{ padding: '0 10px', color: 'blue' }} onClick={handleDetailsProduct} />
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
            record[dataIndex].toString().toLowerCase().includes(value.toLowerCase()),
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
            title: 'Tên sản phẩm',
            dataIndex: 'name',
            sorter: (a, b) => a.name.localeCompare(b.name, 'vi'),
            ...getColumnSearchProps('name'),
            render: (text) => truncateText(text, 30), // Giới hạn 30 ký tự
        },
        {
            title: 'Giá sản phẩm',
            dataIndex: 'price',
            sorter: (a, b) => a.price - b.price,
            filters: [
                {
                    text: 'dưới 5.000.000đ',
                    value: 'lessThan5m',
                },
                {
                    text: 'Giá từ 5.000.000đ đến 10.000.000đ',
                    value: 'between5mAnd10m',
                },
                {
                    text: 'Giá từ 10.000.000đ đến 25.000.000đ',
                    value: 'between10mAnd25m',
                },
                {
                    text: 'Giá từ 25.000.000đ đến 50.000.000đ',
                    value: 'between25mAnd50m',
                },
                {
                    text: 'Giá trên 50.000.000đ',
                    value: 'greaterThan50m',
                },
            ],
            onFilter: (value, record) => {
                switch (value) {
                    case 'lessThan5m':
                        return record.price < 5000000;
                    case 'between5mAnd10m':
                        return record.price >= 5000000 && record.price <= 10000000;
                    case 'between10mAnd25m':
                        return record.price >= 10000000 && record.price <= 25000000;
                    case 'between25mAnd50m':
                        return record.price >= 25000000 && record.price <= 50000000;
                    case 'greaterThan50m':
                        return record.price > 50000000;
                    default:
                        return false; // Nếu không khớp với giá trị nào, trả về false
                }
            },
        },
        {
            title: 'Loại',
            dataIndex: 'type',
            sorter: (a, b) => a.type.localeCompare(b.type, 'vi'),
            ...getColumnSearchProps('type')
        },
        {
            title: 'Tồn kho',
            dataIndex: 'countInStock',
            filters: [
                {
                    text: 'Nhỏ hơn 50',
                    value: 'lessThan50',
                },
                {
                    text: 'Lớn hơn 50',
                    value: 'greaterThan50',
                },
            ],
            onFilter: (value, record) => {
                switch (value) {
                    case 'lessThan50':
                        return record.countInStock < 50; // Kiểm tra nếu countInStock nhỏ hơn 50
                    case 'greaterThan50':
                        return record.countInStock > 50; // Kiểm tra nếu countInStock lớn hơn 50
                    default:
                        return true; // Mặc định trả về true nếu không khớp
                }
            },
        },

        {
            title: 'Đánh giá',
            dataIndex: 'rating',
            sorter: (a, b) => a.rating - b.rating,
            filters: [
                {
                    text: 'đánh giá 1 sao',
                    value: '1sao',
                },
                {
                    text: 'đánh giá 2 sao',
                    value: '2sao',
                },
                {
                    text: 'đánh giá 3 sao',
                    value: '3sao',
                },
                {
                    text: 'đánh giá 4 sao',
                    value: '4sao',
                },
                {
                    text: 'đánh giá 5 sao',
                    value: '5sao',
                },

            ],
            onFilter: (value, record) => {
                switch (value) {
                    case '1sao':
                        return record.rating === 1; // Kiểm tra nếu = 1 sao
                    case '2sao':
                        return record.rating === 2; // Kiểm tra nếu = 2 sao
                    case '3sao':
                        return record.rating === 3; // Kiểm tra nếu = 3 sao
                    case '4sao':
                        return record.rating === 4; // Kiểm tra nếu = 4 sao
                    case '5sao':
                        return record.rating === 5; // Kiểm tra nếu = 5 sao

                    default:
                        return true; // Mặc định trả về true nếu không khớp
                }
            },
        },
        {
            title: 'Giảm giá',
            dataIndex: 'discount',
            filters: [
                {
                    text: 'Nhỏ hơn 50%',
                    value: 'lessThan50',
                },
                {
                    text: 'Lớn hơn 50%',
                    value: 'greaterThan50',
                },
            ],
            onFilter: (value, record) => {
                switch (value) {
                    case 'lessThan50':
                        return record.discount < 50; // Kiểm tra nếu countInStock nhỏ hơn 50
                    case 'greaterThan50':
                        return record.discount > 50; // Kiểm tra nếu countInStock lớn hơn 50
                    default:
                        return true; // Mặc định trả về true nếu không khớp
                }
            },
        },
        {
            title: 'Mô tả',
            dataIndex: 'description',
            sorter: (a, b) => a.type.localeCompare(b.type, 'vi'),
            render: (text) => truncateText(text, 20), // Giới hạn 20 ký tự
        },
        {
            title: 'Action',
            dataIndex: 'action',
            render: renderAction
        },
    ];
    const dataTable = products?.data?.length && products?.data?.map((product) => {
        return {
            ...product, key: product._id
        }
    })
    useEffect(() => {
        if (isSuccess) {
            if (data?.status === 'thành công') {
                Message.success('Tạo sản phẩm thành công!'); // Thông báo tạo đúng
                handleCancel(); // Đóng modal sau khi tạo thành công
            } else {
                Message.error(data?.message || 'Có lỗi xảy ra khi tạo!'); // Nếu phản hồi không như mong muốn
            }
        } else if (isError) {
            Message.error('Có lỗi xảy ra khi tạo!'); // Thông báo lỗi
        }
    }, [isSuccess, isError, data])

    useEffect(() => {
        if (isSuccessUpdated) {
            if (dataUpdated?.status === 'thành công') {
                Message.success('Cập nhập sản phẩm thành công!'); // Thông báo cập nhập đúng
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
            Message.success('Xóa sản phẩm thành công!');
            handleCancelDelete();
        } else if (isErrorDeleted) {
            Message.error('Có lỗi xảy ra khi xóa!');
        }
    }, [isSuccessDeleted, isErrorDeleted, dataDeleted]);

    useEffect(() => {
        if (isSuccessDeletedMany) {
            Message.success('Xóa nhiều sản phẩm thành công!');
            handleCancelDelete();
        } else if (isErrorDeletedMany) {
            Message.error('Có lỗi xảy ra khi xóa!');
        }
    }, [dataDeletedMany, isSuccessDeletedMany, isErrorDeletedMany])
    const handleCloseDrawer = () => {
        setIsOpenDraw(false);
        setStateProductDetail({
            name: '',
            type: '',
            price: '',
            image: '',
            countInStock: '',
            rating: '',
            description: '',
            discount: '',
        })
        form.resetFields()
    };

    const handleCancel = () => {
        setIsModalOpen(false);
        setStateProduct({
            name: '',
            type: '',
            price: '',
            image: '',
            countInStock: '',
            rating: '',
            description: '',
            discount: '',
        })
        form.resetFields()
    };
    const handleCancelDelete = () => {
        setIsModalOpenDelete(false)
    }
    const handleDeleteProduct = () => {
        mutationDeleted.mutate({ id: rowSelected, token: user?.access_token }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const onFinish = () => {
        const params = {
            name: stateProduct.name,
            type: stateProduct.type === 'add_type' ? stateProduct.newType : stateProduct.type,
            price: stateProduct.price,
            image: stateProduct.image,
            countInStock: stateProduct.countInStock,
            rating: stateProduct.rating,
            description: stateProduct.description,
            discount: stateProduct.discount
        }
        mutation.mutate(params, {
            onSettled: () => {
                queryProduct.refetch()
            }
        })
    }

    const handleOnchangeAvatar = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProduct({
            ...stateProduct,
            image: file.preview
        });
    }

    const handleOnchangeAvatarDetail = async ({ fileList }) => {
        const file = fileList[0]
        if (!file.url && !file.preview) {
            file.preview = await getBase64(file.originFileObj);
        }
        setStateProductDetail({
            ...stateProductDetail,
            image: file.preview
        });
    }

    const onUpdateProduct = () => {
        mutationUpdate.mutate({
            id: rowSelected,
            token: user?.access_token,
            ...stateProductDetail
        }, {
            onSettled: () => {
                queryProduct.refetch()
            }
        });
    }

    const handleChangeSelect = (value) => {
        setStateProduct({
            ...stateProduct,
            type: value,
        })
    }
    console.log('stateProduct', stateProduct)
    return (
        <div>
            <div>
                <WrapperHeader>Quản lý sản phẩm</WrapperHeader>
                <div style={{ margin: '10px' }}>
                    <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }} onClick={() => setIsModalOpen(true)}><PlusOutlined style={{ fontSize: '50px' }} /> </Button>
                </div>
                <div style={{ margin: '15px' }}>
                    <TableComponent handleDeleteMany={handleDeleteManyProduct} columns={columns} isPending={isLoadingProducts} data={dataTable} onRow={(record, rowIndex) => {
                        return {
                            onClick: (event) => {
                                setRowSelected(record._id)
                            }, // click row
                        }
                    }} />
                </div>
                <ModalComponent forceRender title="Tạo sản phẩm" open={isModalOpen} onCancel={handleCancel} footer={null}>
                    <Loading isPending={isPending}>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 6,
                            }}
                            wrapperCol={{
                                span: 18,
                            }}
                            style={{
                                maxWidth: 600,
                            }}
                            onFinish={onFinish}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                label="Tên Sản phẩm"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên Sản phẩm!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProduct.name} onChange={handleOnChange} name="name" />
                            </Form.Item>
                            <Form.Item
                                label="Loại sản phẩm"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Loại sản phẩm!',
                                    },
                                ]}
                            >
                                <Select
                                    name="type"
                                    // defaultValue="lucy"
                                    // style={{
                                    //     width: 120,
                                    // }}
                                    value={stateProduct.type}
                                    onChange={handleChangeSelect}
                                    options={renderOptions(typeProduct?.data?.data)}
                                />
                            </Form.Item>
                            {stateProduct.type === 'add_type' && (
                                <Form.Item
                                    label="Loại mới"
                                    name="newType"
                                    rules={[
                                        {
                                            required: true,
                                            message: 'Vui lòng nhập Loại sản phẩm!',
                                        },
                                    ]}>
                                    <InputComponent value={stateProduct.newType} onChange={handleOnChange} name="newType" />
                                </Form.Item>
                            )}

                            <Form.Item
                                label="Giá sản phẩm"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập giá sản phẩm!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProduct.price} onChange={handleOnChange} name="price" />
                            </Form.Item>
                            <Form.Item
                                label="SP còn trong kho"
                                name="countInStock"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập sản phẩm còn trong kho!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProduct.countInStock} onChange={handleOnChange} name="countInStock" />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProduct.description} onChange={handleOnChange} name="description" />
                            </Form.Item>
                            <Form.Item
                                label="Giảm Giá"
                                name="discount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Giảm Giá!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProduct.discount} onChange={handleOnChange} name="discount" />
                            </Form.Item>
                            <Form.Item
                                label="Đánh giá"
                                name="rating"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập đánh giá!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProduct.rating} onChange={handleOnChange} name="rating" />
                            </Form.Item>
                            <Form.Item
                                label="Ảnh sản phẩm"
                                name="image"
                                rules={[{ required: true, message: 'Vui lòng tải lên ảnh sản phẩm!' }]}>
                                <WrapperUploadFile onChange={handleOnchangeAvatar} maxCount={1}>
                                    <Button>Upload</Button>
                                    {stateProduct?.image && (
                                        <img src={stateProduct?.image} style={{
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
                                    offset: 6,
                                    span: 16,
                                }}
                            >
                                <Button type="primary" htmlType="submit">
                                    Submit
                                </Button>
                            </Form.Item>
                        </Form>
                    </Loading>
                </ModalComponent>
                <DrawComponent title='Chi tiết sản phẩm' isOpen={isOpenDraw} onClose={() => setIsOpenDraw(false)} width="83%">
                    <Loading isPending={isPendingUpdate || isPendingUpdated}>
                        <Form
                            name="basic"
                            labelCol={{
                                span: 5,
                            }}
                            wrapperCol={{
                                span: 16,
                            }}
                            onFinish={onUpdateProduct}
                            autoComplete="off"
                            form={form}
                        >
                            <Form.Item
                                label="Tên Sản phẩm"
                                name="name"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập tên Sản phẩm!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProductDetail.name} onChange={handleOnChangeDetail} name="name" />
                            </Form.Item>

                            <Form.Item
                                label="Loại sản phẩm"
                                name="type"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Loại sản phẩm!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProductDetail.type} onChange={handleOnChangeDetail} name="type" />
                            </Form.Item>
                            <Form.Item
                                label="Giá sản phẩm"
                                name="price"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập giá sản phẩm!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProductDetail.price} onChange={handleOnChangeDetail} name="price" />
                            </Form.Item>
                            <Form.Item
                                label="SP còn trong kho"
                                name="countInStock"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập sản phẩm còn trong kho!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProductDetail.countInStock} onChange={handleOnChangeDetail} name="countInStock" />
                            </Form.Item>
                            <Form.Item
                                label="Mô tả"
                                name="description"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập mô tả!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProductDetail.description} onChange={handleOnChangeDetail} name="description" />
                            </Form.Item>
                            <Form.Item
                                label="Giảm giá"
                                name="discount"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập Giảm giá!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProductDetail.discount} onChange={handleOnChangeDetail} name="discount" />
                            </Form.Item>
                            <Form.Item
                                label="Đánh giá"
                                name="rating"
                                rules={[
                                    {
                                        required: true,
                                        message: 'Vui lòng nhập đánh giá!',
                                    },
                                ]}
                            >
                                <InputComponent value={stateProductDetail.rating} onChange={handleOnChangeDetail} name="rating" />
                            </Form.Item>
                            <Form.Item
                                label="Ảnh sản phẩm"
                                name="image"
                                rules={[{ required: true, message: 'Vui lòng tải lên ảnh sản phẩm!' }]}>
                                <WrapperUploadFile onChange={handleOnchangeAvatarDetail} maxCount={1}>
                                    <Button>Upload</Button>
                                    {stateProductDetail?.image && (
                                        <img src={stateProductDetail?.image} style={{
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
                <ModalComponent forceRender title="Xóa sản phẩm" open={isModalOpenDelete} onCancel={handleCancelDelete} onOk={handleDeleteProduct}>
                    <Loading isPending={isPendingDeleted}>
                        <div>Bạn có muốn xóa sản phẩm này không?</div>
                    </Loading>
                </ModalComponent>
            </div>
        </div>
    )
}

export default AdminProduct