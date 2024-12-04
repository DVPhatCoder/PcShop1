import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    orderItems: [

    ],
    orderItemSlected: [],
    shippingAddress: {//dia chi giao hang

    },
    paymentMethod: '',
    itemsPrice: 0,
    shippingPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
    user: '',
    isPaid: false,
    paidAt: '',
    isDelivered: false,
    deliveredAt: '',
}

export const orderSlide = createSlice({
    name: 'order',
    initialState,
    reducers: {
        addOrderProduct: (state, action) => {
            const { orderItem } = action.payload;
            // Kiểm tra orderItems có phải là mảng không
            if (!Array.isArray(state.orderItems)) {
                state.orderItems = []; // Khởi tạo lại nếu không phải mảng
            }
            const itemOrder = state.orderItems.find((item) => item.product === orderItem.product);
            if (itemOrder) {
                itemOrder.amount += orderItem.amount;
            } else {
                state.orderItems.push(orderItem); // Thêm sản phẩm mới
            }
        },

        increaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            const orderItemSlected = state?.orderItemSlected?.find((item) => item?.product === idProduct);

            if (itemOrder) {
                itemOrder.amount++;
            }

            if (orderItemSlected) {
                orderItemSlected.amount++;
            }
        },

        decreaseAmount: (state, action) => {
            const { idProduct } = action.payload;
            const itemOrder = state?.orderItems?.find((item) => item?.product === idProduct);
            const orderItemSlected = state?.orderItemSlected?.find((item) => item?.product === idProduct);

            if (itemOrder && itemOrder.amount > 1) { // Đảm bảo số lượng không giảm xuống dưới 1
                itemOrder.amount--;
            }

            if (orderItemSlected && orderItemSlected.amount > 1) { // Đảm bảo số lượng không giảm xuống dưới 1
                orderItemSlected.amount--;
            }
        },

        removeOrderProduct: (state, action) => {
            const { idProduct } = action.payload;
            // Kiểm tra sự tồn tại của itemOrder trong mảng orderItems
            state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);
            state.orderItemSlected = state.orderItemSlected.filter((item) => item.product !== idProduct);
        },

        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload;
            // Sử dụng filter để loại bỏ các sản phẩm có trong danh sách listChecked
            state.orderItems = state.orderItems.filter((item) => !listChecked.includes(item.product));
            state.orderItemSlected = state.orderItemSlected.filter((item) => !listChecked.includes(item.product));
        },

        selectedOrder: (state, action) => {
            const { listChecked } = action.payload;
            const orderSelected = [];
            // Kiểm tra sự tồn tại của các phần tử trong orderItems trước khi thêm vào orderItemSlected
            state.orderItems.forEach((order) => {
                if (listChecked.includes(order.product)) {
                    orderSelected.push(order);
                }
            });
            state.orderItemSlected = orderSelected;
        }


    },
})

export const { addOrderProduct, removeOrderProduct, increaseAmount, decreaseAmount, removeAllOrderProduct, selectedOrder } = orderSlide.actions;

export default orderSlide.reducer;
