
import React from 'react'
import BasketIco from './BasketIco'

const CartIco = () => {
  return (
   <div id="cart_icon" className="h-full w-full relative border-[0.9px] border-[#727280] rounded-[2rem] flex justify-center items-center ">
     <div id="border_circle" className="  p-2" >
        <BasketIco />
        <h2 id="cart_count" className="absolute -top-1 -right-[0.6rem] rounded-md flex justify-center items-center bg-white text-sm text-[#2967FF] font-raleway font-semibold" >
          10+
        </h2>
     </div>
     
   </div>
  )
}

export default CartIco
