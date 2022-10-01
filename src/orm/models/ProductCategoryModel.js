import { attr,fk, many, Model, ORM } from "redux-orm";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";




class ProductCategory extends Model {
   
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
