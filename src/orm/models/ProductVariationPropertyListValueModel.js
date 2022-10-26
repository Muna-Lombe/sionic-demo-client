import { attr,fk, many, Model, ORM } from "redux-orm";




class ProductVariationPropertyListValue extends Model {}
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
