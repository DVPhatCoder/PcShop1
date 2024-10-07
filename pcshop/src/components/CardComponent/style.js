import { Card } from "antd"
import styled from "styled-components"

export const WrapperCardStyle = styled(Card)`
    width: 200px;
    & img
    {
        height: 200px;
        width: 200px;
    }
     
`
export const WrapperImageStyle = styled.div`
    top: -1px;
    left: -1px;
    border-top-left-radius:3px;
    position: absolute;
    height: 14px;
    width: 68px;

`
export const StyleNameProduct = styled.div`
    font-weight: 400;
    font-size: 14px;
    line-height: 16px;
    color: rgb(56,56,61);
    margin: 0px 0px 8px
`
export const WrapperReportText = styled.div`
    font-size: 10px;
    color: rgb(128,128,137);
    display: flex;
    align-items: center;
`
export const WrapperPriceText = styled.div`
    font-size: 16px;
    color: rgb(255,66,78);
    font-weight: 500;
    margin: 4px 0px 0px;
`
export const WrapperDiscountText = styled.span`
    font-size: 12px;
   color: rgb(255,66,78);
    white-space: nowrap;
`
export const WrapperStyleTextSell = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`