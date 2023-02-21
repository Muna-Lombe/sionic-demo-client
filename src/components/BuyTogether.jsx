import { useSelector } from "react-redux"
import Product from "./Product"
import { filteredProductsFromModel } from "../orm/selectors"
import { ArrowLeft, ArrowRight } from "../assets"

const BuyTogether = ({ children }) => {

   const products = useSelector(filteredProductsFromModel([]))//.slice(0,10)

  const handleScroll = (e,reverse) => {
    e.preventDefault();
    e.stopPropagation();
    const div1 = document.querySelector(".matching-products-grid .scroll-div-1")
    const childs = div1.childNodes
   
    let s = reverse 
            ? ( Number.parseInt(div1.slot) < 1 
              ? 0 
              : (Number.parseInt(div1.slot) - 2) < 0
                ? 0
                : Number.parseInt(div1.slot) - 2
              ) 
            : (Number.parseInt(div1.slot) > childs.length - 1 )
                ? childs.length - 1 
                : (Number.parseInt(div1.slot) + 2) > childs.length - 1 
                 ? Number.parseInt(div1.slot) + 1 
                  : Number.parseInt(div1.slot) + 2
                  
    
    console.log('drag tso scroll',s)
    if (s === 0 || s === childs.length) return 0
    const nthChild = childs[s]
    
    div1.slot =  s 
    nthChild.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    })
  }
  return (
    <div className="buy-matching-products-wrapper relative w-full pt-10 px-6 flex flex-col gap-4">
      <p className="title py-2 text-2xl font-[arial font-bold ">{"Buy together"}</p>
      <div className="products-wrapper w-full flex flex-row border-y-2">
        {/* grid grid-cols-[repeat(auto-fit,minmax(12rem,1fr))] flex flex-row 5n-child:basis-[100%]  */}
        <div onClick={(e)=> handleScroll(e, true)} className="click-left absolute left-0 top-1/2 py-4 px-0 w-max h-max flex justify-center items-center active:bg-gray-800 border-2 rounded-r-3xl opacity-50 ">
          <ArrowLeft size={48}/>
        </div>
        <div onClick={(e)=> handleScroll(e) } className="click-right absolute right-0 top-1/2 py-4 px-0 w-max h-max flex justify-center items-center active:bg-gray-800 border-2 rounded-l-3xl opacity-50 ">
          <ArrowRight size={48}/>
        </div>
        {/* grid grid-flow-col grid-cols-[repeat(auto-fit,minmax(16rem,1fr))] grid-rows-1 */}
        <div className={"matching-products-grid py-2 w-full flex flex-col  gap-16 overflow-scroll tag"}>
          <>
            <div slot={0} className="scroll-div-1 flex flex-row gap-20">
              {
                products.filter((i,x) => x+1 <= (Number.parseInt(products.length/2))).map((i) => (<Product key={i.id} id={i.id} product={i.product} />))
              }
            </div>
            <div className="scroll-div-2 flex flex-row gap-20">
              {
                products.filter((i,x) => x+1 > (Number.parseInt(products.length/2))).map((i) => (<Product key={i.id} id={i.id} product={i.product} />))
              }
            </div>
          </>
          
        </div>
      </div>
    </div>
  )
}
export default BuyTogether