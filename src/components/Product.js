import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import IMG from '../assets/images';

// assets

import { cartItemAdded } from '../js/slices/cart/cartSlice';

import CategoryTag from './CategoryTag';

const Product = ({id,product}) => {
  let img = new IMG()
  const dispatch = useDispatch()
  const categoryTags = product.category_tags

  const discountTag = (disc,old_price)=>(
      <>
        <h4 id="old_price" className="text-[#8D8D8E] text-s line-through font-extralight">
          {old_price+'₽'}
        </h4>
        <h4 id="discount" className="text-[#FF2D87] font-semibold text-s">
          {'-'+disc+'%'}
        </h4>
      </>
  )
  

  const handleAddToCart=(productId)=>{
    dispatch(cartItemAdded({id: productId}))
  }
  return (
    <div id={"product_card"+id} className="w-[14rem] h-[21rem]  flex flex-col gap-y-1 font-raleway ">
      <div id="product_header" className="w-[100%] h-[50%] m-1 relative justify-center items-center  ">
        <div id="product_image" className="flex justify-center items-center" >
          <img className="" width={'180'} height={'150'} src={img[product.img_path_id]} alt="prd"  />
        </div>
        <div id="product_tag" className=" w-[90%] absolute bottom-5 transition-all flex flex-row overflow-x-scroll tag cursor-pointer">
          {
            categoryTags.map((tag,idx)=>{
              return <CategoryTag key={idx} id={tag[0]} text={tag[1]} />
            })
          }
          
        </div>
      </div>
      <div id="product_content" className="w-full h-[50%] flex flex-col justify-between ">
        <div id="name_price" className="h-[50%] flex flex-col justify-between">
          <h4 id='product_name' className=" text-[#2D2D2F] text-[1rem] font-normal">
            {product.name.length > 41 ? product.name.slice(0,41)+'...' : product.name}
          </h4>
          <h2 id="product_price" className=" text-[#2967FF] text-[1.3rem] font-semibold">
            {'от '+product.price+' ₽'}
          </h2>
        </div>
        
        
        <div id="discounted_price" className="w-max flex pr-2 justify-between gap-4 ">
          {product.isDiscounted[0] === true
            ?  
            discountTag(product.isDiscounted[1],product.isDiscounted[2])
            : ''
          }
          
        </div>
        {/* <Link to="/cart" > */}
          <button 
            id="add_to_cart_btn" 
            className={`
              w-full
              h-[2.7rem] 
              border-[1px] 
              border-[#2967FF] 
              rounded-3xl 
              py-1 
              px-4 
              text-sm 
              text-[#2967FF] 
              active:bg-[#2967FF] 
              active:text-[#ffffff]
              font-raleway
              font-[600]
            `}
            onClick={()=> handleAddToCart(id)}
          >
            Добавить в корзину 
            
          </button>
        {/* </Link>   */}
      </div>
    </div>
  )
}

export default Product;
