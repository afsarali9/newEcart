import { configureStore } from '@reduxjs/toolkit'
import productReducer from '../features/products/productSlice'
import cartReducer from "../features/cart/cartSlice";
import authReducer from "../features/auth/authSlice";
import searchReducer from '../features/search/searchSlice'

export const store = configureStore({
  reducer: {
    products: productReducer,
    cart: cartReducer,
    auth: authReducer,
    search: searchReducer,
  },
})