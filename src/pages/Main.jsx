import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { Product,CategoryTag, NoItems } from '../components'
import { filteredProductsFromModel, categories } from '../orm/selectors';
const Main = () => {
    let cats = useSelector(categories)
    let products = useSelector(filteredProductsFromModel([]))
    const wait=(fn)=>{
      setTimeout(() => {
        
      }, 500);
      return fn
    }
  const bigScreens = "grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] gap-8"
  const smallScreens = "grid-cols-[repeat(auto-fit,minmax(10rem,12rem))] gap-2"
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <div id="products_list" className="w-full flex flex-col">
              <div id="products_list__header" className="m-3 w-auto flex flex-col md:flex-row lg:flex-row xl:flex-row justify-start gap-2  items-baseline ">
                <h3 className=" text-2xl text-black  font-raleway font-[700]">{"Категории товаров"}</h3>
                <h4 className="text-xs text-[#2967FF] flex items-baseline">{"Настройки"}</h4>
            </div>
            <div id="product_tags" className=" w-full flex flex-row flex-nowrap overflow-clip" >
                <CategoryTag  borderId={'type_clear'} text={'clear'} />
                <div className="scrollable_product_tags flex flex-row overflow-x-scroll tag">
                  {
                    
                    cats.map((tag,idx)=>{
                        return <CategoryTag key={idx} borderId={tag.id%6||3} id={tag.id} text={tag.name} />
                    })
                    
                  }
                </div>
                
            </div>
          
          <div id="mainbar__content" className={"w-auto h-[rem] p-2 grid grid-flow-row-dense "+ smallScreens+" greater-than-md:"+bigScreens+"  overflow-x-scroll scroll-smooth justify-center  transition-all  tag"}>
                {
                    products.length
                    ? products.map((i)=>(<Product key={i.id} product={i} isSearchOrMain />))
                    : <>
                          {
                            new Array(6).fill().map((i, x) => <Product key={x} noPrd={"true"} />)     
                          }
                          {/* <NoItems /> */}
                            
                      </>
                }   
            </div>
        </div>
      </Suspense>
    </>
    
  )
}

export default Main