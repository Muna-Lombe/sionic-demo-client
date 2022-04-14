import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import categoriesReducer from './slices/filters/categoriesSlice';
import productReducer from './slices/products/productsSlice'


const store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoriesReducer
    }
})

export default store;