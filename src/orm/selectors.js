import { createSelector } from "redux-orm";

import { productSession, orderSession, categorySession, imageSession, productVariationSession, productVariationPropertyListValueSession, productVariationPropertySession, productVariationPropertyValueSession, session, orm } from '../orm/reducers/rootOrmReducer';
console.log(session, orm)

const ormSelector = state => state
export const filteredCategoriesFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
  state => {
    console.log("running categories selector", )
    const catObject = session.ProductCategory
    .all()
    .toRefArray()
    return (ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)

export const filteredListingsFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
  state => {
    console.log("running categories selector", )
    const catObject = session.ProductCategory
    .all()
    .toRefArray()
    return (ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)
export const filteredOrdersFromModel = (ex) => createSelector(
  ormSelector(session.schema),
  state => {
    const catObject = session.Order
    .all()
    .toRefArray()
    return (ex?.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)
export const filteredProductsFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
    state => {
      console.log("running prods selector", state)
      const productObject = session.Product
      .all()
      .toRefArray() 
      .map((p,) =>{
        return {
        ...p, 
        orders: productSession.withId(p.id).orders.toRefArray(),
        images: productSession.withId(p.id).images.toRefArray(),
        variations: productSession.withId(p.id).variations.toRefArray()
          .map((v,idx)=>{
            return {
              ...v,
              properties: productVariationPropertySession.all().toRefArray()
              .map((prop, idx)=>{
                return {
                  ...prop,
                  listValues: productVariationPropertySession.at(idx).listValues.all().toRefArray(),
                }
              }),
              values: productVariationSession.at(idx).propertyValues.all().toRefArray()


            }
          }),
          
        }
      })

      return (ex.length ? productObject.filter(el=> ex.some((e)=> e=== el.category_id)) :  productObject)
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

