import {createSelector, ORM } from "redux-orm";
import Order from "../models/OrderModel";
import Product from "../models/ProductModel";
import { createReducer } from "redux-orm";
import ProductCategory from "../models/ProductCategoryModel";
import ProductImage from "../models/ProductImageModel";
import ProductVariation from "../models/ProductVariationModel";
import ProductVariationProperty from "../models/ProductVariationPropertyModel";
import ProductVariationPropertyValue from "../models/ProductVariationPropertyValueModel";
import ProductVariationPropertyListValue from "../models/ProductVariationPropertyListValueModel";
import { defaultUpdater } from "redux-orm/lib/redux";


export const orm = new ORM({
    stateSelector: state => {
        // console.log("ss", state.orm)
        return state.orm
    }

});
// getFromDB
orm.register(Product, Order,ProductCategory,  ProductImage, ProductVariation, ProductVariationProperty,ProductVariationPropertyValue,ProductVariationPropertyListValue);

export const ormRootReducer = createReducer(orm, defaultUpdater) //customStateUpdater) 

// export const ormRootReducer = combineReducers({
//     orm: createReducer(orm, customStateUpdater),
//     // entities: reduce
// }) 

let emptyState = orm.getEmptyState()

// creates session with empty db state
export const session = orm.session(emptyState);

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
