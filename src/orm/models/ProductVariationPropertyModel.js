import { attr,fk, many, Model, ORM } from "redux-orm";
import customReducer from "./reducer";




class ProductVariationProperty extends Model {
    static reducer(session, ProductVariationProperty, action) {
        return customReducer(session, ProductVariationProperty, action)
    }
}
ProductVariationProperty.modelName = 'ProductVariationProperty';
ProductVariationProperty.fields = {
    id: attr(),
    name: attr(),
    type: attr(),
    
}
ProductVariationProperty.options = {
    idAttribute: 'id'
}
export default ProductVariationProperty;
