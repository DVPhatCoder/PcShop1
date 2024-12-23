import { Menu } from 'antd'
import React, { useState } from 'react'
import { LaptopOutlined, UserOutlined, ProductOutlined } from '@ant-design/icons'; // Import thêm biểu tượng
import Sider from 'antd/es/layout/Sider';
import HeaderComponent from '../../components/HeaderComponent/HeaderComponent';
import AdminProduct from '../../components/AdminProduct/AdminProduct';
import AdminUser from '../../components/AdminUser/AdminUser';
import OrderAdmin from '../../components/OrderAdmin/OrderAdmin';

const AdminPage = () => {
    const [KeySelected, setKeySelected] = useState(' ')
    const renderPage = (key) => {
        switch (key) {
            case 'user':
                return (
                    <AdminUser />
                )
            case 'products':
                return (
                    <AdminProduct />
                )
            case 'order':
                return (
                    <OrderAdmin />
                )
            default:
                return <></>
        }

    }
    const items = [
        {
            key: 'user',
            icon: <UserOutlined />, // Biểu tượng User
            label: 'Người dùng',
        },
        {
            key: 'products',
            icon: <LaptopOutlined />, // Biểu tượng Laptop
            label: 'Sản phẩm',
        },
        {
            key: 'order',
            icon: < ProductOutlined />, // Biểu tượng 
            label: 'Quản lý đơn hàng',
        },
    ];
    const handleOnClick = ({ key }) => {
        setKeySelected(key)
    }
    return (
        <>
            <HeaderComponent isHiddenSearch isHiddenCart />
            <div style={{ display: 'flex' }}> {/* Sử dụng flexbox */}
                <Sider
                    width={200}
                    style={{
                        boxShadow: '1px 1px 2px #ccc',
                        background: 'white',
                    }}
                >
                    <Menu
                        mode='inline'
                        style={{
                            height: '100%',
                            borderRight: 0,
                        }}
                        onClick={handleOnClick}
                        items={items}
                    />
                </Sider>
                <div style={{ padding: '20px', flex: 1 }}> {/* Nội dung bên cạnh Sider */}
                    {renderPage(KeySelected)}
                </div>
            </div>
        </>


    );
};

export default AdminPage;
