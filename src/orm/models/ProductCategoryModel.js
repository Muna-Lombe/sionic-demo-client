import { attr,fk, many, Model, ORM } from "redux-orm";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";
import customReducer from "./reducer";




class ProductCategory extends Model {
    static reducer(session, ProductCategory, action) {
        return customReducer(session, ProductCategory, action)
    }
}
ProductCategory.modelName = 'ProductCategory';
ProductCategory.fields = {
    id: attr(),
    name: attr(),
    // products: many('Product', 'Productcategory'),
    
}

ProductCategory.options = {
    idAttribute: 'id'
}

export default ProductCategory;
