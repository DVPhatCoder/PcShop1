import { Col, Row, Image } from 'antd';
import React, { useState } from 'react';
import imageProductSmall from '../../assets/images/test2.webp';
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperPriceTextProduct, WrapperQualityProduct, WrapperStyleColImage, WrapperStyleNameProduct, WrapperStyleSmall, WrapperStyleTextSell } from './style';
import { PlusOutlined, StarFilled, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductServices from '../../services/ProductServices';
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux';

const ProductDetailsComponent = ({ idProduct }) => {
    const user = useSelector((state) => state.user)
    const [numProduct, setNumProduct] = useState(1); // Khởi tạo với giá trị mặc định là 1

    const onChange = (e) => {
        const value = Number(e.target.value);
        setNumProduct(isNaN(value) ? 1 : value); // Nếu giá trị không hợp lệ, đặt về 1
    };

    const fetchGetDetailsProduct = async (context) => {
        const id = context?.queryKey && context?.queryKey[1];
        if (id) {
            const res = await ProductServices.getDetailsProduct(id);
            return res.data;
        }
    };

    const { data: productsDetails, isLoading } = useQuery({
        queryKey: ['products-details', idProduct],
        queryFn: fetchGetDetailsProduct,
        enabled: !!idProduct,
    });

    const renderStars = (num) => {
        const stars = [];
        for (let i = 0; i < num; i++) {
            stars.push(<StarFilled key={i} style={{ color: '#FFC400', fontSize: '20px' }} />);
        }
        return stars;
    };

    const handleonChangeCount = (type) => {
        if (type === 'increase') {
            setNumProduct((prev) => prev + 1);
        } else if (numProduct > 1) {
            setNumProduct((prev) => prev - 1); // Ngăn không cho giảm xuống dưới 1
        }
    };

    return (
        <loading isPending={isLoading}>
            <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
                <Col span={10} style={{ borderRight: '1px solid #e5', paddingRight: '8px' }}>
                    <Image src={productsDetails?.image} alt="image product" preview={false} />
                    <Row style={{ padding: '8px', justifyContent: 'space-between' }}>
                        {[...Array(6)].map((_, index) => (
                            <WrapperStyleColImage key={index} span={4}>
                                <WrapperStyleSmall src={imageProductSmall} alt="image small" preview={false} />
                            </WrapperStyleColImage>
                        ))}
                    </Row>
                </Col>
                <Col span={14} style={{ paddingLeft: '10px' }}>
                    <WrapperStyleNameProduct>{productsDetails?.name}</WrapperStyleNameProduct>
                    <div>
                        {renderStars(productsDetails?.rating || 0)}
                        <WrapperStyleTextSell>| Đã bán 1000+</WrapperStyleTextSell>
                    </div>
                    <WrapperPriceProduct>
                        <WrapperPriceTextProduct>
                            {productsDetails?.price}
                        </WrapperPriceTextProduct>
                    </WrapperPriceProduct>
                    <WrapperAddressProduct>
                        <span>Giao Đến</span>
                        <span className='address'> {user?.address}</span>
                        <span className='change-address'> - Đổi địa chỉ</span>
                    </WrapperAddressProduct>
                    <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5', borderBottom: '1px solid #e5' }}>
                        <div style={{ margin: '0 0 10px' }}>Số Lượng</div>
                        <WrapperQualityProduct>
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleonChangeCount('decrease')}>
                                <MinusOutlined style={{ color: '#000', fontSize: '20px' }} size="10px" />
                            </button>
                            <WrapperInputNumber defaultValue={numProduct} onChange={onChange} value={numProduct} size="small" />
                            <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleonChangeCount('increase')}>
                                <PlusOutlined style={{ color: '#000', fontSize: '20px' }} size="10px" />
                            </button>
                        </WrapperQualityProduct>
                    </div>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '20px' }}>
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: 'rgb(255, 57, 69)',
                                height: '48px', width: '220px',
                                border: 'none',
                                borderRadius: '4px',
                            }}
                            textButton={'Chọn Mua'}
                            styleTextButton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                        />
                        <ButtonComponent
                            size={40}
                            styleButton={{
                                background: '#fff',
                                height: '48px', width: '220px',
                                border: 'blue 1px solid',
                                borderRadius: '4px',
                            }}
                            textButton={'Mua Trả Sau'}
                            styleTextButton={{ color: 'rgb(13, 92, 182)', fontSize: '15px' }}
                        />
                    </div>
                </Col>
            </Row>
        </loading>
    );
};

export default ProductDetailsComponent;
