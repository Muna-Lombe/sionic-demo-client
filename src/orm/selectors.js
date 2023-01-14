import { createSelector } from "redux-orm";

import { productSession, orderSession, categorySession, imageSession, productVariationSession, productVariationPropertyListValueSession, productVariationPropertySession, productVariationPropertyValueSession, session, orm } from '../orm/reducers/rootOrmReducer';
console.log(session, orm)


const ormSelector = state => state
const stateIsNotLoadedFor = (entity) => {
  return entity.all().toRefArray().length < 0
}
const tryToCheckAfterTimeout = (entity, timeout) => {
  let timeOutResult = entity;
  setTimeout(() => {
    timeOutResult = stateIsNotLoadedFor(entity) ? tryToCheckAfterTimeout(entity, timeout + 100) : entity
  }, timeout);
  clearTimeout()
  return timeOutResult
};
const waitForStateToLoad=(entity)=>{
  
 
  return tryToCheckAfterTimeout(entity, 100)

}

export const filteredCategoriesFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
  state => {
    let temp = waitForStateToLoad(session.ProductCategory)
    // console.log("running categories selector", temp)
    let catObject;
    catObject = temp//session.ProductCategory
    .all()
    .toRefArray()
    return (ex.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)

export const filteredListingsFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
  state => {
   
    // console.log("running categories selector", )
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
    console.log("orders",catObject)
    return (ex?.length ? catObject.filter(el=> !ex.some((e)=> e=== el.category_id)) :  catObject)
    
  }
)
export const filteredProductsFromModel = (ex)=> createSelector(
  ormSelector(session.schema),
    state => {
      // console.log("running prods selector", state)
      let temp = waitForStateToLoad(session.Product)
      // console.log("running products selector", temp)
      const productObject = temp//session.Product
      .all()
      .toRefArray() 
      /*.map((p,) =>{
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
      })*/
      console.log("running products selector 2", productObject)
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

