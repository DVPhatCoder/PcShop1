import React from 'react'
import { Button } from 'antd';

const ButtonComponent = ({ size, styleButton = {}, styletextbutton, textbutton, colorButton, disabled, ...rest }) => {
    return (
        <Button
            style={{
                ...styleButton,
                background: disabled ? '#ccc' : styleButton.background
            }}
            size={size}
            {...rest}
        >
            <span style={styletextbutton} >
                {textbutton}
            </span>

        </Button>
    )
}

export default ButtonComponent