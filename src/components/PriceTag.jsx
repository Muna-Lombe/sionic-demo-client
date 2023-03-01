import { useEffect, useState } from "react"
import { InfoIco } from "../assets"
import { ClassWatcher } from "../orm/utilities/classWatcher"
import { calcDisc } from "../orm/utilities"

const PriceTag = ({tagFor,original, discount=false }) => {
  const [currPriceTag, setCurrPriceTag] = useState({oldPrice:original})
  const setDisc = (oldPrice, disc) => {
    if (disc) return {discounted: calcDisc(oldPrice, discount), oldPrice }
    return { oldPrice }
  }
  useEffect(() => {
    const currPrice = document.querySelector("."+tagFor)
    let watcher
    currPrice.childNodes.forEach((c, x) => {
      watcher = new ClassWatcher(c, "active", () => setCurrPriceTag(setDisc(Number.parseInt(c.innerText), discount)), () => "");

      // c.addEventListener()
    })
    return () => {
      watcher.disconnect()
    }
  }, [])
  return (
    <div className="price-tag my-2">
      <div className="price-details  py-2 flex flex-row justify-start gap-2 items-baseline">
        <p className="main-price text-4xl text-red-500 font-[arial] font-medium">
          {
            discount
            ? (currPriceTag.discounted|| setDisc(original,discount).discounted) + "₽"
            : (currPriceTag.oldPrice || original)+"₽"
          }
        </p>
        {
          discount
          ?
            <p className="sub-price text-xl text font-[arial] font-medium">
              {(currPriceTag.oldPrice || original )+ " ₽"}
            </p>
          :""
        }
      </div>
      {
        discount 
        ?
          <p className="price-note w-max  px-2  flex flex-row items-center  gap-2 bg-green-500 rounded-xl text-white font-[arial] font-medium">
            <span>{((currPriceTag.oldPrice || original) - (currPriceTag.discounted || setDisc(original, discount).discounted)).toFixed(2) + "₽"} {" при оплате Ozon Картой"}</span>
            <span className='w-max h-max py-[2px] flex rounded-lg hover:stroke-white hover:fill-green-500 text-white text-[12px] leading-3 cursor-pointer'>
              <InfoIco />
            </span>
          </p>
        : ""
      }
    </div>
  )
}
export default PriceTag;