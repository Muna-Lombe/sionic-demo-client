import React from 'react'
import { useSelector } from 'react-redux'
import { Cart } from '../components'
import { cartItemAdded, itemsInCart, selectCartItems } from '../js/slices/cart/cartSlice'
import { selectProductIds } from '../js/slices/products/productsSlice'

const Basket = () => {

  // recieve the state
  const items = useSelector(state => state.cart.entities)
  
  // convert received state to array of state
  
  // filter it by store
  const filterByStore = (filteredArr) =>{
    const filteredStoreObject = Object.create(null)
      filteredArr.forEach((fp)=>{
      if(filteredStoreObject[fp.product.store.name]){

        filteredStoreObject[fp.product.store.name].push({id:fp.id, ...fp.product, isOrdered: fp.isOrdered}) 
      }else{
          filteredStoreObject[fp.product.store.name] = [{id:fp.id, ...fp.product, isOrdered: fp.isOrdered}]
      }
      
    })
    return filteredStoreObject
  }

  // seperate it by ordered and not ordered status
  const inArrHaveBeenOrdered = (el, idx, arr) => {
    return el.isOrdered === true
  }
  const filtered = (cartItems, isOrdered) => {
    return Object.fromEntries(Object.entries(cartItems).filter(([key,value]) => value.some(inArrHaveBeenOrdered) === isOrdered));
  } 
  // pass it to the componenet
    console.log('items', items)
    console.log('array items', Object.keys(items).map((key)=> items[key]))
    console.log('items sorted by store', filterByStore(Object.keys(items).map((key)=> items[key])))
    // console.log('items not include ordered prs', filtered(filterByStore(Object.keys(items).map((key)=> items[key])), false))
    // console.log('items include ordered prs', filtered(filterByStore(Object.keys(items).map((key)=> items[key])), true))
    const unOrd = filtered(filterByStore(Object.keys(items).map((key)=> items[key])), false)
    const ord = filtered(filterByStore(Object.keys(items).map((key)=> items[key])), true)
    


    return (
    <Cart items={items} unOrd={unOrd} ord={ord}/>
  )
}

export default Basket