import { attr,fk, many, Model, ORM } from "redux-orm";
import customReducer from "./reducer";
import { actions } from "../actions/actionTypes";




class ProductVariation extends Model {
    static reducer(action, ProductVariation, session) {
        return customReducer({session, model:ProductVariation, action})
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
export const [updatedProductVariation, removedProductVariation, addedProductVariation, createdProductVariation, addedProductVariationTo, removedProductVariationFrom,] = actions().createDefaultFor('ProductVariation')

export default ProductVariation;
