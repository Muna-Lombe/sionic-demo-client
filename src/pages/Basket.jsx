import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Cart, NoItems } from '../components'
import { cartItemAdded, itemsInCart, selectCartItems } from '../js/slices/cart/cartSlice'
import { selectProductIds } from '../js/slices/products/productsSlice'
import { Outlet } from 'react-router-dom'
import { filteredOrdersFromModel } from '../orm/selectors'
import types from '../orm/actions/actionTypes'

const Basket = () => {

  // recieve the state
  const items = useSelector(filteredOrdersFromModel()) //useSelector(state => state.cart.entities)
  // const testItems = useSelector(filteredOrdersFromModel([]))
  console.log("test", items)
  // convert received state to array of state
  
  // filter it by store
  const filterByStore = (ordItm) =>{
    const filteredStoreObject = Object.create(null)
      ordItm.forEach((fp)=>{
      if(filteredStoreObject[fp.product.store.name]){

        filteredStoreObject[fp.product.store.name].push(fp) 
      }else{
          filteredStoreObject[fp.product.store.name] = [fp]
      }
      
    })
    return filteredStoreObject
  }

  // seperate it by ordered and not ordered status

  
  const sortBy = (cartItems, orderStatus) => {
    const matchingStatus = (i) => i.OrderStatus.toString().includes(orderStatus)
    const filterByStatus =([k,v])=>{
      const itm = v.filter(matchingStatus)
      if (itm.length) return [k,itm]
    } 
    const noUndefined = i => i!==undefined
    return Object.entries(cartItems).map(filterByStatus).filter(noUndefined) 
  } 

    const unOrd = Object.fromEntries(sortBy(filterByStore(Object.values(items)), types.IN_CART))
  const ord = Object.fromEntries(sortBy(filterByStore(Object.values(items)), types.ORDERED))
    
    console.log('test items',unOrd,'\n',ord)

    return (
      <>
        <Suspense fallback={<NoItems />}>
          <Cart unOrd={unOrd} ord={ord}/>
        </Suspense>
      </>
    )
}

export default Basket