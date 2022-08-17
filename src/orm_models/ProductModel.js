import { attr,fk, many, Model, ORM } from "redux-orm";




class Product extends Model {}
Product.modelName = 'Product';
Product.fields = {
    name: attr(),
    price: attr()
    
}


export default Product;


