import React from 'react';
import { Link } from "react-router-dom";

// assets
import { CartIco, PinIco, SearchIco } from '../assets';
import avatar from '../assets/images/avatar.png'

const Navbar = () => {
  return (
     
    <nav className="w-full h-full flex justify-between gap-2 items-start md:items-center lg:items-center xl:items-center ">
      <div id="navbar_left__wrapper" className="relative w-full block sm:block md:flex md:flex-row lg:flex lg:flex-row xl:flex xl:flex-row justify-start items-center">
        <div id="logo_location" className=" flex justify-start  p-4 gap-8">
          <div id="logo" className="text-[2.4rem] leading-10 font-raleway font-bold">
            <Link to="/" > React </Link> 
          </div>
          <div id="address" className="flex items-center justify-between">
            <PinIco />
            <h2 className="hidden md:flex lg:flex">Александровск-Са...</h2>
          </div>
        </div>
        
        <div id="search_field" className=" w-auto  min-w-[12rem] h-[2.8rem] ml-[9rem] flex justify-between border-[1px] rounded-3xl p-[1px]">
          <input type="text" name="search" id="" className="w-full rounded-3xl bg-transparent px-2  text-black focus:outline-none" />
          <button id="search_btn" className="w-[6rem] rounded-3xl m-[0.05rem] px-2 bg-[#F0F4FB] flex justify-center items-center">
            <SearchIco />
          </button>
        </div>
      </div>
      <div id="navbar_right__wrapper" className="h-full pt-4 flex items-start justify-end sm:items-start md:m-0 md:p-0 md:items-center md:justify-center lg:m-0 lg:p-0 lg:items-center lg:justify-center xl:m-0 xl:p-0 xl:items-center xl:justify-center">
        <div id="user_content" className="w-[7rem] md:w-[8rem] lg:w-[8rem] xl:w-[8rem] h-full flex justify-around items-center">
          <div id="cart" className="  sm:flex md:flex lg:flex w-[2.8rem] h-[2.8rem]  ">
            <Link to="/cart"> <CartIco /> </Link> 
          </div>
          <div id="avatar_image" className="  lg:flex w-[2.8rem] ">
            <Link to="/history"> 
              <img src={avatar} alt="" />
            </Link> 
          </div>
        </div>
      </div>
      
      
    </nav>
    
    
  )
}

export default Navbar