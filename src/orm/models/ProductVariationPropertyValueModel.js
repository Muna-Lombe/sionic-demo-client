import { attr,fk, many, Model, ORM } from "redux-orm";




class ProductVariationPropertyValue extends Model {}
ProductVariationPropertyValue.modelName = 'ProductVariationPropertyValue';
ProductVariationPropertyValue.fields = {
    id: attr(),
    product_variation_id: fk('ProductVariation','propertyValues'),
    product_variation_property_id: fk({to:'ProductVariationProperty',relatedName:'propertyValues', through:'productVariationPropertyListValue',throughFields:'id'}),
    // title: attr(),
    value_str: attr(),
    value_flt: attr(),
    value_int: attr(),
}
ProductVariationPropertyValue.options = {
    idAttribute: 'id'
}
export default ProductVariationPropertyValue;
