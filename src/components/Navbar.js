import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// assets
import { AvatarIco, CartIco, PinIco, SearchIco } from '../assets';


const Navbar = () => {
  const [dropdownActive, setDropdownActive] = useState(false)

  const GoToCartIco = ({isBurgerMenu=false,size="2.5rem"}) => (
    // max-w-[2.8rem] max-h-[2.8rem] aspect-square
    <div id="cart" className={"min-w-max w-["+size+"] max-w-[2.8rem] aspect-square  sm:flex md:flex lg:flex"}>
      <Link to="/cart"> <CartIco isBurgerMenu={isBurgerMenu} isCartBtn={true} /> </Link> 
    </div>
    
  )
  const GoToAvatarIco = ({size})=> (
    <Link to="/history"> 
      <AvatarIco  size={size}  />
    </Link> 
  )
  
  return (
    //  md:items-center
    
    <nav className=" w-full h-full flex justify-center gap-2 items-start  lg:items-center xl:items-center ">
      <div id="navbar_left__wrapper" className=" w-full block md:block  lg:gap-6 lg:flex lg:flex-row xl:flex xl:flex-row justify-start items-center transition-all">
        <div id="logo_location" className="min-w-max w-full lg:w-auto xl:auto flex justify-start  p-4 gap-8">
          <div id="logo" className="text-[2.4rem] leading-10 font-raleway font-bold">
            <Link to="/" > React </Link> 
          </div>
          <div id="address" className="flex items-center justify-between">
            <PinIco />
            <h2 className="hidden md:flex lg:flex">Александровск-Са...</h2>
          </div>
        </div>
        <div id="search_field_wrapper" className="w-full lg:min-w-[16rem] xl:min-w-[16rem]  flex justify-center items-center transition-all">
          <div id="search_field" className=" w-auto  min-w-[12rem]  h-[2.8rem]  flex justify-between border-[1px] rounded-3xl p-[1px]">
            <input type="text" name="search" id="" className="w-full  rounded-3xl bg-transparent px-2  text-black focus:outline-none" />
            <button id="search_btn" className="w-[6rem] rounded-3xl m-[0.05rem] px-2 bg-[#F0F4FB] flex justify-center items-center">
              <SearchIco />
            </button>
          </div>
        </div>
        
      </div>
      <div id="navbar_right__wrapper" className="  h-full flex md:items-start md:justify-end   lg:m-0 lg:p-0 lg:items-center lg:justify-center xl:m-0 xl:p-0 xl:items-center xl:justify-center">
        <div id="user_content" className="hidden w-[7rem] h-max md:w-[8rem] lg:w-[8rem] lg:p-0 xl:w-[8rem] xl:p-0 md:flex lg:flex xl:flex  pt-4    justify-around items-center">
          <GoToCartIco size={'2.1rem'}/>
          <GoToAvatarIco size={'2.4rem'}/>
        </div>
      </div>
      
      
    </nav>
    
    
  )
}

export default Navbar