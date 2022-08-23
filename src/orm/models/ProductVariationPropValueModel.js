import { attr,fk, many, Model, ORM } from "redux-orm";




class ProductVariationPropValue extends Model {}
ProductVariationPropValue.modelName = 'ProductVariationPropValue';
ProductVariationPropValue.fields = {
    prdVar_id: fk('ProductVariation','productVariationPropValues'),
    prdVarProp_id: fk({to:'ProductVariationProp',relatedName:'productVariationPropValues', through:'productVariationPropListValue',throughFields:'id'}),
    // title: attr(),
    value_str: attr(),
    value_flt: attr(),
    value_int: attr(),
}

export default ProductVariationPropValue;
