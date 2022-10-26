import { attr,fk, many, Model, oneToOne, ORM } from "redux-orm";
import { PropTypes } from 'react';
// import { getPropTypesMixin } from "redux-orm-proptypes";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";
import { createSlice } from "@reduxjs/toolkit";
// import { session } from "../reducers/rootOrmReducer";



// var ValidModel = getPropTypesMixin(Model)

class Product extends Model {
    // static reducer(action, Product, session) {
    //     let product;
    //     switch (action.type) {
    //     case 'CREATE_Product':
    //         Product.create(action.payload);
    //         break;
    //     case 'UPDATE_Product':
    //         product = Product.withId(action.payload.id);
    //         product.update(action.payload);
    //         break;
    //     case 'REMOVE_Product':
    //         product = Product.withId(action.payload);
    //         product.delete();
    //         break;
    //     case 'ADD_AUTHOR_TO_Product':
    //         product = Product.withId(action.payload.ProductId);
    //         product.authors.add(action.payload.author);
    //         break;
    //     case 'REMOVE_AUTHOR_FROM_Product':
    //         product = Product.withId(action.payload.ProductId);
    //         product.authors.remove(action.payload.authorId);
    //         break;
    //     case 'ASSIGN_PUBLISHER':
    //         product = Product.withId(action.payload.ProductId);
    //         product.publisherId = action.payload.publisherId;
    //         break;
    //     default: 
    //         return session.state
    //     }
        
    //     // Return value is ignored.
    // }
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
    // productImages: many('ProductImage')
    
}

Product.options = {
    idAttribute: 'id'
}

export default Product;


