import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import cartReducer from './slices/cart/cartSlice';
import categoriesReducer from './slices/filters/categoriesSlice';
import productReducer from './slices/products/productsSlice'


const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoriesReducer,
        cart: cartReducer
    }
})

export default store;