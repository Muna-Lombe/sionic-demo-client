import React from 'react'

//assests
import productImage from '../assets/images/image13.png';
import CategoryTag from './CategoryTag';

const Product = ({categoryTags}) => {
  // , Мартышка, Мишка
  
  const discountTag = ({color='',tag})=>(
    <div id={`tag ${color}`}>
      <h2>

      </h2>
    </div>
  )
  
  return (
    <div id="product_card" className="w-[16rem] h-[19rem] font-raleway ">
      <div id="product_header" className="w-[100%] h-[50%] m-1 relative ">
        <div id="product_image" >
          <img className="w-full h-full object-cover" src={productImage} alt="prd"  />
        </div>
        <div id="product_tag" className=" w-full absolute bottom-5 transition-all flex flex-row overflow-x-scroll tag cursor-pointer"  onClick={()=>(console.log('cliked'))}>
          {
            categoryTags.map((tag,idx)=>{
              return <CategoryTag key={idx} color={tag[1]} tag={tag[0]} />
            })
          }
          
        </div>
      </div>
      <div id="product_content" className="w-full h-[50%] ">
        <h4 id='product_name' className=" text-[#2D2D2F] text-[1rem] font-normal">
          Длинное название товара в одну строчку п...
        </h4>
        <h2 id="product_price" className=" text-[#2967FF] text-[1.3rem] font-semibold">
          от 350 000 ₽
        </h2>
        <div id="discounted_price" className="w-[60%] flex pr-2 justify-between ">
          <h4 id="old_price" className="text-[#8D8D8E] text-s line-through font-extralight">
            450 500 ₽
          </h4>
          <h4 id="discount" className="text-[#FF2D87] font-semibold text-s">
            -10%
          </h4>
        </div>
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
      </div>
    </div>
  )
}

export default Product;
