import { attr,fk, many, Model, ORM } from "redux-orm";

import {  actions } from "../actions/actionTypes";
import customReducer from "./reducer";

// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class Order extends Model {
    static reducer(action, Order, session) {
        return customReducer({session, model:Order, action})
    }
//   
}
Order.modelName = 'Order';
Order.fields = {
    id: attr(),
    product_id: fk({to:'Product', as:'product', relatedName: 'orders'}),
    DateCreated: attr(),
};
export const {UPDATE:updatedOrder, REMOVE:removedOrder, ADD:addedOrder, CREATE:createdOrder, ADD_TO:addedOrderTo, REMOVE_FROM:removedOrderFrom} = actions().createDefaultFor('Order')
export default Order;