import { attr,fk, many, Model, ORM } from "redux-orm";




class ProductVariation extends Model {}
ProductVariation.modelName = 'ProductVariation';
ProductVariation.fields = {
    quantity: attr(),
    price: attr(),
    product_id: fk('Product', 'productVariations'),
    
}

export default ProductVariation;
