import { configureStore } from '@reduxjs/toolkit'
import userReducer from './slides/useSlide'
import productReducer from './slides/productSlide'

export const store = configureStore({
    reducer: {
        user: userReducer,
        product: productReducer,
    },

})