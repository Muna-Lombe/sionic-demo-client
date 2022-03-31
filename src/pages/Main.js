import React from 'react'
import { Product,CategoryTag } from '../components'


const Main = ({categoryTags}) => {
  return (
    <div id="products_list" className="w-full  flex flex-col m-1">
        <div id="products_list__header" className="w-[50%] flex justify-between m-3 items-baseline ">
            <h3 className=" text-2xl text-black  font-raleway font-[700]">Категории товаров</h3>
            <h4 className="text-xs text-[#2967FF] flex items-baseline">Настройки</h4>
        </div>
        <div id="product_tags" className=" w-full h-max py-1 flex flex-row my-3 overflow-x-scroll tag  " >
            {
                categoryTags.map((tag,idx)=>{
                return <CategoryTag key={idx} color={tag[1]} tag={tag[0]}/>
                })
                
            }
        </div>
        {/* lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 */}
        <div id="mainbar__content" className="w-[calc(100vw-30rem)] h-full mx-2 px-2 grid  grid-flow-rows grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]  scroll-smooth gap-[1.7rem] justify-items-center">
            {
                [1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16].map((i,idx)=>(<Product key={idx} categoryTags={categoryTags} />))
            }
            
            
        </div>
  </div>
    
  )
}

export default Main