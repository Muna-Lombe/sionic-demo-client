import {createSelector, ORM } from "redux-orm";
import Order from "../models/OrderModel";
import Product from "../models/ProductModel";
import { createReducer } from "redux-orm";
import { combineReducers } from "redux";
import Get from "../../assets/tests/Get";
import ProductCategory from "../models/ProductCategoryModel";
import ProductImage from "../models/ProductImageModel";
import ProductVariation from "../models/ProductVariationModel";
import ProductVariationProperty from "../models/ProductVariationPropertyModel";
import ProductVariationPropertyValue from "../models/ProductVariationPropertyValueModel";
import ProductVariationPropertyListValue from "../models/ProductVariationPropertyListValueModel";
import { CREATE, REMOVE, UPDATE, ADD_TO,REMOVE_FROM, ASSIGN } from "../actions/actionTypes";
import { createAsyncThunk, createEntityAdapter } from "@reduxjs/toolkit";
import db from "../../assets/tests/jsonServer/db";
import entitiesReducer, { reduce } from "./entitiesReducer";

export const orm = new ORM({
    stateSelector: state => {
        // console.log("ss", state.orm)
        return state
    },

});
// getFromDB
orm.register(Product, Order,ProductCategory,  ProductImage, ProductVariation, ProductVariationProperty,ProductVariationPropertyValue,ProductVariationPropertyListValue);

// export const ormRootReducer = createReducer(orm, 
//     (session, action)=>{
//         if(action.type !== "orm/loadProductVariationPropertyListValues/fulfilled") return 0;
//         console.log("fetch done...")
//         session.sessionBoundModels.forEach(function (modelClass) {
//             reduce( session, action, modelClass)
//         });
//     }
// ) 

export const ormRootReducer = combineReducers({
    orm: createReducer(orm, 
        (session, action)=>{
            if(action.type !== "orm/loadProductVariationPropertyListValues/fulfilled") return 0;
            console.log("fetch done...")
            session.sessionBoundModels.forEach(function (modelClass) {
                reduce( session, action, modelClass)
            });
        }
    ),
   

}) 

let emptyState = orm.getEmptyState()

// creates session with empty db state
export const session = orm.session(emptyState);

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
export const load =async(model, thunkFulfilled)=>{
    if(model){
        // console.log(model)
        let data = await db.makeRequest(model.dataName, model.range)
        // console.log("data", data)
        const props = {data, model}
        const newState = entitiesReducer(session, props)
        return newState
    }
    if(thunkFulfilled){
        // session
    }
    
}
    
 
// load attributes
// loadProducts()
// loadCategories()
// get.LazyLoad('ProductsByMaxRange')


// selectors
// export const selectProductsFromModel =createSelector//(orm.Product)

export const productSession = session['Product']
export const orderSession = session['Order']
export const categorySession = session['ProductCategory']
export const imageSession = session['ProductImage']
export const productVariationPropertySession = session['ProductVariationProperty']
export const productVariationPropertyListValueSession = session['ProductVariationPropertyListValue']
export const productVariationPropertyValueSession = session['ProductVariationPropertyValue']
export const productVariationSession = session['ProductVariation']
// export default orm;
// console.log("products", selectProductsFromModel(orm.Product).apply())
