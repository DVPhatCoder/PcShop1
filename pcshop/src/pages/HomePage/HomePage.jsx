import React, { useEffect, useRef, useState } from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.png'
import CardComponent from '../../components/CardComponent/CardComponent'
import * as ProductServices from '../../services/ProductServices'
import { useQuery } from '@tanstack/react-query';
import { useSelector } from 'react-redux'
import Loading from '../../components/LoadingComponent/Loading'
import { useDebounce } from '../../hooks/useDebounce'


const HomePage = () => {
    const [stateProduct, setStateProduct] = useState([])
    const searchProduct = useSelector((state) => state?.product?.search)
    const searchDebounce = useDebounce(searchProduct, 500)
    const [loading, setLoading] = useState(false)
    const refSearch = useRef()
    const arr = ['Lenovo', 'Hp', 'Lap Top']
    const fetchProductAll = async (search) => {
        const res = await ProductServices.getAllProduct(search)
        if (search?.length > 0 || refSearch.current) {
            setStateProduct(res?.data)
        } else {
            return res
        }
    }

    useEffect(() => {
        if (refSearch.current) {
            setLoading(true)
            fetchProductAll(searchDebounce)
        }
        refSearch.current = true
        setLoading(false)
    }, [searchDebounce])

    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],   // Sử dụng mảng cho khóa query
        queryFn: fetchProductAll, // Hàm để fetch dữ liệu
        retry: 3,
        retryDelay: 1000
    });
    useEffect(() => {
        if (products?.data?.length > 0) {
            setStateProduct(products?.data)
        }
    }, [products])

    return (
        <Loading isPending={isLoading}>
            <div style={{ width: '1270px', margin: '0 auto' }}>
                <WrapperTypeProduct>
                    {arr.map((item) => {
                        return (
                            <TypeProduct name={item} key={item} />
                        )
                    })}
                </WrapperTypeProduct >
            </div>
            <div className='body' style={{ width: '100%', backgroundColor: '#efefef' }}>
                <div id="container" style={{ margin: '0 auto', height: '1000px', width: '1270px' }} >
                    <SliderComponent arrImages={[slider1, slider2, slider3]} />
                    <WrapperProducts>
                        {stateProduct?.map((products) => {
                            return (
                                <CardComponent
                                    key={products._id}
                                    countInStock={products.countInStock}
                                    description={products.description}
                                    image={products.image}
                                    name={products.name}
                                    price={products.price}
                                    rating={products.rating}
                                    type={products.type}
                                    discount={products.Number}
                                    selled={products.Number}
                                />
                            )
                        })}
                    </WrapperProducts>
                    <div style={{ width: '100%', display: 'flex', justifyContent: 'center', marginTop: '10px' }}>
                        <WrapperButtonMore textButton="Xem Thêm" type="outline"
                            styleButton={{
                                border: '1px solid rgb(11, 116, 229)', borderRadius: '4px',
                                color: 'rgb(11, 116, 229)', with: '240px', height: '38px',
                            }}
                            styleTextButton={{ fontWeight: 600 }} />
                    </div>
                </div>
            </div>

        </Loading>
    )
}

export default HomePage