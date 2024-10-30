import styled from "styled-components";
import { Col, Image, InputNumber } from "antd";

export const WrapperStyleSmall = styled(Image)`
    height: 64px;
    width: 64px;
`
export const WrapperStyleColImage = styled(Col)`
   flex-basis: unset;
   display: flex;
`
export const WrapperStyleNameProduct = styled.h1`
    color: rgb(39, 39, 42);
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    word-break: break-word;
    white-space: break-spaces;
`
export const WrapperStyleTextSell = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`
export const WrapperPriceProduct = styled.div`
    backgrond: rgb(250, 250, 250);
    border-radius: 4px;
`
export const WrapperPriceTextProduct = styled.h1`
    color: rgb(255, 66, 78);
    font-size: 24px;
    font-weight: 600;
    line-height: 150%;
    padding: 10px;
    margin: 10px;
`
export const WrapperAddressProduct = styled.div`
    span.address{
        color: rgb(39, 39, 42);
        width: 100%;
        text-overflow: ellipsisl;
    };
        span.change-address{
        gap: 4px;
        font-size: 14px;
        font-weight: 400;
        line-height: 150%;
        flex: 1 1 0%;
        min-height: 21px;
        color: rgb(10, 104, 255);
    }; 
`
export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 110px;
`
export const WrapperInputNumber = styled(InputNumber)`
   &.ant-input-number.ant-input-number-sm{
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap{
            display: none !important;
        }
    }
`

