import React from 'react'
import { Product,CategoryTag } from '../components'


const Main = ({categoryTags}) => {
  return (
    <div id="categories" className="w-full flex flex-col m-1">
        <div id="category_header" className="w-[50%] flex justify-between m-3 items-baseline ">
            <h3 className=" text-2xl text-black  font-raleway font-[700]">Категории товаров</h3>
            <h4 className="text-xs text-[#2967FF] flex items-baseline">Настройки</h4>
        </div>
        <div id="product_tags" className=" w-full flex flex-row my-3 overflow-x-scroll tag  " >
            {
                categoryTags.map((tag)=>{
                return <CategoryTag color={tag[1]} tag={tag[0]}/>
                })
                
            }
        </div>
        {/* lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 */}
        <div id="mainbar__content" className=" h-full mx-2 px-2 grid  grid-flow-rows grid-cols-[repeat(auto-fit,minmax(18rem,1fr))]  scroll-smooth gap-[1.7rem] justify-items-center">
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
            <Product categoryTags={categoryTags} />
        </div>
  </div>
    
  )
}

export default Main