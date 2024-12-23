import React, { useEffect, useState } from 'react';
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent';
import CardComponent from '../../components/CardComponent/CardComponent';
import { Row, Pagination, Col } from 'antd';
import { WrapperNavbar, WrapperProducts } from './style';
import { useLocation } from 'react-router-dom';
import * as ProductServices from '../../services/ProductServices';
import Loading from '../../components/LoadingComponent/Loading';
import { useSelector } from 'react-redux';
import { useDebounce } from '../../hooks/useDebounce';
import FooterComponent from '../../components/FooterComponent/FooterComponent'
const TyperProductPage = () => {
    const searchProduct = useSelector((state) => state?.product?.search);
    const searchDebounce = useDebounce(searchProduct, 500);
    const [panigate, setPanigate] = useState({
        page: 0,
        limit: 10,
        total: 1,
    });
    const { state } = useLocation();
    const [products, setProducts] = useState([]);
    const [loading, setloading] = useState(false);

    const fetchProductType = async (type, page, limit) => {
        setloading(true);
        const res = await ProductServices.getAllProductType(type, page, limit);
        if (res?.data) {
            setloading(false);
            setProducts(res?.data);
            setPanigate({ ...panigate, total: res?.totalPage });
        } else {
            setloading(false);
        }
    };

    useEffect(() => {
        if (state) {
            fetchProductType(state, panigate.page, panigate.limit);
        }
    }, [state, panigate.page, panigate.limit]);

    const onChange = (current, pageSize) => {
        setPanigate({ ...panigate, page: current - 1, limit: pageSize });
    };

    // Lọc sản phẩm dựa trên searchDebounce
    const filteredProducts = products?.data?.filter((product) => {
        if (searchDebounce === '') {
            return true; // Giữ lại tất cả sản phẩm nếu không có từ khóa tìm kiếm
        }
        // Chuyển đổi cả tên sản phẩm và từ khóa tìm kiếm sang chữ thường để so sánh
        return product?.name?.toLowerCase().includes(searchDebounce.toLowerCase());
    });
    return (
        <Loading isPending={loading}>
            <div style={{ width: '100%', backgroundColor: '#efefef', }}>
                <div style={{ width: '1270px', margin: '0 auto', backgroundColor: '#efefef' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', }}>
                        <WrapperNavbar span={3}>
                            <NavBarComponent />
                        </WrapperNavbar>
                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts>
                                {filteredProducts?.map((product) => {
                                    return (
                                        <CardComponent
                                            key={product._id}
                                            countInStock={product.countInStock}
                                            description={product.description}
                                            description1={product?.description1}
                                            image={product.image}
                                            name={product.name}
                                            price={product.price}
                                            rating={product.rating}
                                            type={product.type}
                                            discount={product.Number}
                                            selled={product.Number}
                                            id={product._id}
                                        />
                                    );
                                })}
                            </WrapperProducts>
                            <Pagination defaultCurrent={panigate.page + 1} total={panigate?.total} onChange={onChange} style={{ textAlign: 'center', justifyContent: 'center', paddingTop: '10px' }} />
                        </Col>
                    </Row>
                </div>

            </div>
            <FooterComponent />
        </Loading>
    );
};

export default TyperProductPage;
