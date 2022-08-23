import { attr,fk, many, Model, ORM } from "redux-orm";




class ProductVariationProp extends Model {}
ProductVariationProp.modelName = 'ProductVariationProp';
ProductVariationProp.fields = {
    name: attr(),
    type: attr(),
    
}

export default ProductVariationProp;
