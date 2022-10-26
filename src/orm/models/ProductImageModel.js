import { attr,fk, many, Model, oneToOne, ORM } from "redux-orm";




class ProductImage extends Model {}
ProductImage.modelName = 'ProductImage';
ProductImage.fields = {
    id: attr(),
    image_name: attr(),
    image_url: attr(),
    product_id: fk('Product', 'images',),
    
}

ProductImage.options = {
    idAttribute: 'id'
}
export default ProductImage;
