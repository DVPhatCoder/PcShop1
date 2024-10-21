import React from 'react'
import InputComponent from '../InputComponent/InputComponent';
import {
    SearchOutlined

} from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const { size, placeholder, textButton, bordered, backgroundColorInput = '#fff', backgroundColorButton = 'rgb(12,92,182)', colorButton = '#fff', } = props

    return (
        <div style={{ display: 'flex', }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                style={{ backgroundColor: backgroundColorInput }}
                bordered={bordered}
                {...props}
            />
            <ButtonComponent
                size={size}
                styleButton={{ background: backgroundColorButton, border: !bordered && 'none' }}
                icon={<SearchOutlined color={colorButton} style={{ color: colorButton }} />}
                textButton={textButton}
                styleTextButton={{ color: colorButton }}
            />
        </div >
    )
}

export default ButtonInputSearch