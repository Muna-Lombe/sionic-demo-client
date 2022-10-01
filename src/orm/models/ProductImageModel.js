import { attr,fk, many, Model, oneToOne, ORM } from "redux-orm";




class ProductImage extends Model {}
ProductImage.modelName = 'ProductImage';
ProductImage.fields = {
    image_name: attr(),
    image_url: attr(),
    product_id: oneToOne('Product'),
    
}


export default ProductImage;
