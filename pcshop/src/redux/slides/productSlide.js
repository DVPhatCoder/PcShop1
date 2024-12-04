import { createSlice } from '@reduxjs/toolkit'

const initialState = {
    search: '', //trang thai ban dau rỗng
}

export const productSlide = createSlice({
    name: 'product', //key 
    initialState,//trang thai
    reducers: {
        searchProduct: (state, action) => { //thuộc tính search //state la trang thai ban dau
            state.search = action.payload; //Lấy dữ liệu từ action.payload và gán cho state.search. 
        },
        //Nếu gọi searchProduct('Laptop'), thì:
        //action.payload = 'Laptop'.
        //state.search sẽ được cập nhật thành 'Laptop'.
    },
})

export const { searchProduct } = productSlide.actions;

export default productSlide.reducer;
