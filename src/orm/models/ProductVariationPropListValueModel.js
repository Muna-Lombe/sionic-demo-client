import { attr,fk, many, Model, ORM } from "redux-orm";




class ProductVariationPropListValue extends Model {}
ProductVariationPropListValue.modelName = 'ProductVariationPropListValue';
ProductVariationPropListValue.fields = {
    title: attr(),
    value: attr(),
    prdVarProp_id: fk('ProductVariationProp','productVariationPropListValues')
}

export default ProductVariationPropListValue;
