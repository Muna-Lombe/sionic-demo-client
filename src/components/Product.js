import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { CartIco, BasketIco } from '../assets';
import IMG from '../assets/images';

// assets

import { cartItemAdded } from '../js/slices/cart/cartSlice';

import CategoryTag from './CategoryTag';

const Product = ({id,product}) => {
  const [isMobile, setIsMobile] = useState(document.readyState === 'complete' ? window.innerWidth < 720 : false)
  // let isMobile = document.readyState === 'complete' ? window.innerWidth < 720 : false
  let img = new IMG()
  const dispatch = useDispatch()
  const categoryTags = product.category_tags

  const discountTag = (disc,old_price)=>(
      <>
        <h4 id="old_price" className="text-[#8D8D8E] text-s line-through font-extralight  text-[0.8rem] md:text-[1.3rem] lg:text-[1.3rem] xl:text-[1.3rem]">
          {old_price+'₽'}
        </h4>
        <h4 id="discount" className="text-[#FF2D87] font-semibold  text-[0.8rem] md:text-[1.3rem] lg:text-[1.3rem] xl:text-[1.3rem]">
          {'-'+disc+'%'}
        </h4>
      </>
  )
  

  const handleAddToCart=(product)=>{
    dispatch(cartItemAdded({...product}))
  }
  return (
    // width={'180'} height={'150'}
    // md:m-w-[14rem] lg:m-w-[14rem] xl:m-w-[14rem]
    // md:w-[14rem] lg:w-[14rem] xl:w-[14rem]
    // md:h-[21rem] lg:h-[21rem] xl:h-[21rem]
    <div id={"product_card"+id} className="min-w-[8rem] w-full max-w-[12rem] md:max-w-[14rem] lg:max-w-[14rem] xl:max-w-[14rem] h-[14rem] md:h-[24rem] lg:h-[24rem] xl:h-[24rem] p-2 flex flex-nowrap  flex-col gap-y-1 bg-white shadow-md border-t border-gray-200 rounded-md font-raleway ">
      <div id="product_header" className="w-[100%] h-[50%] m-1 relative justify-center items-center  ">
        <div id="product_image" className="flex justify-center items-center" >
          <img className="w-[6rem] md:w-full lg:w-full xl:w-full aspect-square object-contain"  src={img[product.img_path_id]} alt="prd"  />
        </div>
        <div id="product_tag" className=" w-[90%] absolute bottom-0 md:bottom-5 lg:bottom-5 xl:bottom-5 transition-all flex flex-row overflow-x-scroll tag cursor-pointer">
          {
            categoryTags.map((tag,idx)=>{
              return <CategoryTag key={idx} id={tag[0]} text={tag[1]} />
            })
          }
          
        </div>
      </div>
      <div id="product_content" className=" relative w-full h-[70%] flex flex-wrap md:flex-col lg:flex-col xl:flex-col justify-between gap-2 ">
        <div id="name_store_price__wrapper" className=" w-full  h-max flex flex-col justify-between">
          <div id="name_store__wrapper" className="w-full h-full flex flex-col justify-between">
            <h4 id='product_name' className=" text-[#2D2D2F] text-[1rem] font-normal">
              {product.name.length > 12 ? product.name.slice(0,12)+'...' : product.name}
            </h4>
            <h1 id='store_name' className="w-full flex justify-end text-[#8f8f91] text-sm font-[600]">
              {product.store.name.length > 12 ? product.store.name.slice(0,12)+'...' : product.store.name}
              
            </h1>
          </div>
          <h2 id="product_price" className=" text-[#2967FF] text-[0.8rem] md:text-[1.3rem] lg:text-[1.3rem] xl:text-[1.3rem] font-semibold">
            {'от '+product.price+' ₽'}
          </h2>
        </div>
        
        
        <div id="discounted_price" className="w-max h-auto flex  pr-2 justify-between items-center gap-4  ">
          
          {product.isDiscounted[0] === true
            ?  
            discountTag(product.isDiscounted[1],product.isDiscounted[2])
            : ''
          }
          
        </div>
        {/* <Link to="/cart" > */}
          <button 
            id="add_to_cart_btn" 
            // absolute
            //   bottom-0
            //   left-[7.1rem]
            //   float-right
            //   md:relative
            //   lg:relative
            //   xl:relative
            //   md:left-[0rem]
            //   lg:left-[0rem]
            //   xl:left-[0rem]
            className={
              `
              w-max
              aspect-square
              md:w-full
              md:h-[2.7rem] 
              lg:w-full
              lg:h-[2.7rem]
              xl:w-full
              xl:h-[2.7rem]
              md:border-[1px] md:border-[#2967FF] md:rounded-3xl
              lg:border-[1px] lg:border-[#2967FF] lg:rounded-3xl
              xl:border-[1px] xl:border-[#2967FF] xl:rounded-3xl 
              py-[0.5px] px-1
              md:py-1 md:px-4
              lg:py-1 lg:px-4
              xl:py-1 xl:px-4
              text-sm 
              text-[#2967FF] 
              active:bg-[#2967FF] 
              active:text-[#ffffff]
              font-raleway
              font-[600]
              text-center
              
            `}
            onClick={()=> handleAddToCart({id,product})}
          >
             <span className='md:hidden lg:hidden xl:hidden'>
                <BasketIco isBurgerMenu={false} />
              </span>
              <span className='hidden md:flex lg:flex xl:flex justify-center text-center'>
                Добавить в корзину
              </span> 
          </button>
        {/* </Link>   */}
      </div>
    </div>
  )
}

export default Product;
