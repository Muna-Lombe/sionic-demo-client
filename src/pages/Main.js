import React from 'react'
import { useSelector } from 'react-redux'
import { Product,CategoryTag } from '../components'
import { selectProducts } from '../js/slices/products/productsSlice'


const Main = () => {
    const categoryTags = [
        [6, 'День Рождения Гриши'],
        [5, 'Подарок коллегам'],
        [4, 'Подарок'],
        [5, 'Мишка'],
        [3, 'Мартышка'],
        [2, 'Игрушка']
      ]
    const count = useSelector(selectProducts)
    console.log('products', count)
    const tags = useSelector(state => state.categories.entities)
    console.log(tags)
  return (
    <div id="products_list" className="w-full flex flex-col m-1">
        <div id="products_list__header" className="w-[50%] flex justify-between m-3 items-baseline ">
            <h3 className=" text-2xl text-black  font-raleway font-[700]">Категории товаров</h3>
            <h4 className="text-xs text-[#2967FF] flex items-baseline">Настройки</h4>
        </div>
        <div id="product_tags" className=" w-auto max-w-[550px] h-max py-1 mx-2 flex flex-row my-3 overflow-hidden tag  " >
            {
                // Object.values(tags).map((tag))
                categoryTags.map((tag,idx)=>{
                    return <CategoryTag key={idx} id={tag[0]} text={tag[1]}/>
                })
                
            }
        </div>
        {/*w-[calc(100vw-30rem)] lg:grid-cols-4 md:grid-cols-3 sm:grid-cols-2 */}
        <div id="mainbar__content" className="w-auto h-[rem] mx-2 px-2 grid grid-flow-rows grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]  md:grid-cols-[repeat(auto-fit,minmax(13rem,1fr))] lg:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))] xl:grid-cols-[repeat(auto-fit,minmax(14rem,1fr))]  overflow-x-scroll scroll-smooth gap-[16px] justify-center justify-items-center  tag">
            {
                count.map((i)=>(<Product key={i.id} id={i.id} product={i.product} />))
            }   
        </div>
  </div>
    
  )
}

export default Main