import { useEffect, useState } from "react"
import { InfoIco } from "../assets"
import { ClassWatcher } from "../orm/utilities/classWatcher"

const PriceTag = ({ original = 1060, discounted = 562 }) => {
  const [currPriceTag, setCurrPriceTag] = useState(discounted)
  useEffect(() => {
    const currPrice = document.querySelector(".product-variations")
    let watcher
    currPrice.childNodes.forEach((c, x) => {
      watcher = new ClassWatcher(c, "active", () => setCurrPriceTag(Number.parseInt(c.innerText)), () => console.log("removed activated"));

      // c.addEventListener()
    })
    return () => {
      watcher.disconnect()
    }
  }, [])
  return (
    <div className="price-tag my-2">
      <div className="price-details  py-2 flex flex-row-reverse justify-end gap-2 items-baseline">
        <p className="original-price text-xl text font-[arial] font-medium">
          {original + "₽"}
        </p>
        <p className="discounted-price text-4xl text-red-500 font-[arial] font-medium">
          {currPriceTag + "₽"}
        </p>
      </div>

      <p className="price-note w-max  px-2  flex flex-row items-center  gap-2 bg-green-500 rounded-xl text-white font-[arial] font-medium">
        <span>{discounted + "₽"} {" при оплате Ozon Картой"}</span>
        <span className='w-max h-max py-[2px] flex rounded-lg hover:stroke-white hover:fill-green-500 text-white text-[12px] leading-3 cursor-pointer'>
          <InfoIco />
        </span>
      </p>
    </div>
  )
}
export default PriceTag;