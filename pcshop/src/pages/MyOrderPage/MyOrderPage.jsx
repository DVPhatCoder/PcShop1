import { useSelector } from 'react-redux';
import Loading from '../../components/LoadingComponent/Loading';
import * as OrderServices from '../../services/OrderServices'
import React from 'react'
import { useQuery } from '@tanstack/react-query';
const MyOrderPage = () => {
    const user = useSelector((state) => state.user)
    const fetchMyOrder = async () => {
        const res = await OrderServices.getOrderUserDetails(user?.id, user?.access_token)
        return res.data
    }
    const queryOrder = useQuery({ queryKey: ['users'], queryFn: fetchMyOrder },);
    const { data, isLoading } = queryOrder
    console.log('data', data)
    return (
        <Loading isPending={isLoading}>
            < div style={{ background: '#f5f5fa', width: '100%', height: '100vh', fontSize: '14px' }}>

            </div >
        </Loading>
    )
}

export default MyOrderPage