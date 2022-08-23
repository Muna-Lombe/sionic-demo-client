import { attr,fk, many, Model, ORM } from "redux-orm";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";




class Category extends Model {
    static reducer(state, action, Category, session){

        const {payload, type}= action;
        switch(type){
           
            case CREATE:
                Category.create(payload);
                break;
            case UPDATE:
                Category.withId(payload.id).update(payload);
                break;
            case REMOVE:
                Category.withId(payload.id).delete();
                break;
            // case 'ADD_PRODUCT_TO_CATEGORY':
            //     Category.withId(payload.orderId).categoryId = payload.categoryId;
            //     break;
            // case 'REMOVE_PRODUCT_FROM_CATEGORY':
            //     Category.withId(payload.orderId).categoryId = '';
            //     break;
            // case 'ASSIGN_CATEGORY':
            //     Order.withId(payload.orderId).categoryId = payload.categoryId;
            //     break;
            default:
                return null
        }
        
    }
}
Category.modelName = 'Category';
Category.fields = {
    id: attr(),
    name: attr(),
    // products: many('Product', 'category'),
    
}

Category.options = {
    idAttribute: 'id'
}

export const categoryReducer = Category.reducer;

export default Category;
