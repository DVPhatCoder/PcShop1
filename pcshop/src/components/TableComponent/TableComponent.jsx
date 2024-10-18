import { Table } from 'antd';
import Loading from '../LoadingComponent/Loading';
import { useState } from 'react';

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data = [], isPending = false, columns = [], handleDeleteMany } = props;
    const [rowSelectedKey, setRowSelectedKey] = useState([]);

    const rowSelection = {
        onChange: (selectedRowKeys) => {
            setRowSelectedKey(selectedRowKeys); // Cập nhật selected keys
            console.log(`selectedRowKeys: ${selectedRowKeys}`);
        },
    };

    const handleDeleteAll = () => {
        handleDeleteMany(rowSelectedKey)

    };

    return (
        <Loading isPending={isPending}>
            {rowSelectedKey.length > 0 && (
                <div style={{
                    background: '#1d1ddd',
                    color: '#fff',
                    fontWeight: 'bold',
                    padding: '10px',
                    cursor: 'pointer',
                }}
                    onClick={handleDeleteAll}
                >
                    Xóa tất cả
                </div>
            )}
            <Table
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={data}
                {...props}
            />
        </Loading>
    );
};

export default TableComponent;
