import React from 'react'
import { useSelector } from 'react-redux'
import { Cart } from '../components'
import { cartItemAdded, itemsInCart, selectCartItems } from '../js/slices/cart/cartSlice'
import { selectProductIds } from '../js/slices/products/productsSlice'

const Basket = () => {
    
  const cartItems = useSelector(state => state.cart.entities)

  console.log(cartItems)
  console.log(Object.keys(cartItems))
  // console.log('p',cartItems.length())
  return (
    
      // cartItems.map((pid) =>{
      //    <Cart id = {pid} />
      // })
      <Cart ids = {Object.keys(cartItems)}  />
      
   
  )
}

export default Basket