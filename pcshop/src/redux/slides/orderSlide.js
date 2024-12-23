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
            // Tìm sản phẩm trong orderItems và cập nhật nếu tồn tại
            const itemOrder = state.orderItems.find((item) => item.product === orderItem.product);
            if (itemOrder) {
                itemOrder.amount += orderItem.amount; // Nếu đã có sản phẩm thì tăng amount
            } else {
                state.orderItems.push(orderItem); // Thêm sản phẩm mới vào mảng
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
            // Kiểm tra sự tồn tại của orderItems trong mảng orderItems
            state.orderItems = state.orderItems.filter((item) => item.product !== idProduct);//loai bo product co trung id san pham
            state.orderItemSlected = state.orderItemSlected.filter((item) => item.product !== idProduct);
        },

        removeAllOrderProduct: (state, action) => {
            const { listChecked } = action.payload;
            //kiem tra item trong orderItems co trong mang listChecked không có sẽ giữ lại
            //includes là một phương thức của mảng giá trị có tồn tại trong mảng hay không.
            state.orderItems = state.orderItems.filter((item) => !listChecked.includes(item.product));
            state.orderItemSlected = state.orderItemSlected.filter((item) => !listChecked.includes(item.product));
        },
        selectedOrder: (state, action) => {
            const { listChecked } = action.payload;
            // Lọc các phần tử có product nằm trong listChecked
            //kiem tra item trong orderItems co trong mang listChecked không có sẽ giữ lại và lưu vào orderItemSlected
            state.orderItemSlected = state.orderItems.filter((order) =>
                listChecked.includes(order.product)
            );
        }
    },
})

export const { addOrderProduct, removeOrderProduct, increaseAmount, decreaseAmount, removeAllOrderProduct, selectedOrder } = orderSlide.actions;

export default orderSlide.reducer;
