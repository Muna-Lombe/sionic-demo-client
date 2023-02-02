import { attr,fk, many, Model, ORM } from "redux-orm";

import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";
import customReducer from "./reducer";

// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class Order extends Model {
    static reducer(session, Order, action) {
        return customReducer(session, Order, action)
    }
//   
}
Order.modelName = 'Order';
Order.fields = {
    id: attr(),
    product_id: fk('Product', 'orders'),
    DateCreated: attr(),
};

export default Order;