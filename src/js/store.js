import { combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import React from 'react'
import { FULFILLED, loadedState, stateLoading, stateStatus } from '../orm/actions/actionTypes';
import Product from '../orm/models/ProductModel';
import  reduce   from '../orm/reducers/entitiesReducer';
import { ormRootReducer as orm, productSession } from '../orm/reducers/rootOrmReducer';
import { asyncThunk, StateLoadMiddleware } from '../orm/utilities/StateLoader';
import cartReducer from './slices/cart/cartSlice';
import categoriesReducer from './slices/filters/categoriesSlice';
import ordersReducer from './slices/orders/ordersSlice';
import productReducer, { fetchProducts } from './slices/products/productsSlice'

// const dataFetchListener = createListenerMiddleware();
// console.log("...", stateStatus)

// dataFetchListener.startListening({
//     actionCreator: stateStatus,
//     effect: async (action, listenerApi) => {
//         console.log("loading action", action)
//         // Can cancel other running instances
//         listenerApi.cancelActiveListeners()

//         // Run async logic
//         StateLoadMiddleware(listenerApi)
//         listenerApi.dispatch(stateStatus('loaded'))
//     },
// })
const entitiesReducer = reduce

const Store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        orderHistory: ordersReducer,
        orm//: combineReducers({orm, entitiesReducer})

        
    },
    // middleware: [...ormMiddlewares]

    middleware: [asyncThunk]
})

export default Store ;