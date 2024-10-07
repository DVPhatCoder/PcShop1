import React from 'react'
import { WrapperHeader } from './style'
import { Button } from 'antd';
import { PlusOutlined } from '@ant-design/icons';
import TableComponent from '../TableComponent/TableComponent';


const AdminUser = () => {

    return (
        <div>
            <WrapperHeader>Quản lý người dùng</WrapperHeader>
            <div style={{ margin: '10px' }}>
                <Button style={{ height: '150px', width: '150px', borderRadius: '6px', borderStyle: 'dashed' }}><PlusOutlined style={{ fontSize: '50px' }} /> </Button>
            </div>
            <div style={{ margin: '15px' }}>
                <TableComponent />
            </div>

        </div>
    )
}

export default AdminUser