import React from 'react';

import { CartIco, PinIco, SearchIco } from '../assets';
import avatar from '../assets/images/avatar.png'
const Navbar = () => {
  return (
    <div className="w-full h-full flex justify-around items-center ">
      <div id="logo_location" className="w-[20rem] flex justify-around">
        <div id="logo" className="text-[2.4rem] leading-10 font-raleway font-bold">
          React
        </div>
        <div id="address" className="flex items-center justify-between">
          <PinIco />
          <h2 className="hidden lg:flex">Александровск-Са...</h2>
        </div>
      </div>
      
      <div id="search_field" className=" w-[36rem] h-[2.8rem] flex justify-between border-[1px] rounded-3xl p-[1px]">
        <input type="text" name="search" id="" className="w-full rounded-3xl bg-transparent px-2  text-black focus:outline-none" />
        <button id="search_btn" class="w-[6rem] rounded-3xl m-[0.05rem] px-2 bg-[#F0F4FB] flex justify-center items-center">
          <SearchIco />
        </button>
      </div>
      <div id="user_content" className="w-[8rem] h-full flex justify-around items-center">
        <div id="cart" className=" hidden lg:flex w-[2.8rem] h-[2.8rem]  ">
          <CartIco />
        </div>
        <div id="avatar_image" className=" hidden lg:flex w-[2.8rem] ">
          <img src={avatar} alt="" />
        </div>
      </div>
      
    </div>
  )
}

export default Navbar