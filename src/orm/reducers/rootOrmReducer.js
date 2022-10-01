import {createSelector, ORM } from "redux-orm";
import Order from "../models/OrderModel";
import Product from "../models/ProductModel";
import { createReducer } from "redux-orm";
import { combineReducers } from "redux";
import Get from "../../assets/tests/Get";
import ProductCategory from "../models/ProductCategoryModel";
import ProductImage from "../models/ProductImageModel";
import ProductVariation from "../models/ProductVariationModel";
import ProductVariationProp from "../models/ProductVariationPropModel";
import ProductVariationPropValue from "../models/ProductVariationPropValueModel";
import ProductVariationPropListValue from "../models/ProductVariationPropListValueModel";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";
import { createAsyncThunk } from "@reduxjs/toolkit";
import db from "../../assets/tests/jsonServer/db";
import entitiesReducer from "./entitiesReducer";
const orm = new ORM({
    stateSelector: state => state.entities

});
// getFromDB
orm.register(Product, Order,ProductCategory,  ProductImage, ProductVariation, ProductVariationProp,ProductVariationPropValue,ProductVariationPropListValue);
export const ormRootReducer = combineReducers({
    orm: createReducer(orm), // This will be the Redux-ORM state.
    // product: Product.reducer,

    // … potentially other reducers
});
let emptyState = orm.getEmptyState()
// creates session with empty db state
export const session = orm.session(emptyState);


export const loadProducts = createAsyncThunk('orm/orm/loadProducts',async()=>{
    let data = await db.makeRequest('Products')
    console.log("data", data)
    for (const e of data) {
        let type = "PRODUCT_"+CREATE
        let payload = {name:e.name, description:e.description, category_id: e.category_id }
        let action = {type, payload}
        entitiesReducer(emptyState,session,action)
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
    let data = await db.makeRequest('ProductCategories')
    console.log("data", data)
    for (const e of data) {
        let type = "ProductCategory_"+CREATE
        let payload = {id:e.id, name:e.name}
        console.log("payload", payload)
        let action = {type, payload}
        entitiesReducer(emptyState, session, action)
    }
 })
 export const load = createAsyncThunk(`orm/orm/loadProductCategories`, async()=>{
    let data = await db.makeRequest("ProductCategories")
    console.log("data", data)
    for (const e of data) {
        let name = "ProductCategories"
        let modelname = name.endsWith("ies") ? name.replace("ies", "y") : name
        let type = modelname+"_"+CREATE
        let payload = {id:e.id, name:e.name}
        console.log("payload", payload)
        let action = {type, payload}
        entitiesReducer(emptyState, session, action)
    }
})
    
 
// load attributes
// loadProducts()
// loadCategories()
// get.LazyLoad('ProductsByMaxRange')

export const productSession = session['Product']
export const orderSession = session['Order']
export const categorySession = session['ProductCategory']
export const imageSession = session['ProductImage']
export const productVariationPropSession = session['productVariationProp']
export const productVariationPropListValueSession = session['productVariationPropListValue']
export const productVariationPropValueSession = session['productVariationPropValue']
export const productVariationSession = session['ProductVariation']
