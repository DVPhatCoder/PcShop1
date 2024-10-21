import { Button, Table } from 'antd';
import Loading from '../LoadingComponent/Loading';
import { useState } from 'react';
import { Excel } from "antd-table-saveas-excel";

const TableComponent = (props) => {
    const { selectionType = 'checkbox', data: dataSource = [], isPending = false, columns = [], handleDeleteMany } = props;
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
    const exportExcel = () => {
        // Loại bỏ cột action
        const filteredColumns = columns.filter(column => column.dataIndex !== 'action');
        const excel = new Excel();
        excel
            .addSheet("test")
            .addColumns(filteredColumns) // Sử dụng cột đã được lọc
            .addDataSource(dataSource, {
                str2Percent: true
            })
            .saveAs("Excel.xlsx");
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
            <Button onClick={exportExcel}>Xuất ra File Excel</Button>
            <Table
                id='table-xls'
                columns={columns.filter(column => column.dataIndex !== 'action')}
                rowSelection={{
                    type: selectionType,
                    ...rowSelection,
                }}
                columns={columns}
                dataSource={dataSource}
                {...props}
            />
        </Loading>
    );
};

export default TableComponent;
