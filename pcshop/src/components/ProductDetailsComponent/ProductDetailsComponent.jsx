import { Col, Row, Image, } from 'antd'
import React from 'react'
import imageProduct from '../../assets/images/test.webp'
import imageProductSmall from '../../assets/images/test2.webp'
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleSmall, WrapperStyleTextSell } from './style'
import { PlusOutlined, StarFilled, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent'


const ProductDetailsComponent = () => {
    const onChange = () => { }
    return (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5', paddingRight: '8px' }}>
                <Image src={imageProduct} alt="image product" preview={false} />
                <Row style={{ padding: '8px', justifyContent: 'space-between', }}>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>
                    <WrapperStyleColImage span={4}>
                        <WrapperStyleSmall src={imageProductSmall} alt="image small" preview={false} />
                    </WrapperStyleColImage>

                </Row>
            </Col>
            <Col span={14} style={{ paddingLeft: '10px' }}>
                <WrapperStyleNameProduct> Apple iPhone 11</WrapperStyleNameProduct>
                <div>
                    <StarFilled style={{ fontSize: '12px', color: '#FFC400' }} />
                    <StarFilled style={{ fontSize: '12px', color: '#FFC400' }} />
                    <StarFilled style={{ fontSize: '12px', color: '#FFC400' }} />
                    <StarFilled style={{ fontSize: '12px', color: '#FFC400' }} />
                    <WrapperStyleTextSell>| Da ban 1000+</WrapperStyleTextSell>
                </div>
                < WrapperPriceProduct>
                    <WrapperPriceTextProduct>
                        2.000.000d
                    </WrapperPriceTextProduct>
                </ WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao Đến</span>
                    <span className='address'> Q. Hoàn Kiếm, P. Hàng Trống, Hà Nội</span>
                    <span className='change-address'> - Đổi địa chỉ</span>
                </WrapperAddressProduct>
                <div style={{ margin: ' 10px 0 20px', padding: '10px 0', borderTop: ' 1px solid #e5', borderBottom: ' 1px solid #e5' }}>
                    <div style={{ margin: '0 0 10px' }}>Số Lượng</div>
                    <WrapperQualityProduct>
                        <button style={{ border: 'none', background: 'transparent' }}>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} size="10px" />
                        </button>
                        <WrapperInputNumber defaultValue={1} onChange={onChange} size="small" />
                        <button style={{ border: 'none', background: 'transparent' }}>
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} size="10px" />
                        </button>
                    </WrapperQualityProduct>
                </div>
                <div style={{ display: 'flex', alignitems: 'center', gap: '20px' }}>
                    <ButtonComponent

                        size={40}
                        styleButton={{
                            background: 'rgb( 255, 57, 69)',
                            height: '48px', width: '220px',
                            border: 'none',
                            borderRadius: '4px'
                        }}
                        textButton={'Chọn Mua'}
                        styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700', }}
                    ></ButtonComponent>
                    <ButtonComponent

                        size={40}
                        styleButton={{

                            background: '#fff',
                            height: '48px', width: '220px',
                            border: 'blue 1px solid',
                            borderRadius: '4px'
                        }}
                        textButton={'Mua Trả Sau'}
                        styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}>
                    </ButtonComponent>
                </div>
            </Col>
        </Row >
    )
}

export default ProductDetailsComponent