import React, { useState } from 'react'
import { useDispatch } from 'react-redux';
import { Link } from "react-router-dom";
import { CartIco, BasketIco } from '../assets';
import IMG, { image1_1, imagepath } from '../assets/images';
import no_product_img from '../assets/images/no_product_img.png'
// assets

import { cartItemAdded } from '../js/slices/cart/cartSlice';

import CategoryTag from './CategoryTag';
import ShowProduct from '../pages/ShowProduct';


const Product = ({id,product,noPrd, isSearchOrMain}) => {
  const [isMobile, setIsMobile] = useState(document.readyState === 'complete' ? window.innerWidth < 720 : false)
  // let isMobile = document.readyState === 'complete' ? window.innerWidth < 720 : false
  let img = new IMG()
  const dispatch = useDispatch()
  const categoryTags = product?.category_tags || []
  const textStyle = {
    maxWidth: '100%',
    display: '-webkit-box',
    WebkitBoxOrient: 'vertical',
    WebkitLineClamp: 2,
    overflow: 'hidden',
    textOverflow: 'ellipsis',
  }
  const discountTag = (disc,old_price)=>(
      <>
        <h4 id="old_price" className="text-[#8D8D8E] line-through font-extralight  text-[1.0rem] ">
          {old_price+'₽'}
        </h4>
        <h4 id="discount" className="text-[#FF2D87] font-semibold  text-[1.0rem] ">
          {'-'+disc+'%'}
        </h4>
      </>
  )
  
  const handleAddToCart=(product)=>{
    dispatch(cartItemAdded({...product}))
  }
  
  const BuyBtn=({text="в корзину"})=>(
    <button
      id="add_to_cart_btn"
      className={` py-[3px] px-1 w-full h-max flex flex-row-reverse justify-center border-[#2967FF] rounded-lg border-[1px] stroke-blue-500`}
      onClick={() => handleAddToCart({ id, product })}
    >
      <span className=''>
        <BasketIco isBurgerMenu={false} />
      </span>
      <span className='px-1 md:flex lg:flex xl:flex   text-sm  text-[#2967FF]  active:bg-[#2967FF]  active:text-[#ffffff] font-raleway font-[600] text-center'>
        {text}
      </span>
    </button>
  )


  const Image = ({ imagepath }) => (
    <div className={"p-1 min-w-[80%] min-h-[100px] w-auto aspect-square flex items-end  " + (noPrd ? " min-w-[100px] min-h-[100px] border rounded animate-pulse " : " ")}>
        <img alt="gallery" className="w-full object-cover object-center z-0" src={imagepath} />
      </div>
  
    )
  
  return (
    // width={'180'} height={'150'}
    // md:m-w-[14rem] lg:m-w-[14rem] xl:m-w-[14rem]
    // md:w-[14rem] lg:w-[14rem] xl:w-[14rem]
    // md:h-[21rem] lg:h-[21rem] xl:h-[21rem]
    // min - w - [8rem] w - full max - w - [12rem] md: max - w - [14rem] lg: max - w - [14rem] xl: max - w - [14rem] h - [14rem] md: h - [24rem] lg: h - [24rem] xl: h - [24rem]
    <div id={"product_card_"+id} className={(noPrd ? " ": " ") + " p-2 min-w-[8rem] w-auto max-w-[15rem] h-full max-h-[23rem] flex flex-nowrap  flex-col justify-between gap-2 bg-white shadow-md border-t border-gray-200 rounded-md font-raleway "}>
      <div id="product_header" className="relative w-[100%] h-[50%] my-1  justify-center items-end  ">
        <div id="product_image" className="flex  justify-center items-end" >
          {
            noPrd
              ? <Image imagepath={no_product_img}/>
              : <Image imagepath={imagepath(product?.images[0]?.id) || img[product?.img_path_id] || no_product_img} />
          }
          
          {/* <img className="w-[6rem] md:w-full lg:w-full xl:w-full aspect-square object-contain"  src={imagepath(product.images[0].id)|| img[product.img_path_id] || no_product_img} alt="prd"  /> */}
        </div>
        <div id="product_tag" className=" w-[90%] absolute bottom-0 md:bottom-5 lg:bottom-5 xl:bottom-5 transition-all flex flex-row overflow-x-scroll tag cursor-pointer z-0">
          {
            (categoryTags||new Array(6).fill(''))?.map((tag,idx)=>{
              return <CategoryTag key={idx} borderId={tag[0]} text={tag[1]} noPrd />
            })
          }
          
        </div>
        {
          isSearchOrMain ?
            <h1 id='store_name' className="absolute left-0 top-0 py-1  px-2 w-max  flex justify-end rounded-[4px] bg-slate-500 text-white [#8f8f91] text-sm font-[600]">
              {
                noPrd
                  ? <div className="no-prd-field w-[12rem] h-6 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
                  : <span>
                    {product?.store.name.length > 16 ? product?.store.name.slice(0, 16) + '...' : product?.store.name}
                  </span>
              }


            </h1>
            : ""

        }
      </div>
      <div id="product_content" className=" relative w-full h-[50%] flex flex-wrap xs:flex-wrap sm:flex-wrap md:flex-wrap lg:flex-col xl:flex-col justify-between gap-0 bg-white">
        <div id="name_store_price__wrapper" className=" w-full  h-max flex flex-col justify-between">
          <div id="name_store__wrapper" className="w-full h-full flex flex-col justify-between gap-1">
            <h4 id='product_name' className=" py-2 max-h-14 bg-white text-[#2D2D2F] text-base greater-than-md:text-lg hover:text-blue-400 font-medium">
              {
                noPrd
                  ? <div className="no-prd-field w-[12rem] h-6 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
                  : <Link to={"/product/" + product?.id} style={textStyle} >
                      {product?.name}
                    </Link>
              }
                
            </h4>
            {
              !isSearchOrMain
                ? <h1 id='store_name' className=" w-full  flex justify-end  text-slate-400 [#8f8f91] text-sm font-[600]">
                  {
                    noPrd
                      ? <div className="no-prd-field w-[12rem] h-6 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
                      : <span >
                        {product?.store.name.length > 16 ? product?.store.name.slice(0, 16) + '...' : product?.store.name}
                        </span>
                  }


                </h1>
                : ""
            }
          </div>
        </div>
        <h2 id="product_price" className=" text-[#2967FF] text-[1.2rem]  font-semibold">
          {
            noPrd
            ? <>
                <div className="no-prd-field w-[6rem] h-6 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
                <div className="no-prd-field w-[13rem] h-14 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
              </>
            : <>
                <span>
                  {'от ' + product.priceRange.sort((a, b) => a < b)[0] + ' ₽'}
                </span>
                <span id="discounted_price" className="w-max h-[25px] flex  pr-2 justify-between items-center gap-4  ">
                  {
                    noPrd
                      ? <span className="no-prd-field w-[12rem] h-6 border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></span>
                      : <>
                          {product.isDiscounted[0] === true
                            ? discountTag(product.isDiscounted[1],product.isDiscounted[2])
                            : ''
                          }
                        </>
                  }
                  
                </span>
              </>}
        </h2>
        
        
        {
          noPrd
            ? <div className="no-prd-field mx-auto w-[12rem] h-8  border rounded-md bg-gradient-to-tr from-slate-400 to-slate-500 animate-pulse opacity-30"></div>
            : 
              isSearchOrMain 
              ? <BuyBtn />
              : ""
            
        }
          
        
      </div>
    </div>
  )
}

export default Product;
