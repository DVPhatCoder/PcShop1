import React from 'react'
import TypeProduct from '../../components/TypeProduct/TypeProduct'
import { WrapperButtonMore, WrapperProducts, WrapperTypeProduct } from './style'
import SliderComponent from '../../components/SliderComponent/SliderComponent'
import slider1 from '../../assets/images/slider1.jpg'
import slider2 from '../../assets/images/slider2.jpg'
import slider3 from '../../assets/images/slider3.png'
import CardComponent from '../../components/CardComponent/CardComponent'
import * as ProductServices from '../../services/ProductServices'
import { useQuery } from '@tanstack/react-query';



const HomePage = () => {
    const arr = ['Lenovo', 'Hp', 'Lap Top']
    const fetchProductAll = async () => {
        const res = await ProductServices.getAllProduct()
        console.log('res', res)
        return res;
    }
    const { data: products, isLoading } = useQuery({
        queryKey: ['products'],   // Sử dụng mảng cho khóa query
        queryFn: fetchProductAll, // Hàm để fetch dữ liệu
        retry: 3,
        retryDelay: 1000
    });

    console.log('data', products)
    return (
        <>
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
                        {products?.data?.map((products) => {
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

        </>
    )
}

export default HomePage