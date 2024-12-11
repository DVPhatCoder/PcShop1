import React from 'react'
import { StyleNameProduct, WrapperCardStyle, WrapperDiscountText, WrapperImageStyle, WrapperPriceText, WrapperStyleTextSell } from './style'
import { WrapperReportText } from './style'
import logo from '../../assets/images/logo.jpg'
import { useNavigate } from 'react-router-dom';
import { StarFilled } from '@ant-design/icons';
import { convertPrice } from '../../util';
import styled from 'styled-components';

const CardComponent = (props) => {
    const { countInStock, description, image, name, price, rating, type, discount, selled, id, description1 } = props

    const navigate = useNavigate()

    const handleDetailsProduct = (id) => {
        navigate(`/product-details/${id}`)
    }

    return (
        <WrapperCardStyle
            hoverable
            style={{
                width: 200,
                opacity: countInStock === 0 ? 0.5 : 1, // Giảm độ sáng nếu hết hàng
                cursor: countInStock === 0 ? 'not-allowed' : 'pointer'
            }}
            cover={<img alt="example" src={image} />}
            onClick={() => countInStock !== 0 && handleDetailsProduct(id)}
        >
            <WrapperImageStyle
                src={logo}
                style={{
                    width: '68px',
                    height: '14px',
                    position: 'absolute',
                    top: 0,
                    left: 0
                }}
            />
            <StyleNameProduct style={{ width: '160px' }}>
                {name}
            </StyleNameProduct>
            <WrapperReportText>
                <span style={{ marginRight: '4px' }}>
                    <span>
                        {rating} <StarFilled style={{ fontSize: '12px', color: '#FFC400' }} />
                    </span>
                </span>
                <WrapperStyleTextSell>
                    | Đã bán {selled || 0}+
                </WrapperStyleTextSell>
            </WrapperReportText>
            <WrapperPriceText>
                <span style={{ marginRight: '8px' }}>
                    {convertPrice(price)}
                </span>
                <WrapperDiscountText>
                    -{discount || 0} %
                </WrapperDiscountText>
            </WrapperPriceText>

            {countInStock === 0 && (
                <div
                    style={{
                        position: 'absolute',
                        top: '50%',
                        left: '50%',
                        transform: 'translate(-50%, -50%)',
                        backgroundColor: 'rgba(0, 0, 0, 0.7)',
                        color: 'white',
                        padding: '5px 10px',
                        borderRadius: '4px',
                    }}
                >
                    Hết hàng
                </div>
            )}
        </WrapperCardStyle>
    )
}

export default CardComponent
