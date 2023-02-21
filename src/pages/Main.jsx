import React, { Suspense } from 'react'
import { Link, Outlet } from "react-router-dom";
import { useSelector } from 'react-redux'
import { Product,CategoryTag, NoItems } from '../components'
import {  filterProducts} from '../js/slices/products/productsSlice'
import { filteredProductsFromModel, filteredCategoriesFromModel } from '../orm/selectors';
import { selectCatIds, selectCurCatId } from '../js/slices/filters/categoriesSlice';
const Main = () => {
    let curCatIds = useSelector(state => state.categories.curCatIds)
    let products = useSelector(filteredProductsFromModel(curCatIds))//filterProducts())
    // console.log("curCatId", curCatId)
    let cats = useSelector(filteredCategoriesFromModel([]))//filterProducts())
    // console.log("...", products)
  const bigScreens = "grid-cols-[repeat(auto-fit,minmax(11rem,1fr))] gap-8"
  const smallScreens = "grid-cols-[repeat(auto-fit,minmax(7rem,1fr))] gap-6"
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <div id="products_list" className="w-full flex flex-col">
              <div id="products_list__header" className="m-3 w-auto flex flex-col md:flex-row lg:flex-row xl:flex-row justify-start gap-2  items-baseline ">
                <h3 className=" text-2xl text-black  font-raleway font-[700]">Категории товаров</h3>
                <h4 className="text-xs text-[#2967FF] flex items-baseline">Настройки</h4>
            </div>
            <div id="product_tags" className=" w-auto max-w-[550px] md:max-w-3xl lg:max-w-4xl xl:max-w-6xl h-max py-1 mx-2 transition-all flex flex-row overflow-x-scroll tag cursor-pointer" >
                <Link to={"/orm-reader"}>🔮</Link>
                <CategoryTag  borderId={'type_clear'} text={'clear'} />
                {
                    
                    cats.map((tag,idx)=>{
                        return <CategoryTag key={idx} borderId={tag.id%6||3} id={tag.id} text={tag.name} />
                    })
                    
                }
            </div>
          {/* flex flex-row flex-wrap */}
              {/* grid grid-flow-rows grid-cols-[repeat(auto-fit,minmax(9rem,1fr))]  md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] */}
          <div id="mainbar__content" className={"w-auto h-[rem] p-2 grid grid-flow-row-dense "+ smallScreens+" greater-than-sm:"+bigScreens+"  overflow-x-scroll scroll-smooth justify-center  transition-all  tag"}>
                {
                    products.length
                    ? products.map((i)=>(<Product key={i.id} id={i.id} product={i.product} isSearchOrMain />))
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