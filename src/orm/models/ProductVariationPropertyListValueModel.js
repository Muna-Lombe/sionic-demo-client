import { attr,fk, many, Model, ORM } from "redux-orm";
import customReducer from "./reducer";




class ProductVariationPropertyListValue extends Model {
    static reducer(session, ProductVariationPropertyListValue, action) {
        return customReducer(session, ProductVariationPropertyListValue, action)
    }
}
ProductVariationPropertyListValue.modelName = 'ProductVariationPropertyListValue';
ProductVariationPropertyListValue.fields = {
    id: attr(),
    title: attr(),
    value: attr(),
    product_variation_property_id: fk('ProductVariationProperty','listValues')
}
ProductVariationPropertyListValue.options = {
    idAttribute: 'id'
}
export default ProductVariationPropertyListValue;
