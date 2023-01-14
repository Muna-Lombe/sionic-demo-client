import { attr,fk, many, Model, ORM } from "redux-orm";
import customReducer from "./reducer";




class ProductVariation extends Model {
    static reducer(session, ProductVariation, action) {
        return customReducer(session, ProductVariation, action)
    }
}
ProductVariation.modelName = 'ProductVariation';
ProductVariation.fields = {
    id: attr(),
    stock: attr(),
    price: attr(),
    product_id: fk('Product', 'variations'),
    
}
ProductVariation.options = {
    idAttribute: 'id'
}
export default ProductVariation;
