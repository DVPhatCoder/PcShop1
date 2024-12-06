import styled from 'styled-components';

export const WrapperContainer = styled.div`
    padding: 20px;
    background-color: #f8f9fa;
    min-height: 100vh;
`;

export const WrapperStatus = styled.div`
    display: flex;
    flex-direction: column;
    margin-bottom: 20px;
    font-size: 14px;
    strong {
        margin-right: 5px;
    }
`;

export const WrapperDetail = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
    background-color: #fff;
    padding: 20px;
    border-radius: 8px;
    box-shadow: 0px 2px 4px rgba(0, 0, 0, 0.1);
`;

export const WrapperItem = styled.div`
    display: flex;
    align-items: center;
    gap: 20px;
    border-bottom: 1px solid #eee;
    padding-bottom: 10px;
    margin-bottom: 10px;
    img {
        border: 1px solid #ddd;
        border-radius: 5px;
    }
`;
