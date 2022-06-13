
import React from 'react'
import { useSelector } from 'react-redux'
import { itemIdsInCart, selectcartIds } from '../js/slices/cart/cartSlice'
import BasketIco from './BasketIco'


const CartIco = ({isBurgerMenu,isCartBtn=false}) => {
  
  let itemsInCart = useSelector(state => state.cart.entities)
  const itemsCount = Object.keys(itemsInCart).filter((key) => itemsInCart[key].isOrdered !== true)
  const AddCartCount = () =>(
      <h2 id="cart_count" className=" absolute top-0 -right-[0.6rem] min-w-[15px] w-auto aspect-square max-w-[20px]  flex justify-start items-center rounded-md bg-white text-sm text-[#2967FF] font-raleway font-semibold" >
        {itemsCount.length < 10 ? itemsCount.length : '10+'}
        {/* 10+ */}
      </h2>
  )
  return (
   <div id="cart_icon" className="w-auto relative border-[0.9px] border-[#727280] rounded-[2rem] flex justify-center items-center ">
     <div id="border_circle" className="p-2" >
        <BasketIco isBurgerMenu={isBurgerMenu} />
        {
          isCartBtn && <AddCartCount/>

        }
     </div>
     
   </div>
  )
}

export default CartIco
