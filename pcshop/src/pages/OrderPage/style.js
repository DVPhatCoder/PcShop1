import { InputNumber } from "antd";
import styled from "styled-components";
export const WrapperLeft = styled.div`
    width: 1054px;
    
`
export const WrapperStyleHeader = styled.div`
    display:flex;
    height: 50px;
    background: #FFFFFD;
    
`
export const WrapperListOrder = styled.div` 
    margin: 20px 0 ;
    background: #FFFFFD;
`
export const WrapperRight = styled.div`
    margin: 0 20px;
    width:318px;
`
export const WrapperInfor = styled.div`
   height: 125px;
   background: #FFFFFD;
   padding:16px ;
`
export const WrapperItemOrder = styled.div`
   margin: 20px 20px ;
   display:flex;
   display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
 width:850px;
   
`

export const WrapperPriceDiscount = styled.div`
   
`
export const WrapperCountOrder = styled.div`
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
export const WrapperTotal = styled.div`
    margin: 20px 0; 
    background: #FFFFFD;
    height: 125px;
    padding:16px ;
    display:flex;
   
`