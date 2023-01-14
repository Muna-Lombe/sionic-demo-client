import { attr,fk, many, Model, oneToOne, ORM } from "redux-orm";
import customReducer from "./reducer";




class ProductImage extends Model {
    static reducer(session, ProductImage, action) {
        return customReducer(session, ProductImage, action)
    }
}
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
