import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import { ormRootReducer } from '../orm_reducers/rootOrmReducer';
import cartReducer from './slices/cart/cartSlice';
import categoriesReducer from './slices/filters/categoriesSlice';
import ordersReducer from './slices/orders/ordersSlice';
import productReducer from './slices/products/productsSlice'


const reduxStore = configureStore({
    reducer: {
        products: productReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        orderHistory: ordersReducer,
        orm: ormRootReducer


    }
})

const ormStore = ''  
// configureStore({
//     reducer: {
//         orm: ormRootReducer
//     }
// });
const getStore = {
    reduxStore, ormStore
}
export default getStore ;