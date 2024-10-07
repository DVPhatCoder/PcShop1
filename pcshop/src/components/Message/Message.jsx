import { message } from "antd";

const success = (mess = "Thành công") => {
    message.success(mess);
};

const error = (mess = "Lỗi") => {
    message.error(mess)
};

const warning = (mess = "cảnh báo") => {
    message.warning(mess)
};
export { success, error, warning }