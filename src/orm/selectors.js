import { createSelector } from "redux-orm";

import { productSession, orderSession, categorySession, imageSession, productVariationSession, productVariationPropertyListValueSession, productVariationPropertySession, productVariationPropertyValueSession, session, orm } from '../orm/reducers/rootOrmReducer';
import { addToProductData } from "../js/slices/products/productsSlice";
console.log(session, orm)


const ormSelector = state => state


export const filteredCustomModelSelector = (model, ex) =>{
  return createSelector(
    ormSelector(session.schema),
    state => {

      const modObject = state[model]
        .all()
        .toRefArray()
      return modObject //(ex.length ? catObject.filter(el => !ex.some((e) => e === el.category_id)) : catObject)

    }
  )
} 
export const filteredCategoriesFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
  state => {
   
    const catObject = state.ProductCategory
    .all()
    .toRefArray()
    return (ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)

export const filteredListingsFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
  state => {
   
    // console.log("running categories selector", )
    const catObject = state.ProductCategory//session.ProductCategory
    .all()
    .toRefArray()
    return (ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)
export const filteredOrdersFromModel = (ex) => createSelector(
  ormSelector(session.schema),
  state => {
    const catObject = state.Order
    .all()
    .toRefArray()
    console.log("orders", catObject, state.Order.all().toModelArray())
    return (ex?.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)

export const filteredProductsFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
    state => {
      // console.log("whatsup", state.Product)
      
      const productsArray = state.Product
      .all()
      .toRefArray() 
      .map((p,i) =>{
        let p1 = {
        ...p, 
        orders: state.Product.withId(p.id).orders.toRefArray(),
        images: state.Product.withId(p.id).images.toRefArray(),
        priceRange: state.Product.withId(p.id).variations.toRefArray().map((v)=> v.price),
        variations: state.Product.withId(p.id).variations.toRefArray()
          .map((v,idx)=>{
            return {
              ...v,
              properties: state.ProductVariationProperty.all().toRefArray()
              .map((prop, idx)=>{
                return {
                  ...prop,
                  listValues: state.ProductVariationProperty.at(idx).listValues.all().toRefArray(),
                }
              }),
              values: state.ProductVariation.at(idx).propertyValues.all().toRefArray()


            }
          
          }),
          
        }
        let id=i
        if(i !== 0){ id = i%6}
        // console.log("pr1",p1, i)
        // return p1
        return addToProductData(p1, id)
      });
   
    
      
      
      // console.log("running products selector 2",ex, productsArray[1].category_id)
      return (ex.length ? productsArray.filter(el=> ex.includes(el.category_id))/*.some((e)=> e === el.category_id))*/ :  productsArray)
    }
  )
  
  
  // const selectProds = createSelector(
  //   orm,
  //   state => {
  //     console.log("say", state.orm.Product)
  //     const products = state.orm.Product
  //     return products.items.map(i => ({...products.itemsById[i]}) )
  //   }
  // )
  // const selectCats = createSelector(
  //   orm,
  //   state => {
  //     console.log("say", state.orm.Category)
  //     const products = state.orm.Category
  //     return products.items.map(i => ({...products.itemsById[i]}) )
  //   }
  // )
  // const selectImgs = createSelector(
  //   orm,
  //   state => {
  //     console.log("say", state.orm.Product)
  //     const products = state.orm.Product
  //     return products.items.map(i => ({...products.itemsById[i]}) )
  //   }
  // )
  
  // const selectVars = createSelector(
  //   orm,
  //   state => {
  //     console.log("say", state.orm.Product)
  //     const products = state.orm.Product
  //     return products.items.map(i => ({...products.itemsById[i]}) )
  //   }
  // )
  // const selectVarProps = createSelector(
  //   orm,
  //   state => {
  //     console.log("say", state.orm.Product)
  //     const products = state.orm.Product
  //     return products.items.map(i => ({...products.itemsById[i]}) )
  //   }
  // )
  // const selectVarPropListVals = createSelector(
  //   orm,
  //   state => {
  //     console.log("say", state.orm.Product)
  //     const products = state.orm.Product
  //     return products.items.map(i => ({...products.itemsById[i]}) )
  //   }
  // )
  // const selectVarPropVals = createSelector(
  //   orm,
  //   state => {
  //     console.log("say", state.orm.Product)
  //     const products = state.orm.Product
  //     return products.items.map(i => ({...products.itemsById[i]}) )
  //   }
  // )

