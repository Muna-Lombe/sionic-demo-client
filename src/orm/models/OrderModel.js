import { attr,fk, many, Model, ORM } from "redux-orm";

import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";

// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class Order extends Model {
   static reducer(state, action, Order, session){

        const {payload, type}= action;
        switch(type){
           
            case CREATE:
                Order.create(payload);
                break;
            case UPDATE:
                Order.withId(payload.id).update(payload);
                break;
            case REMOVE:
                Order.withId(payload.id).delete();
                break;
            case ADD_TO:
                Order.withId(payload.orderId).productId = payload.productId;
                break;
            case REMOVE_FROM:
                Order.withId(payload.orderId).productId = '';
                break;
            // case 'ASSIGN_CATEGORY':
            //     Order.withId(payload.orderId).categoryId = payload.categoryId;
            //     break;
            default:
                return null
        }
        
    }
}
Order.modelName = 'Order';
Order.fields = {
    product_id: fk('Product', 'orders'),
    DateCreated: attr(),
};
export const orderReducer = Order.reducer;

export default Order;