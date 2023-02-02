import React, { useEffect, useState } from 'react';
import { Link } from "react-router-dom";

// assets
import { AvatarIco, CartIco, PinIco, SearchIco } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductNamesThatMatch, setSearchedProductId } from '../js/slices/products/productsSlice';
import { useMemo } from 'react';
const Navbar = () => {
  // const [dropdownActive, setDropdownActive] = useState(false)
  // const [showSuggestions, setShowSuggestions] = useState([])
  const prodNames = useSelector(selectProductNamesThatMatch());
  const dispatch = useDispatch();
  const searchProductText = "false"
  const memoizedId = useMemo((id) => id, [])
  // memoizedId(id)
  const handleClick =(e)=>{
    e.stopPropagation()
    dispatch( setSearchedProductId(e.target.value))
    const inp = document.querySelector('input.search')
    // console.log(inp)
    // inp.value = 
    inp.value = prodNames.find((i)=> i.name === e.target.value).name
  }

  const handleBlur = (e, type) =>{
    console.log("blur", e.target.parentElement.parentElement.id)
    console.log("blur", e.currentTarget.id)
    // console.log("blur", e.relatedTarget.id)
    e.stopPropagation()
    
    const hideFunc = () => {
      const optgrp = document.querySelector("optgroup");
      const toggle = (classList, token) => ({
        on: () => {
          classList.replace(token.curr, token.tar)
        },
        off: () => {
          classList.replace(token.tar, token.curr)
        }
      });
      optgrp.childNodes.forEach(i => optgrp.removeChild(i));
      const toggleBoarder = toggle(optgrp.previousElementSibling.classList, { curr: "rounded-3xl", tar: "rounded-t-3xl" });
      const toggleBoarder2 = toggle(e.target.parentElement.parentElement.classList, { curr: "border-green-500", tar: "border-red-500" });
      const toggleVisibility = toggle(optgrp.classList, { curr: "invisible", tar: "visible" });
      toggleBoarder.off()
      toggleVisibility.off()
      toggleBoarder2.on()
    }
    // let hideTimer = setTimeout(() => {
    //   hideFunc()
    // }, 500);
    // // hideTimer
    // clearTimeout(hideTimer)
    // if (!e.currentTarget.contains(e.target)){
      
    // }
    
  }

  const handleChange = (e) => {
    e.preventDefault()
    const suggestions = ((str) =>
      str.toString().length > 1 ? prodNames.filter(i => 
        i.name.toLowerCase().includes(str.toLowerCase())
        ) : []

    );
    const optgrp = document.querySelector("optgroup");
    const toggle=(classList, token) =>({
      on: ()=>{
        classList.replace(token.curr, token.tar)
      }, 
      off:()=>{
        classList.replace(token.tar, token.curr)
      }
    });
   
    const toggleBoarder = toggle(optgrp.previousElementSibling.classList, { curr: "rounded-3xl", tar: "rounded-t-3xl" });
    const toggleVisibility = toggle(optgrp.classList, { curr: "invisible", tar: "visible" });
    
    optgrp.childNodes.forEach(i=>optgrp.removeChild(i));
    // console.log("length:", suggestions(e.target.value).length);
    if(suggestions(e.target.value).length > 0){
      
      toggleBoarder.on()
      toggleVisibility.on()
      
    }else{
      toggleBoarder.off()
      toggleVisibility.off()
    };
    // document.createElement('option').class
    suggestions(e.target.value)?.map((prod, i) =>{
      const optElem = document.createElement('option')
      optElem.className = "hover:text-black hover:bg-slate-200";
      optElem.value = prod.name
      optElem.innerText = prod.name.length > 39 ? prod.name.slice(0, 36) + "..." : prod.name
      optElem.key = i
      optElem.addEventListener("click", (ev) => { handleClick(ev) })
      optgrp.insertAdjacentElement("beforeend", optElem)
      // optgrp.insertAdjacentHTML("beforeend", `
      //         <option key=\"${i}\" value=\"${prod.id.toString()}\" class=\"hover:text-black hover:bg-slate-200\">
      //           ${prod.name.length > 39 ? prod.name.slice(0, 36) + "..." : prod.name}
      //         </option>
      //     `)
          
    }
      )//)
  };
  const GoToCartIco = ({isBurgerMenu=false,size="2.5rem"}) => (
   
      <Link id='cart' to="/cart"> <CartIco size={size} isBurgerMenu={isBurgerMenu} isCartBtn={true} /> </Link> 
    
    
  )
  const GoToAvatarIco = ({size})=> (
    <Link to="/history"> 
      <AvatarIco  size={size}  />
    </Link> 
  )
  const SearchField =({})=>{
    
    return(
      <div id="search_field" className="realtive w-[22rem] h-[2.8rem] max-h-[3.2rem] flex justify-between border-[1px] rounded-3xl">
        {/* <div className="search-input relative w-full max-w-[22rem]  flex   justify-between p-[1px]"> */}
          <input type="text"  name="search" placeholder={searchProductText||""} onChange={(e) => handleChange(e)} className=" search autofill:selectionbg-white w-full rounded-bl-3xl rounded-tl-3xl bg-transparent px-2  text-black focus:outline-none" />
          <button id="search_btn" className=" top-0 right-0 w-[6rem] h-full rounded-3xl m-[0.05rem] px-2 bg-[#F0F4FB] flex justify-center items-center">
            <SearchIco />
          </button>
        {/* </div> */}
      </div>
    )
  }
  return (
    //  md:items-center
    
    <nav className=" relative w-full h-full flex justify-center gap-2 items-start  lg:items-center xl:items-center ">
      <div id="navbar_left__wrapper" className=" w-full block md:block  lg:gap-6 lg:flex lg:flex-row xl:flex xl:flex-row justify-start items-center transition-all">
        <div id="logo_location" className="min-w-max w-full lg:w-auto xl:auto flex justify-start  p-4 gap-8">
          <div id="logo" className="text-[2.4rem] leading-10 font-raleway font-bold">
            <Link to="/" > React </Link> 
          </div>
          
          <div id="address" className="flex items-center justify-between">
            <PinIco />
    
            <h2 className="hidden p-2 md:flex lg:flex"> Александровск-Са...</h2>
          </div>
        </div>
        <div id="search_field_wrapper" className="w-full max-h-14 lg:min-w-[16rem] xl:min-w-[16rem] py-2 flex flex-col justify-start items-center transition-all">
          <div id="search_field_box" onBlur={(e) => handleBlur(e, "blur")} className="border border-green-500 rounded-3xl">
            <SearchField/>
            <optgroup name="search-suggestions" id="search-suggestions" className="w-full max-w-[22rem]  p-2 overflow-ellipsis border bg-black opacity-70 rounded-b-3xl text-white cursor-pointer invisible">

            </optgroup>
          </div>
          
        </div>
      </div>
      <div id="navbar_right__wrapper" className=" absolute right-0   h-full flex md:items-start md:justify-end   lg:m-0 lg:p-0 lg:items-center lg:justify-center xl:m-0 xl:p-0 xl:items-center xl:justify-center">
        <div id="user_content" className="hidden w-[7rem] h-max md:w-[8rem] lg:w-[8rem] lg:p-0 xl:w-[8rem] xl:p-0 xs:flex sm:flex md:flex lg:flex xl:flex  pt-4    justify-around items-center">
          <GoToCartIco size={'1.5rem'}/>
          <GoToAvatarIco size={'1.5rem'}/>
        </div>
      </div>
      
      
    </nav>
    
    
  )
}

export default Navbar