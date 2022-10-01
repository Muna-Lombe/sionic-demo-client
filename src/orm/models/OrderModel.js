import { attr,fk, many, Model, ORM } from "redux-orm";

import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";

// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class Order extends Model {
//   
}
Order.modelName = 'Order';
Order.fields = {
    product_id: fk('Product', 'orders'),
    DateCreated: attr(),
};

export default Order;