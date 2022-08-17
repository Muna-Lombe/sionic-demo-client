import { attr,fk, many, Model, ORM } from "redux-orm";
// import { createStore, combineReducers } from "redux";
// import { createReducer } from "redux-orm";
// import moment from "moment";

class Order extends Model {}
Order.modelName = 'Order';
Order.fields = {
  productId: fk({
            to: 'Product',
            as: 'products',
            relatedName: 'orders',
        }),
    DateCreated: attr(),
};

export default Order;