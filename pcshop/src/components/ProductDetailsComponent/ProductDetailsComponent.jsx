import React, { useEffect, useState } from 'react';
import { Col, Row, Image } from 'antd';
import { WrapperAddressProduct, WrapperInputNumber, WrapperPriceProduct, WrapperQualityProduct, WrapperStyleDescriptionProduct, WrapperStyleNameProduct, WrapperStyleTextSell, WrapperReadMoreContainer, WrapperDescriptionContainer, WrapperStyleDescription1 } from './style';
import { PlusOutlined, StarFilled, MinusOutlined } from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';
import * as ProductServices from '../../services/ProductServices';
import { useQuery } from '@tanstack/react-query';
import { useDispatch, useSelector } from 'react-redux';
import { useLocation, useNavigate } from 'react-router-dom';
import { addOrderProduct } from '../../redux/slides/orderSlide';
import { convertPrice } from '../../util';
import * as Message from '../../components/Message/Message'

const ProductDetailsComponent = ({ idProduct }) => {
    const dispatch = useDispatch();
    const location = useLocation();
    const navigate = useNavigate();
    const user = useSelector((state) => state.user);
    const [numProduct, setNumProduct] = useState(1); // Khởi tạo với giá trị mặc định là 1
    const [isExpanded, setIsExpanded] = useState(false); // Quản lý trạng thái mở rộng mô tả

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

    const { data: productsDetails, isLoading, isSucces } = useQuery({
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

    const handleAddOrderProduct = () => {
        if (!user?.id) {
            navigate('/sign-in', { state: location?.pathname });
        } else {
            dispatch(addOrderProduct({
                orderItem: {
                    name: productsDetails?.name,
                    amount: numProduct,
                    image: productsDetails?.image,
                    price: productsDetails?.price,
                    product: productsDetails?._id,
                    selled: productsDetails?.selled,
                    discount: productsDetails?.discount,
                    countInStock: productsDetails?.countInStock
                }
            }));
            // Thêm thông báo sau khi thêm sản phẩm vào giỏ hàng
            Message.success('Bạn đã cho sản phẩm vào giỏ hàng!');
        }
    };

    const shortDescription = productsDetails?.description?.slice(0, 500);
    return (
        <Row style={{ padding: '16px', background: '#fff', borderRadius: '4px' }}>
            <Col span={10} style={{ borderRight: '1px solid #e5', paddingRight: '8px' }}>
                <Image src={productsDetails?.image} alt="image product" preview={false} />
            </Col>
            <Col span={14} style={{ paddingLeft: '10px' }}>
                <WrapperStyleNameProduct>{productsDetails?.name}</WrapperStyleNameProduct>
                <div>
                    {renderStars(productsDetails?.rating || 0)}
                    <WrapperStyleTextSell>| Đã bán {productsDetails?.selled || 0}+</WrapperStyleTextSell>
                </div>
                Mua ngay với giá:
                <WrapperPriceProduct>
                    {convertPrice(productsDetails?.price)}
                    <span style={{ fontSize: '16px' }}>{productsDetails?.discount || 0}%</span>
                </WrapperPriceProduct>
                <WrapperAddressProduct>
                    <span>Giao Đến:</span>
                    <span className='address'> {user?.address}</span>
                    <span style={{ cursor: 'pointer' }} onClick={() => navigate('/profile-user')}> - Đổi địa chỉ </span >
                </WrapperAddressProduct>
                <div style={{ margin: '10px 0 20px', padding: '10px 0', borderTop: '1px solid #e5', borderBottom: '1px solid #e5' }}>
                    <div style={{ margin: '0 0 10px' }}>Số Lượng</div>
                    <WrapperQualityProduct>
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleonChangeCount('decrease')}>
                            <MinusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                        <WrapperInputNumber defaultValue={numProduct} onChange={onChange} value={numProduct} size="small" />
                        <button style={{ border: 'none', background: 'transparent', cursor: 'pointer' }} onClick={() => handleonChangeCount('increase')}>
                            <PlusOutlined style={{ color: '#000', fontSize: '20px' }} />
                        </button>
                    </WrapperQualityProduct>

                    <WrapperStyleDescription1>Thông số sản phẩm:<span>{productsDetails?.description1}</span></WrapperStyleDescription1>
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
                        onClick={handleAddOrderProduct}
                        textbutton={'Chọn Mua'}
                        styletextbutton={{ color: '#fff', fontSize: '15px', fontWeight: '700' }}
                    />
                </div>
                {/* Mô tả sản phẩm và nút "Xem thêm" */}
                <WrapperDescriptionContainer>
                    <WrapperStyleDescriptionProduct isExpanded={isExpanded}>
                        {isExpanded ? productsDetails?.description : `${shortDescription}...`}
                    </WrapperStyleDescriptionProduct>
                    <WrapperReadMoreContainer onClick={() => setIsExpanded(!isExpanded)}>
                        {isExpanded ? 'Thu gọn' : 'Xem thêm'}
                    </WrapperReadMoreContainer>
                </WrapperDescriptionContainer>

            </Col>

        </Row >

    );
};

export default ProductDetailsComponent;
