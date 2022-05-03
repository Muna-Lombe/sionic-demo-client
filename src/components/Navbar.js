import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// assets
import { AvatarIco, CartIco, PinIco, SearchIco } from '../assets';


const Navbar = () => {
  const [dropdownActive, setDropdownActive] = useState(false)

  const GoToCartIco = ({isBurgerMenu=false,size="2.5rem"}) => (
    // max-w-[2.8rem] max-h-[2.8rem] aspect-square
    <div id="cart" className={"min-w-max w-["+size+"] max-w-[2.8rem] aspect-square  sm:flex md:flex lg:flex"}>
      <Link to="/cart"> <CartIco isBurgerMenu={isBurgerMenu} /> </Link> 
    </div>
    
  )
  const GoToAvatarIco = ({size})=> (
    <Link to="/history"> 
      <AvatarIco  size={size}  />
    </Link> 
  )
  const MenuDropDown = () => {
    return(
      <div id="dropdown_menu" className=" absolute top-12 right-0 bottom-0 m-auto p-1 flex flex-col gap-1 bg-white ">
        <GoToCartIco isBurgerMenu={dropdownActive} />
        <GoToAvatarIco size={"1.6rem"} />
      </div>

      )
  }


  useEffect(() => {
    if(document.readyState=== 'complete'){
      console.log('ready waiting...')
      const burgerMenu = document.getElementById('burger_menu')
      window.addEventListener('resize', (e)=> {
        setDropdownActive(false)
      })

      burgerMenu.addEventListener('mouseout', (e)=>{
        setDropdownActive(false)
      })
    }
  
    
  }, [])
  
  return (
    //  md:items-center
    
    <nav className="relative w-full h-full flex justify-around gap-2 items-start  lg:items-center xl:items-center ">
      <div id="navbar_left__wrapper" className="relative w-auto block md:block  lg:flex lg:flex-row xl:flex xl:flex-row justify-start items-center">
        <div id="logo_location" className=" flex justify-start  p-4 gap-8">
          <div id="logo" className="text-[2.4rem] leading-10 font-raleway font-bold">
            <Link to="/" > React </Link> 
          </div>
          <div id="address" className="flex items-center justify-between">
            <PinIco />
            <h2 className="hidden md:flex lg:flex">Александровск-Са...</h2>
          </div>
        </div>
        <div id="search_field_wrapper" className=" lg:w-max xl:w-max flex justify-center items-center">
          <div id="search_field" className=" w-auto  min-w-[12rem] max-w-[22rem] h-[2.8rem] ml-[9rem] flex justify-between border-[1px] rounded-3xl p-[1px]">
            <input type="text" name="search" id="" className="w-full  rounded-3xl bg-transparent px-2  text-black focus:outline-none" />
            <button id="search_btn" className="w-[6rem] rounded-3xl m-[0.05rem] px-2 bg-[#F0F4FB] flex justify-center items-center">
              <SearchIco />
            </button>
          </div>
        </div>
        
      </div>
      <div id="navbar_right__wrapper" className=" relative h-full flex md:items-start md:justify-end   lg:m-0 lg:p-0 lg:items-center lg:justify-center xl:m-0 xl:p-0 xl:items-center xl:justify-center">
        <div id="user_content" className="hidden w-[7rem] h-max md:w-[8rem] lg:w-[8rem] lg:p-0 xl:w-[8rem] xl:p-0 lg:flex xl:flex  pt-4    justify-around items-center">
          <GoToCartIco size={'2.1rem'}/>
          <GoToAvatarIco size={'2.4rem'}/>
        </div>
        <div 
          id="burger_menu"
          // h-[8rem]
          className="hidden md:flex md:items-start md:pt-4  lg:hidden xl:hidden cursor-pointer "
          onFocus={()=>{return console.log('hi')}}
          onClick={()=>setDropdownActive((prevState) => !prevState)}
          
        >
          <svg xmlns="http://www.w3.org/2000/svg" aria-hidden="true" role="img" width="2rem" height="2rem" preserveAspectRatio="xMidYMid meet" viewBox="0 0 16 16">
            <path fill="none" stroke="black" strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.75 12.25h10.5m-10.5-4h10.5m-10.5-4h10.5"/>
          </svg>
        </div>
        {dropdownActive ? <MenuDropDown/> : null}
      </div>
      
      
    </nav>
    
    
  )
}

export default Navbar