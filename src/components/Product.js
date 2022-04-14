import React, { useState } from 'react'
import { Link } from "react-router-dom";

//assests
import image13_1 from '../assets/images/image13_1.png';
import image13_2 from '../assets/images/image13_2.png';
import image13_3 from '../assets/images/image13_3.png';
import image13_4 from '../assets/images/image13_4.png';
import image13_5 from '../assets/images/image13_5.png';
import image13_6 from '../assets/images/image13_6.png';
import image13_7 from '../assets/images/image13_7.png';

import CategoryTag from './CategoryTag';

const Product = ({product}) => {
 const [img,setImg] = useState({
   1:image13_1,
   2:image13_2,
   3:image13_3,
   4:image13_4,
   5:image13_5,
   6:image13_6,
   7:image13_7
 })
  
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
  const categoryTags = product.category_tags
  return (
    <div id="product_card" className="w-[16rem] h-[21rem] flex flex-col gap-y-1 font-raleway ">
      <div id="product_header" className="w-[100%] h-[50%] m-1 relative justify-center items-center  ">
        <div id="product_image" className="flex justify-center items-center" >
          <img className="" width={'180'} height={'150'} src={img[product.img_path_id] ? img[product.img_path_id] :img[1]} alt="prd"  />
        </div>
        <div id="product_tag" className=" w-full absolute bottom-5 transition-all flex flex-row overflow-x-scroll tag cursor-pointer"  onClick={()=>(console.log('cliked'))}>
          {
            categoryTags.map((tag,idx)=>{
              return <CategoryTag key={idx} id={tag[0]} text={tag[1]} />
            })
          }
          
        </div>
      </div>
      <div id="product_content" className="w-full h-[50%] flex flex-col justify-between ">
        <h4 id='product_name' className=" text-[#2D2D2F] text-[1rem] font-normal">
          {product.name.length > 41 ? product.name.slice(0,41)+'...' : product.name}
        </h4>
        <h2 id="product_price" className=" text-[#2967FF] text-[1.3rem] font-semibold">
          {'от '+product.price+' ₽'}
        </h2>
        
        <div id="discounted_price" className="w-[60%] flex pr-2 justify-between ">
          {product.isDiscounted[0] === true
            ?  
            discountTag(product.isDiscounted[1],product.isDiscounted[2])
            : ''
          }
          
        </div>
        <Link to="/cart" >
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
          >
             Добавить в корзину 
            
          </button>
        </Link>  
      </div>
    </div>
  )
}

export default Product;
