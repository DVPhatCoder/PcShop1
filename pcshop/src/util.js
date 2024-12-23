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
    let results = [];
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

export const convertDataChart = (data, valueKey, dateKey) => {
    if (!Array.isArray(data)) {
        return [];
    }

    const groupedData = data.reduce((acc, curr) => {
        const date = new Date(curr[dateKey]);
        const year = date.getFullYear(); // Năm
        const month = date.getMonth() + 1; // Tháng (1-12)

        const key = `${month}-${year}`; // Tạo khóa định danh (VD: "1-2024")
        acc[key] = acc[key] || 0;
        acc[key] += curr[valueKey]; // Cộng dồn giá trị
        return acc;
    }, {});

    // Tạo mảng dữ liệu để hiển thị
    const result = Object.entries(groupedData).map(([key, value]) => {
        const [month, year] = key.split('-');
        return {
            name: `Tháng ${month}, ${year}`,
            Tiền: value,
        };
    });

    // Sắp xếp theo năm và tháng
    result.sort((a, b) => {
        const [monthA, yearA] = a.name.match(/\d+/g).map(Number);
        const [monthB, yearB] = b.name.match(/\d+/g).map(Number);
        return yearA === yearB ? monthA - monthB : yearA - yearB;
    });

    return result;
};



