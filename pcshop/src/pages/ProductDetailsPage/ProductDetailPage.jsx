import React from 'react'
import ProductDetailsComponent from '../../components/ProductDetailsComponent/ProductDetailsComponent'
import { useNavigate, useParams } from 'react-router-dom'
import FooterComponent from '../../components/FooterComponent/FooterComponent'

const ProductDetailPage = () => {
    const { id } = useParams()
    const navigate = useNavigate()
    return (
        <div style={{ background: '#efefef', height: '100%', width: '100%', fontSize: '16px' }}>
            <div style={{ width: '1270px', height: '100%', margin: '0 auto' }}>
                <h5> <span style={{ cursor: 'pointer', fontWeight: 'bold' }} onClick={() => { navigate('/') }}>Trang Chủ</span> - Chi tiết sản phẩm </h5>
                <ProductDetailsComponent idProduct={id} />
            </div>
            <FooterComponent />
        </div>
    )
}

export default ProductDetailPage