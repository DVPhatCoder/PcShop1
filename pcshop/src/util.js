export const isJsonString = (data) => {
    try {
        JSON.parse(data)
    } catch (error) {
        return false
    }
    return true

}
export const getBase64 = (file) =>
    new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => resolve(reader.result);
        reader.onerror = (error) => reject(error);
    })
export const renderOptions = (arr) => {
    let results = []; // Đổi từ const sang let
    if (arr) {
        results = arr?.map((opt) => {
            return {
                value: opt,
                label: opt
            };
        });
    }
    results.push({
        label: 'Thêm Type',
        value: 'add_type',
    });
    return results;
}

export const convertPrice = (price) => {
    try {
        const result = price?.toLocaleString('vi-VN', { style: 'currency', currency: 'VND' }).replaceAll(',', '.').replace("₫", "đ");
        return result
    } catch (error) {
        return null
    }
}