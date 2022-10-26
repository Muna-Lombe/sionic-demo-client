import { attr,fk, many, Model, ORM } from "redux-orm";




class ProductVariation extends Model {}
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
export default ProductVariation;
