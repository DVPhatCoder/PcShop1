import React, { useEffect, useState } from 'react'
import NavBarComponent from '../../components/NavbarComponent/NavBarComponent'
import CardComponent from '../../components/CardComponent/CardComponent'
import { Row, Pagination, Col } from 'antd'
import { WrapperNavbar, WrapperProducts } from './style'
import { useLocation } from 'react-router-dom'
import * as ProductServices from '../../services/ProductServices'
import Loading from '../../components/LoadingComponent/Loading'

const TyperProductPage = () => {
    const { state } = useLocation()
    const [products, setProducts] = useState([])
    const [loading, setloading] = useState(false)
    const fetchProductType = async (type) => {
        setloading(true)
        const res = await ProductServices.getAllProductType(type)
        if (res?.data) {
            setloading(false)
            setProducts(res?.data)

        } else {
            setloading(false)
        }

        console.log('res', res)
    }

    useEffect(() => {
        if (state) {
            fetchProductType(state)
        }
    }, [state])
    const onChange = () => { }
    return (
        <Loading isPending={loading}>
            <div style={{ width: '100%', backgroundColor: '#efefef', height: 'calc(100vh - 64px)' }}>
                <div style={{ width: '1270px', margin: '0 auto' }}>
                    <Row style={{ flexWrap: 'nowrap', paddingTop: '10px', }}>
                        <WrapperNavbar span={4} >
                            <NavBarComponent />
                        </WrapperNavbar>
                        <Col span={20} style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                            <WrapperProducts>
                                {products?.data?.map((product) => {
                                    return (
                                        <CardComponent
                                            key={product._id}
                                            countInStock={product.countInStock}
                                            description={product.description}
                                            image={product.image}
                                            name={product.name}
                                            price={product.price}
                                            rating={product.rating}
                                            type={product.type}
                                            discount={product.Number}
                                            selled={product.Number}
                                            id={product._id}
                                        />
                                    )
                                })}
                            </WrapperProducts>
                            <Pagination defaultCurrent={2} total={100} onChange={onChange} style={{ textAlign: 'center', justifyContent: 'center', paddingTop: '10px' }} />
                        </Col>
                    </Row>
                </div>
            </div>
        </Loading>


    )
}

export default TyperProductPage