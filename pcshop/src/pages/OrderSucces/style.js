import { InputNumber, Radio } from "antd";
import styled from "styled-components";
export const WrapperContainer = styled.div`
    width: 1024px;
    background: #FFFFFD;
    
`
export const WrapperValue = styled.div` 
    background:rgb(240, 248, 255);
    border: 1px solid rgb(194, 225, 255);
    padding:10px;
    width:fit-content;
    border-radius: 6px;
    margin-top: 10px
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
export const WrapperInfor = styled.div`
   padding:16px ;
`
export const WrapperItemOrder = styled.div`
   margin: 20px auto ;
   display:flex;
   display: flex;
  align-items: center;
  padding: 10px 0;
  border-bottom: 1px solid #ddd;
 width:850px;
 justtify-content:center;
 
   
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
export const label = styled.span`
    fontsize: 12px;
    color:#000;
    font-weight:bold;
`
export const WrapperRadio = styled(Radio.Group)`
margin-top:6px;
background: #F0F8FF;
border:1px solid rgb(194,255,255);
width:500px;
border-radius:4px;
height:100px;
padding:16px;
font-weight:normal;
display:flex;
flex-direction:column;
gap:10px;
justify-content:center;

`
export const WrapperTotalMoney = styled.div`
margin: 20px auto ;
   display:flex;
  align-items: center;
  padding: 10px 0;
 width:850px;
 justtify-content:center;

`