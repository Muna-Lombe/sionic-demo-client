import React from 'react'
import { Link } from "react-router-dom";


// assets
import cartImg from '../assets/images/cart_item.png'
import { DeleteIco } from '../assets'



const Cart = () => {
  
  const text = "Смартфон Xiaomi Redmi Note 8 Pro 6/128GB, белый"

  const CartedProduct = () => (
    <div id="product_wrapper" className="w-auto h-[10rem] py-6 mx-8  p-1 flex justify-between gap-1 border-b-[1px] border-b-gray-300">
      <div id="product_details" className="w-max lg:w-[40rem] xl:w-[40rem] flex justify-start">
        <div id="product_image" className=" h-[5rem] px-2 flex justify-center items-center">
          <img className="w-full h-full object-contain" src={cartImg} alt="IGM" />
        </div>
        <div id="product_description" className="w-[15rem] md:w-[20rem] lg:w-max xl:w-max flex flex-col justify-between">
          <p className=" h-[5rem] overflow-y-hidden">
            {text.toString().length > 12 ? text.slice(0,90) + "..." : text}
          </p>
          <div id="product_tags" className="w-max  flex flex-col lg:flex-row xl:flex-row justify-between ">
            <div className="w-max flex ">
              <div className="w-max h-[2rem] p-2 flex justify-center items-center border-[1px] border-[#2967FF] rounded-r-3xl rounded-bl-xl text-md text-[#2967FF] font-raleway font-semibold" >
                <p> 120 шт. </p>
              </div>
              <div className="w-max h-[2rem] p-2 flex justify-center items-center -z-10 border-t-[1px] border-r-[1px] border-b-[1px] border-[#FF2D87] rounded-r-3xl ext-md text-[#FF2D87] font-raleway font-semibold ">
                <p>за 12:48:35</p> 
              </div>
            </div>
            <div id="purchased_count" className=" w-max flex justify-between items-center gap-1 font-raleway">
              <p>
                Куплено:
              </p>
              <p className="font-semibold">
                150 шт.
              </p>
            </div>
          </div>  
        </div>
      </div>
      
      <div id="product_quantity" className="w-max md:w-max flex flex-col-reverse md:flex-col-reverse lg:w-[20rem] lg:flex lg:flex-row xl:flex xl:flex-row justify-between gap-4">
        <div id="product_count" className=" w-max md:w-[8rem] lg:w-[8rem] h-[2.5rem] p-2 flex justify-around gap-4 border-[1px] items-center border-gray-300 rounded-3xl">
          <p className="px-3">-</p>
          <input  className="w-[1.4rem] flex justify-center items-center  decoration-transparent bg-transparent " type="text" value="25" disabled="disabled" />
          <p className="px-3">+</p>
        </div>
        <div id="product_price" className="w-max md:w-full lg:w-[60%] xl:w-full">
          <h2 id="new_price" className=" text-[#2967FF] text-[1.3rem] font-semibold">
              от 350 000 ₽
          </h2>
          <div id="discounted_price" className="w-[70%] flex pr-2 justify-between ">
            <h4 id="old_price" className="text-[#8D8D8E] text-s line-through font-extralight">
              450 500 ₽
            </h4>
          </div>
        </div>
      </div>
      <button id="delete_btn" className=" py-2 flex flex-col  justify-start">
          <DeleteIco />
      </button>

    </div>
  )




  return (
    <div id="cart_container" className="w-full flex flex-col justify-center">
      <div id="cart_header" className=" flex justify-start gap-6 items-baseline">
        <div className="text-lg text-black font-raleway font-[800]">Корзина</div>
        <div className="text-md text-[#FF2D87] font-raleway font-semibold">Очистить корзину</div>
      </div>
      <div id="cart_content" className="w-[98%] mx-4 flex flex-col py-1 border-[1px] border-gray-300 rounded-lg">
        <div id="cart_item" className="w-full flex flex-col">
          <div id="cart_item__wrapper" className="p-2 flex justify-around items-center border-b-[1px] border-b-gray-300 rounded-b-lg text-xl font-raleway">
            <div id="item_name" className="font-bold">
              Xiaomi            </div>
            <div id="cart_item__total_price" className="">
              <p className=" ">
                Стоимость корзины:
              </p>
              <p className=" text-black font-bold">
                1 185 000₽ 
              </p>
            </div>
            <div id="Checkout_btn"  className="w-[10rem] h-[2.5rem] px-8 py-5 bg-[#2967FF] border-[1px] border-[#2967FF] flex justify-center items-center rounded-3xl  text-white  font-medium ">
              <Link to="/checkout"> Оформить </Link>
            </div>
            <div id="item_ico">
            
            </div>
          </div>
          <CartedProduct />
          <CartedProduct />
          <CartedProduct />
        </div>
        
      </div>
    </div>
  )
}

export default Cart
