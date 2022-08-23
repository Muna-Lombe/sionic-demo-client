import { attr,fk, many, Model, oneToOne, ORM } from "redux-orm";




class Image extends Model {}
Image.modelName = 'Image';
Image.fields = {
    image_name: attr(),
    image_url: attr(),
    product_id: oneToOne('Product'),
    
}


export default Image;
