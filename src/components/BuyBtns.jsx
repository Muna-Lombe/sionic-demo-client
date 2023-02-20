const BuyBtns = ({ mainText = "Добавить в корзину", subText = "Доставка завтра" }) => {
  return (
    <div className="buy-btns   my-2  py-3 flex flex-col items-center gap-5">
      <div className="buy-now w-10/12 h-max px-6 max-w-xs flex justify-center bg-blue-600 rounded-2xl text-white text-lg font-[arial] font-thin cursor-pointer">
        {mainText}
      </div>
      <div className="buy-later py-1 px-2 flex justify-center border-2 hover:border-orange-400 hover:bg-slate-100  rounded-xl text-black hover:text-slate-500  text-sm font-[arial] cursor-pointer">
        {subText}
      </div>
    </div>
  )
}
export default BuyBtns;