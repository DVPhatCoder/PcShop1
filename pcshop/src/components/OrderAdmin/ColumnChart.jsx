import React from 'react';
import {
    BarChart,
    Bar,
    XAxis,
    YAxis,
    CartesianGrid,
    Tooltip,
    Legend,
    ResponsiveContainer
} from 'recharts';
import { convertDataChart } from '../../util';

const ColumnChart = ({ data }) => {
    const chartData = convertDataChart(data, 'totalPrice', 'createdAt');

    return (
        <ResponsiveContainer width="100%" height={400}>
            <BarChart
                data={chartData}
                margin={{
                    top: 20,
                    right: 30,
                    left: 20,
                    bottom: 5,
                }}
            >
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis
                    dataKey="name"
                    tick={{ textAnchor: 'middle' }}
                />
                <YAxis width={100} tickFormatter={(value) => `${value.toLocaleString('vi-VN')} đ`} />
                <Tooltip formatter={(value) => `${value.toLocaleString('vi-VN')} đ`} />
                <Legend />
                <Bar dataKey="Tiền" fill="#8884d8" />
            </BarChart>
        </ResponsiveContainer>
    );
};

export default ColumnChart;
