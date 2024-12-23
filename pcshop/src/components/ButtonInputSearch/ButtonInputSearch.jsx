import React from 'react'
import InputComponent from '../InputComponent/InputComponent';
import {
    SearchOutlined

} from '@ant-design/icons';
import ButtonComponent from '../ButtonComponent/ButtonComponent';

const ButtonInputSearch = (props) => {
    const { size, placeholder, textbutton, variant, backgroundColorInput = '#fff', backgroundColorButton = 'rgb(12,92,182)', colorButton = '#fff', } = props

    return (
        <div style={{ display: 'flex' }}>
            <InputComponent
                size={size}
                placeholder={placeholder}
                style={{ backgroundColor: backgroundColorInput }}
                variant={variant}
                {...props}
            />
            <ButtonComponent
                size={size}
                styleButton={{ background: backgroundColorButton, border: !variant && 'none' }}
                icon={<SearchOutlined color={colorButton} style={{ color: colorButton }} />}
                textbutton={textbutton}
                styletextbutton={{ color: colorButton }}
            />
        </div >
    )
}

export default ButtonInputSearch