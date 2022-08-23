import {createSelector, ORM } from "redux-orm";
import Order from "../models/OrderModel";
import Product, { productReducer } from "../models/ProductModel";
import { createReducer } from "redux-orm";
import { combineReducers } from "redux";
import Get from "../../assets/tests/Get";
import Category, { categoryReducer } from "../models/CategoryModel";
import Image from "../models/ImageModel";
import ProductVariation from "../models/ProductVariationModel";
import ProductVariationProp from "../models/ProductVariationPropModel";
import ProductVariationPropValue from "../models/ProductVariationPropValueModel";
import ProductVariationPropListValue from "../models/ProductVariationPropListValueModel";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";


const orm = new ORM({
    stateSelector: state => state.entities

});
orm.register(Product, Order,Category,  Image, ProductVariation, ProductVariationProp,ProductVariationPropValue,ProductVariationPropListValue);
export const ormRootReducer = combineReducers({
    orm: createReducer(orm), // This will be the Redux-ORM state.
    // product: Product.reducer,

    // … potentially other reducers
});
let emptyState = orm.getEmptyState()
// creates session with empty db state
export const session = orm.session(emptyState);

var get = new Get();
// createAsyncThunk('orm/orm/Product')
// export async function loadProducts (){
    
//     let data = await get.ProductsByMaxRange(10)
//      console.log("data", data)
//     for (const e of data) {
//         let type = CREATE
//         let payload = {name:e.name, description:e.description, category_id: e.category_id }
//         let action = {type, payload}
//         productReducer(emptyState,action,session['Product'], session)
//         // session['Product'].create({name:e.name, description:e.description, category_id: e.category_id })
//     }
// }
export const loadProducts = createAsyncThunk('orm/orm/loadProducts',async()=>{
    let data = await get.ProductsByMaxRange(10)
     console.log("data", data)
    for (const e of data) {
        let type = CREATE
        let payload = {name:e.name, description:e.description, category_id: e.category_id }
        let action = {type, payload}
        productReducer(emptyState,action,session['Product'], session)
        // session['Product'].create({name:e.name, description:e.description, category_id: e.category_id })
    }
 })

// export async function loadCategories(){
//     let data = await get.ProductCategories()
//     console.log("data", data)
//     for (const e of data) {
//         let type = CREATE
//         let payload = {id:e.id, name:e.name}
//         let action = {type, payload}
//         categoryReducer(emptyState, action, session['Category'], session)
//     }
// }
export const loadCategories = createAsyncThunk('orm/orm/loadCategories',async()=>{
    let data = await get.ProductCategories()
    console.log("data", data)
    for (const e of data) {
        let type = CREATE
        let payload = {id:e.id, name:e.name}
        let action = {type, payload}
        categoryReducer(emptyState, action, session['Category'], session)
    }
 })
// load attributes
// loadProducts()
// loadCategories()
// get.LazyLoad('ProductsByMaxRange')

export const productSession = session['Product']
export const orderSession = session['Order']
export const categorySession = session['Category']
export const imageSession = session['Image']
export const productVariationPropSession = session['productVariationProp']
export const productVariationPropListValueSession = session['productVariationPropListValue']
export const productVariationPropValueSession = session['productVariationPropValue']
export const productVariationSession = session['ProductVariation']
