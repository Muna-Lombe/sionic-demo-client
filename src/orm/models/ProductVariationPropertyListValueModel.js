import { attr,fk, many, Model, ORM } from "redux-orm";
import customReducer from "./reducer";
import { actions } from "../actions/actionTypes";




class ProductVariationPropertyListValue extends Model {
    static reducer(action, ProductVariationPropertyListValue, session) {
        return customReducer({session, model:ProductVariationPropertyListValue, action})
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
export const [updatedProductVariationPropertyListValue, removedProductVariationPropertyListValue, addedProductVariationPropertyListValue, createdProductVariationPropertyListValue, addedProductVariationPropertyListValueTo, removedProductVariationPropertyListValueFrom,] = actions().createDefaultFor('ProductVariationPropertyListValue')

export default ProductVariationPropertyListValue;
