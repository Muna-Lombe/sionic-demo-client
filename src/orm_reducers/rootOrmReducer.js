import {ORM } from "redux-orm";
import Order from "../orm_models/OrderModel";
import Product from "../orm_models/ProductModel";
import { createReducer } from "redux-orm";
import { combineReducers } from "redux";

const orm = new ORM();
orm.register(Product, Order);

export const ormRootReducer = combineReducers({
    orm: createReducer(orm), // This will be the Redux-ORM state.
    // … potentially other reducers
});


export const session = orm.session();
// export default session;