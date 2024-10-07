
import Upload from "antd/es/upload/Upload";
import styled from "styled-components";

export const WrapperHeader = styled.h1`
  color: '#0000';
  margin: 10px 0;
  font-Weight: 600;

`
export const WrapperContentProfile = styled.div`
    display: flex;
    flex-direction: column;
    border: 1px solid #ccc;
    margin: 0 auto;
    padding: 30px;
    border-radius: 10px;
    gap: 30px;
   width: 500px;
   

`
export const WrapperLabel = styled.label`
    color: '#0000';
    font-size:'12px';
    align-item: center;
    line-height: 3;
    font-Weight: 600;
    width:60px;
    text-align:left;
`
export const WrapperInput = styled.div`
    display: flex;
    align-item: center;
    gap: 10px;
`
export const WrapperUploadFile = styled(Upload)`
    &.ant-upload.ant-upload-select.ant-upload-select-picture-card {
    height: 60px;
    width: 60px;
    border-radius: 50%;
}
    &  .ant-upload-list-item-container  {
    display: none;
}
`