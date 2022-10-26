import { attr,fk, many, Model, ORM } from "redux-orm";




class ProductVariationProperty extends Model {}
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
