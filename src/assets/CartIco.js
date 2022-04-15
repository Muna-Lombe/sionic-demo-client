
import React from 'react'
import { useSelector } from 'react-redux'
import { itemIdsInCart, selectcartIds } from '../js/slices/cart/cartSlice'
import BasketIco from './BasketIco'


const CartIco = () => {
  
  let itemsInCart = useSelector(state => state.cart.entities)
  const itemsCount = Object.keys(itemsInCart)
  console.log('in cart ico comp, cart-ids:')
  return (
   <div id="cart_icon" className="h-full w-full relative border-[0.9px] border-[#727280] rounded-[2rem] flex justify-center items-center ">
     <div id="border_circle" className="  p-2" >
        <BasketIco />
        <h2 id="cart_count" className="w-[20.38px] h-[20px] absolute -top-1 -right-[0.6rem] rounded-md flex justify-start items-center bg-white text-sm text-[#2967FF] font-raleway font-semibold" >
          {itemsCount.length < 10 ? itemsCount.length : '10+'}
          {/* 10+ */}
        </h2>
     </div>
     
   </div>
  )
}

export default CartIco
