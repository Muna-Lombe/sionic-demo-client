import { combineReducers, configureStore, createListenerMiddleware } from '@reduxjs/toolkit'
import { ormRootReducer as orm } from '../orm/reducers/rootOrmReducer';
import cartReducer from './slices/cart/cartSlice';
import categoriesReducer from './slices/filters/categoriesSlice';
import ordersReducer from './slices/orders/ordersSlice';
import productReducer from './slices/products/productsSlice'


const Store = configureStore({
    reducer: {
        products: productReducer,
        categories: categoriesReducer,
        cart: cartReducer,
        orderHistory: ordersReducer,
        orm//: combineReducers({orm, entitiesReducer})

        
    },
    // middleware: [...ormMiddlewares]

    //middleware: [fetchProducts]//,asyncThunk]
})


export default Store ;