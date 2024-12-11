import styled from "styled-components";
import { Col, Image, InputNumber } from "antd";

export const WrapperStyleSmall = styled(Image)`
    height: 64px;
    width: 64px;
`;
export const WrapperReadMore = styled.span`
    display: ${(props) => (props.isExpanded ? "none" : "inline-block")};
    margin-top: 10px;
    font-size: 14px;
    color: rgb(13, 92, 182);
    cursor: pointer;
    font-weight: 600;
`;

export const WrapperStyleColImage = styled(Col)`
   flex-basis: unset;
   display: flex;
`;

export const WrapperStyleNameProduct = styled.h1`
    color: rgb(39, 39, 42);
    font-size: 20px;
    font-weight: 500;
    line-height: 150%;
    word-break: break-word;
    white-space: break-spaces;
`;

export const WrapperStyleTextSell = styled.span`
    font-size: 14px;
    line-height: 24px;
    color: rgb(120, 120, 120);
`;

export const WrapperPriceProduct = styled.div`
color: rgb(255, 66, 78);
    font-size: 24px;
    font-weight: 600;
    line-height: 150%;
    border-radius: 4px;
`;

export const WrapperPriceTextProduct = styled.h1`
    color: rgb(255, 66, 78);
    font-size: 24px;
    font-weight: 600;
    line-height: 150%;
    padding: 10px 10px;
    margin: 10px 10px;
`;

export const WrapperAddressProduct = styled.div`
    span.address {
        color: rgb(39, 39, 42);
        width: 100%;
        text-overflow: ellipsis;
        white-space: nowrap;
        overflow: hidden;
    }

    span.change-address {
        gap: 4px;
        font-size: 14px;
        font-weight: 400;
        line-height: 150%;
        flex: 1 1 0%;
        min-height: 21px;
        color: rgb(10, 104, 255);
        cursor: pointer;
    }
`;

export const WrapperQualityProduct = styled.div`
    display: flex;
    gap: 4px;
    align-items: center;
    border-radius: 4px;
    border: 1px solid #ccc;
    width: 110px;
`;

export const WrapperInputNumber = styled(InputNumber)`
   &.ant-input-number.ant-input-number-sm {
        width: 40px;
        border-top: none;
        border-bottom: none;
        .ant-input-number-handler-wrap {
            display: none !important;
        }
    }
`;
// Container cho phần mô tả và chữ "Xem thêm"
export const WrapperDescriptionContainer = styled.div`
margin-top:10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 4px;
    background-color: #f9f9f9;
`;

// Chữ "Xem thêm" với hiệu ứng hover
export const WrapperReadMoreContainer = styled.button`
    align-self: center;
    background: transparent;
    border: 1px solid #ccc;
    border-radius: 4px;
    color: #000;
    padding: 6px 12px;
    cursor: pointer;
    font-size: 14px;
    font-weight: bold;
    transition: background-color 0.3s ease, color 0.3s ease;

    &:hover {
        background-color: red;
        color: white;
    }
`;

// Wrapper cho phần mô tả sản phẩm
export const WrapperStyleDescriptionProduct = styled.div`
    font-size: 14px;
    color: #4a4a4a;
    line-height: 1.6;
    margin-top: 10px;
    white-space: pre-line;
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => (props.isExpanded ? 'unset' : '3')}; /* Cắt ngắn mô tả */
    -webkit-box-orient: vertical;
    cursor: pointer;
`;
export const WrapperStyleDescription1 = styled.div`
    font-size: 14px;
    color: #4a4a4a;
    line-height: 1.6;
    margin-top: 10px;
    white-space: pre-line;
    word-wrap: break-word;
    overflow: hidden;
    display: -webkit-box;
    -webkit-line-clamp: ${(props) => (props.isExpanded ? 'unset' : '3')}; /* Cắt ngắn mô tả */
    -webkit-box-orient: vertical;
    cursor: pointer;
    margin-top:10px;
    display: flex;
    flex-direction: column;
    gap: 10px;
    border: 1px solid #ccc;
    padding: 16px;
    border-radius: 4px;
    background-color: #f9f9f9;
`;