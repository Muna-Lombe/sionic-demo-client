import React, { Suspense, useEffect, useRef, useState } from 'react';
import { Link, Navigate, Outlet, createSearchParams, useNavigate } from "react-router-dom";

// assets
import { AvatarIco, CartIco, PinIco, SearchIco } from '../assets';
import { useDispatch, useSelector } from 'react-redux';
import { selectProductNamesThatMatch, setSearchedProductId } from '../js/slices/products/productsSlice';
import { useMemo } from 'react';
import NoItems from './NoItems';
const Navbar = () => {
  // const [dropdownActive, setDropdownActive] = useState(false)
  // const [showSuggestions, setShowSuggestions] = useState([])
  const prodNames = useSelector(selectProductNamesThatMatch());
  const dispatch = useDispatch();
  const searchProductText = prodNames[0]?.name || "" //"false"
  const ref = useRef(null)
  const goto = useNavigate()
  const handleClick =(e)=>{
    e.stopPropagation()
    dispatch( setSearchedProductId([e.target.value]))
    const inp = document.querySelector('input.search')
    // console.log(inp)
    // inp.value = 
    inp.value = prodNames.find((i)=> i.name === e.target.value).name
  }

  const handleBlur = (e, type) =>{
    // console.log(e)
    // console.log("blur target from", e.target.parentElement.id)
    // console.log("blur action owner", e.currentTarget.id)
    // // console.log("blur target to", e.relatedTarget.id)
    e?.stopPropagation()
    
    const hideSuggestions = () => {
      const optgrp = document.querySelector("optgroup");
      const toggle = (classList, token) => ({
        on: () => {
          classList.replace(token.curr, token.tar)
        },
        off: () => {
          classList.replace(token.tar, token.curr)
        }
      });
      optgrp.replaceChildren("")
     

      const toggleBoarder = toggle(optgrp.previousElementSibling.classList, { curr: "rounded-3xl", tar: "rounded-t-3xl" });
      const toggleVisibility = toggle(optgrp.classList, { curr: "hidden", tar: "visible" });
      toggleBoarder.off()
      toggleVisibility.off()
    }
    // console.log("can trigger hide", e.relatedTarget === null)
    if(e?.relatedTarget === null || !e) hideSuggestions()
  }
  
  const handleSubmit = (arr) =>{
    // console.log("submit", arr)
    dispatch(setSearchedProductId(arr[0].name ? arr.map((i)=> i.name) : arr))
    handleBlur()
    goto("/search?" + createSearchParams({ query: JSON.stringify(arr[0].name ? arr.map((i) => i.name) : arr) }))
  }
  
  const handleChange = (e) => {
    e.preventDefault()
    const suggestions = ((str) =>
      str.toString().length > 1 ? prodNames.filter(i => 
        i.name.toLowerCase().includes(str.toLowerCase())
        ) : []
    );
    // UNCOMMENT BEFORE COMMIT
    if( e.target.value.length < 1){
      dispatch(setSearchedProductId([]))
    }
    if (e.key === "Enter" && e.code === "Enter") {
      handleSubmit(suggestions(e.target.value))
      return
    }
    ///////////////////////////////////////////////
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
    const toggleVisibility = toggle(optgrp.classList, { curr: "hidden", tar: "visible" });
    
    optgrp.childNodes.forEach(i=>optgrp.removeChild(i));
    if(suggestions(e.target.value).length > 0){
      
      toggleBoarder.on()
      toggleVisibility.on()
      
    }else{
      toggleBoarder.off()
      toggleVisibility.off()
    };
    suggestions(e.target.value)?.forEach((prod, i) =>{
      const optElem = document.createElement('option')
      optElem.className = "hover:text-black hover:bg-slate-200";
      optElem.value = prod.name
      optElem.innerText = prod.name.length > 39 ? prod.name.slice(0, 36) + "..." : prod.name
      optElem.key = i
      optElem.addEventListener("click", (ev) => { handleSubmit([ev.target.innerText]) })
      optgrp.insertAdjacentElement("beforeend", optElem)  
    })
  };
  const GoToCartIco = ({isBurgerMenu=false,size="2.5rem"}) => (
   
      <Link id='cart' to="cart/"> 
        <CartIco size={size} isBurgerMenu={isBurgerMenu} isCartBtn={true} /> 
      </Link> 
  )
  
  const GoToAvatarIco = ({size})=> (
    <Link to="history/"> 
      <AvatarIco  size={size}  />
    </Link> 
  )
  const SearchField =({})=>{
    const [curtext, setCurtext] =useState("")
    const setParams = () =>{
      return createSearchParams({ query: JSON.stringify([curtext]) })
    }
    return(
      <div id="search_field" tabIndex={0} className="relative min-w-[22rem] greater-than-md:min-w-[28rem] w-auto max-w-[28rem] greater-than-md:max-w-[32rem] h-[2.8rem] max-h-[3.2rem] flex justify-between border-[1px] rounded-3xl">
        {/* <div className="search-input relative w-full max-w-[22rem]  flex   justify-between p-[1px]"> */}
          <input type="text" ref={ref}  name="search" defaultValue={curtext} placeholder={searchProductText||""} onKeyUp={(e) => {handleChange(e); setCurtext(e.target.value)}} className=" search autofill:selection bg-white w-full rounded-bl-3xl rounded-tl-3xl bg-transparent px-2  text-black focus:outline-none" />
    
          <Link to={"search?" + setParams()} onClick={() => handleBlur()} className=" top-0 right-0 w-[6rem] h-full rounded-3xl m-[0.00rem] px-2 bg-[#F0F4FB] flex justify-center items-center">
            <SearchIco />
          </Link> 
      </div>
    )
  }
  return (
    //  md:items-center
    <>
      <nav className=" relative w-full h-full flex justify-center gap-2 items-start  lg:items-center xl:items-center ">
        <div id="navbar_left__wrapper" className=" w-full block md:block  lg:gap-6 lg:flex lg:flex-row xl:flex xl:flex-row justify-start items-center transition-all">
          <div id="logo_location" className="min-w-max w-full lg:w-auto xl:auto flex justify-start  p-4 gap-8">
            <div id="logo" className="p-1 border-[4px] border-black border-spacing-2 rounded-[4px] text-[2.4rem] leading-10 font-raleway font-bold">
              <Link to="" > Katundu </Link> 
            </div>
            
            <div id="address" className="flex items-center justify-between">
              <PinIco />
      
              <h2 className="hidden p-2 md:flex lg:flex"> Александровск-Са...</h2>
            </div>
          </div>
          <div id="search_field_wrapper"  className="w-full greater-than-md:w-max max-h-14 lg:min-w-[2rem] xl:min-w-[2rem] py-2 flex flex-col justify-start items-start transition-all">
            <div id="search_field_box" className='w-full flex flex-col items-center' onBlur ={(e) => handleBlur(e, "blur")}>
              <SearchField/>
              <optgroup name="search-suggestions" tabIndex={1} id="search-suggestions" className="min-w-[22rem] greater-than-md:min-w-[28rem] w-auto max-w-[28rem] greater-than-md:max-w-[32rem]  p-2 overflow-ellipsis border bg-black opacity-70 rounded-b-3xl text-white cursor-pointer hidden">
              </optgroup>
            </div>
            
          </div>
        </div>
        <div id="navbar_right__wrapper" className=" absolute right-0   h-full flex md:items-start md:justify-end   lg:m-0 lg:p-0 lg:items-center lg:justify-center xl:m-0 xl:p-0 xl:items-center xl:justify-center">
          <div id="user_content" className="hidden pt-4 px-2 w-[7rem] h-max md:w-[8rem] lg:w-[8rem] lg:p-0 xl:w-[8rem] xl:p-0 xs:flex sm:flex md:flex lg:flex xl:flex  justify-around items-center gap-2">
            <GoToCartIco size={'1.5rem'}/>
            <GoToAvatarIco size={'1.5rem'}/>
          </div>
        </div>
      </nav>
      {/* <Suspense fallback={<NoItems/>}>
        <Outlet/>
      </Suspense> */}
    </>
    
    
  )
}

export default Navbar