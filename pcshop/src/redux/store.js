import { combineReducers, configureStore } from '@reduxjs/toolkit'
import userReducer from './slides/useSlide'
import productReducer from './slides/productSlide'
import orderReducer from './slides/orderSlide'
import {
    persistStore,
    persistReducer,
    FLUSH,
    REHYDRATE,
    PAUSE,
    PERSIST,
    PURGE,
    REGISTER,
} from 'redux-persist'
import storage from 'redux-persist/lib/storage'

// Khởi tạo rootReducer trước
const rootReducer = combineReducers({
    user: userReducer,
    product: productReducer,
    order: orderReducer,
})

const persistConfig = {
    key: 'root',
    version: 1,
    storage,
    blacklist: ['user', 'product']
}

// Sau đó sử dụng rootReducer trong persistReducer
const persistedReducer = persistReducer(persistConfig, rootReducer)

export const store = configureStore({
    reducer: persistedReducer,
    middleware: (getDefaultMiddleware) =>
        getDefaultMiddleware({
            serializableCheck: {
                ignoredActions: [FLUSH, REHYDRATE, PAUSE, PERSIST, PURGE, REGISTER],
            },
        }),
})

export let persistor = persistStore(store)
