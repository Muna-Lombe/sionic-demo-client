import { configureStore } from '@reduxjs/toolkit'
import React from 'react'
import Product from '../orm/models/ProductModel';
import { reduce } from '../orm/reducers/entitiesReducer';
import { ormRootReducer as orm, productSession } from '../orm/reducers/rootOrmReducer';
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
        orm,
        // reduce
        
    }
})


const ormStore = ''  
// configureStore({
//     reducer: {
//         orm: ormRootReducer
//     }
// });
const getStore = {
    reduxStore//, ormStore
}
export default getStore ;