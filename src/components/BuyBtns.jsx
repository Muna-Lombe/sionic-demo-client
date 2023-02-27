import { useDispatch } from "react-redux";
import types from "../orm/actions/actionTypes";
import { createdOrder } from "../orm/models/OrderModel";
import { momentDate } from "../orm/utilities";



const BuyBtns = ({id, mainText = "Добавить в корзину", subText = "Доставка завтра" }) => {
  
  const dispatch = useDispatch()
  const handleAddToCart = (id) => {
    dispatch(createdOrder({
      DateCreated: momentDate(),
      product: id,
      OrderStatus: types.IN_CART
    }))

  }
  return (
    <div className="buy-btns   my-3 flex flex-col items-center gap-2">
      <div onClick={()=> handleAddToCart(id)} className="buy-now w-10/12 h-max py-4 px-6 max-w-xs flex justify-center bg-blue-600 rounded-2xl text-white text-lg font-[arial] font-thin cursor-pointer">
        {mainText}
      </div>
      <div className="delivery-type px-2 flex justify-center text-slate-500  text-sm font-[arial] ">
        {subText}
      </div>
    </div>
  )
}
export default BuyBtns;