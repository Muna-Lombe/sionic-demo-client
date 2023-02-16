import { attr,fk, many, Model, oneToOne, ORM } from "redux-orm";
import { PropTypes } from 'react';
// import { getPropTypesMixin } from "redux-orm-proptypes";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN, actions } from "../actions/actionTypes";
import { createSlice } from "@reduxjs/toolkit";
import customReducer from "./reducer";
// import { session } from "../reducers/rootOrmReducer";


// var ValidModel = getPropTypesMixin(Model)

class Product extends Model {
    static reducer(action, Product,session ){
        return customReducer({session, model:Product, action})
    }
    
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
    // status: attr()
    // productImages: many('ProductImage')
    
}

Product.options = {
    idAttribute: 'id'
}
export const [updatedProduct, removedProduct, addedProduct, createdProduct, addedProductTo, removedProductFrom,] = actions().createDefaultFor('Product')

export default Product;


