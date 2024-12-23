import styled from "styled-components"

// Container chính
export const WrapperContainer = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 40px 20px;
  background-color: #f9f9f9;
  min-height: 100vh;
  font-family: 'Roboto', sans-serif;
  color: #333;
`;

// Thông tin khách hàng
export const CustomerInfo = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
`;

export const InfoTitle = styled.h3`
  font-size: 24px;
  margin-bottom: 15px;
  color: #0b74e5;
`;

export const InfoText = styled.div`
  font-size: 16px;
  margin-bottom: 12px;
  color: #555;
  strong {
    font-weight: 600;
    color: #333;
  }
`;

// Trạng thái đơn hàng
export const WrapperStatus = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;

  div {
    font-size: 16px;
    margin-bottom: 10px;
    color: #555;
  }
`;

// Chi tiết sản phẩm
export const WrapperDetail = styled.div`
  background-color: #fff;
  padding: 20px;
  margin-bottom: 20px;
  border-radius: 12px;
  box-shadow: 0 10px 20px rgba(0, 0, 0, 0.1);
  width: 100%;
  max-width: 1000px;
`;

export const WrapperItem = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 20px;
  padding: 15px;
  border-radius: 8px;
  transition: all 0.3s ease;
  background-color: #fafafa;

  &:hover {
    background-color: #f0f0f0;
    box-shadow: 0 5px 10px rgba(0, 0, 0, 0.1);
  }

  img {
    width: 100px;
    height: 100px;
    object-fit: cover;
    border-radius: 10px;
    margin-right: 20px;
  }

  div {
    flex: 1;
    h4 {
      font-size: 20px;
      font-weight: 600;
      color: #333;
      margin-bottom: 10px;
    }

    p {
      font-size: 16px;
      color: #777;
      margin-bottom: 5px;
    }
  }
`;

// Tổng tiền
export const TotalPrice = styled.div`
  font-size: 22px;
  font-weight: 400;
  color: #0b74e5;
  margin-top: 25px;
`;

// Nút quay lại
export const ButtonWrapper = styled.div`
  margin-top: 40px;
  display: flex;
  justify-content: center;

  button {
    background-color: #0b74e5;
    color: white;
    padding: 12px 25px;
    border: none;
    border-radius: 8px;
    cursor: pointer;
    font-size: 18px;
    transition: background-color 0.3s ease, transform 0.3s ease;

    &:hover {
      background-color: #0559b2;
      transform: scale(1.05);
    }
  }
`;
