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
      const catId =  0//state.ProductCategory.initialState.currCatId
      // console.log("catid", ex)
      const filteredProdsByCat = ex.length  
                                  ? state.ProductCategory
                                    .filter(cat => ex.some(i => i === cat.id))
                                    .all().toModelArray()
                                    .flatMap(i => i.products.all().toRefArray())
                                  : state.Product.all().toRefArray()
     
      const productsArray = filteredProdsByCat.map((p,i) =>{
        let p1 = {
        ...p, 
        orders: state.Product.withId(p.id).orders.toRefArray(),
        images: state.Product.withId(p.id).images.toRefArray(),
        priceRange: state.Product.withId(p.id).variations.toRefArray().map((v)=> v.price),
        variations: state.Product.withId(p.id).variations.toRefArray()
          .map((v,vidx)=>{
            return {
              ...v,
              properties: state.ProductVariationProperty.all().toRefArray()
              .map((prop, pidx)=>{
                const value = state.ProductVariationProperty.withId(prop.id) //{ value_string, value_float, value_int }
                  .propertyValues.all()
                  .filter(val => (val.product_variation_id === v.id && val.product_variation_property_id === prop.id))
                  .toRefArray()[0]
                const listValues = state.ProductVariationProperty.withId(prop.id)
                                  .listValues.all()
                                  .filter(lv=> lv.product_variation_property_id === prop.id)
                                  .toRefArray().map(t=> ({title:t.title, value:t.value}))
                return {
                  ...prop,
                  values: [(value?.value_string || value?.value_float || value?.value_int || listValues)].flat()  ,
                  // listValues: state.ProductVariationProperty.withId(prop.id).listValues.all().toRefArray(),
                }
              }),
            



            }
          
          }),
          
        }
        let id=i
        if(i !== 0){ id = i%6}
        // console.log("pr1",p1, i)
        // return p1
        return addToProductData(p1, id)
      });

      return productsArray
      // console.log("running products selector 2",ex, productsArray[1].category_id)
      // return (ex.length ? productsArray.filter(el=> ex.includes(el.category_id))/*.some((e)=> e === el.category_id))*/ :  productsArray)
    }
  )

  export const productsMatchingSearch =(searchTextArr)=> createSelector(
    ormSelector(session.schema),
    filteredProductsFromModel([]),
    (state,products)=> {
      return products.filter((i,x)=> searchTextArr.some((d,x)=>i.product.name.toString().includes(d.toString()) || d.toString().includes(i.product.name.toString())) )
      
    }
  )
  