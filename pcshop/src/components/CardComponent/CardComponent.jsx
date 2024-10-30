import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperImageStyle, WrapperPriceText, WrapperStyleTextSell } from './style'
import { WrapperReportText } from './style'
import logo from '../../assets/images/logo.jpg'
import { useNavigate } from 'react-router-dom';


import {
    StarFilled
} from '@ant-design/icons';
const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id } = props
    const navigate = useNavigate()
    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }

    return (
        <WrapperCardStyle
            hoverable
            style={{ width: 200 }}
            cover={<img alt="example" src={image} />}
            onClick={() => handleDetailsProduct(id)}
        >
            <WrapperImageStyle src={logo} style={{ with: '68px', height: '14px', position: 'absolute', top: 0, left: 0 }} > </WrapperImageStyle>
            <StyleNameProduct> {name}</StyleNameProduct >
            < WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span> {rating} <StarFilled style={{ fontSize: '12px', color: '#FFC400' }} /></span>
                </span>
                <WrapperStyleTextSell>| {selled || 1000}+</WrapperStyleTextSell>
            </ WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>{price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' })}</span>
                <WrapperDiscountText >
                    - {discount || 5} %
                </WrapperDiscountText>
            </WrapperPriceText>

        </WrapperCardStyle>
    )
}

export default CardComponent