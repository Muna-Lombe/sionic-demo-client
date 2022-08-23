import { attr,fk, many, Model, ORM } from "redux-orm";
import { PropTypes } from 'react';
// import { getPropTypesMixin } from "redux-orm-proptypes";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";
// import { session } from "../reducers/rootOrmReducer";




// var ValidModel = getPropTypesMixin(Model)

class Product extends Model {
    static reducer(state, action, Product, session){
        const {payload, type}= action;

        switch(type){
            case CREATE:
                Product.create(payload);
                break;
            case UPDATE:
                Product.withId(payload.id).update(payload);
                break;
            case REMOVE:
                Product.withId(payload.id).delete();
                break;
            case ADD_TO:
                Product.withId(payload.productId).orders.add(payload.order);
                break;
            case REMOVE_FROM:
                Product.withId(payload.productId).orders.remove(payload.orderId);
                break;
            case ASSIGN:
                Product.withId(payload.productId).categoryId = payload.categoryId;
                break;
            default:
                
        }
        return session
    }
}
Product.modelName = 'Product';
// Product.propTypes = {
//     name:  PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired
// }
Product.fields = {
    id: attr(),
    name: attr(),
    description: attr(),
    category_id: fk('Category', 'products'),
    // orders: many('Order','product')
    
}

Product.options = {
    idAttribute: 'id'
}

export const productReducer = Product.reducer;
export default Product;


