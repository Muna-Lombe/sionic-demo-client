import { attr,fk, many, Model, ORM } from "redux-orm";
import { PropTypes } from 'react';
// import { getPropTypesMixin } from "redux-orm-proptypes";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";
// import { session } from "../reducers/rootOrmReducer";




// var ValidModel = getPropTypesMixin(Model)

class Product extends Model {

}
Product.modelName = 'Product';
// Product.propTypes = {
//     name:  PropTypes.string.isRequired,
//     price: PropTypes.number.isRequired
// }
Product.fields = {
    id: attr(),
    name: attr(),
    description: attr(),
    category_id: fk('ProductCategory', 'products'),
    // orders: many('Order','product')
    
}

Product.options = {
    idAttribute: 'id'
}

export default Product;


