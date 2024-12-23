import React, { useEffect, useState } from 'react'
import { WrapperContent, WrapperLableText, WrapperTextPrice, WrapperTextValue, WrapperTypeProduct } from './style'
import { Checkbox, Rate } from 'antd'
import TypeProduct from '../TypeProduct/TypeProduct'
import * as ProductServices from '../../services/ProductServices'

const NavBarComponent = () => {
    const [typeProducts, setTypeProducts] = useState([])
    const onChange = () => { }
    const fetchAllTypeProduct = async () => {
        const res = await ProductServices.getAllTypeProduct()
        if (res?.status === 'thành công') {
            setTypeProducts(res?.data)
        }
    }
    useEffect(() => {
        fetchAllTypeProduct()
    }, [])
    const renderContent = (type, options) => {
        switch (type) {
            case 'text':
                return options.map((option) => {
                    return <WrapperTextValue>{option}</WrapperTextValue>
                })
            case 'checkbox':
                return (
                    <Checkbox.Group style={{ width: '100%', display: 'flex', flexDirection: 'column', gap: '12px' }} onChange={onChange}>
                        {options.map((option) => {
                            return (
                                <Checkbox value={option.value}>{option.lable}</Checkbox>
                            )
                        })}
                    </Checkbox.Group>
                )
            case 'star':
                return options.map((option) => {
                    return (
                        <div style={{ display: 'flex', gap: '4px' }}>
                            <Rate style={{ fontSize: '12px' }} disabled defaultValue={option} />
                            <span>{` Từ ${option} sao`}</span>
                        </div>


                    )
                })
            case 'price':
                return options.map((option) => {
                    return (
                        <WrapperTextPrice>{option}</WrapperTextPrice>
                    )
                })
            default:
                return {}

        }
    }
    return (
        <div>
            <WrapperTypeProduct>
                Danh mục
                {typeProducts.map((item) => {
                    return (
                        <TypeProduct name={item} key={item} />
                    )
                })}
            </WrapperTypeProduct >
        </div >
    )
}

export default NavBarComponent