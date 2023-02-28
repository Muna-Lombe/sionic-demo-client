import { useDispatch, useSelector } from "react-redux";
import types from "../orm/actions/actionTypes";
import { createdOrder } from "../orm/models/OrderModel";
import { momentDate } from "../orm/utilities";
import { isAlreadyOrdered, isInCart } from "../orm/selectors";
import { createdCartItem } from "../orm/models/CartModel";



const BuyBtns = ({ id, mainText = "Добавить в корзину", subText = "Доставка завтра", tooltip = "Item already in cart" }) => {
  const isOrdered = useSelector(isInCart(id))

  const dispatch = useDispatch()
  const handleAddToCart = (id) => {
    dispatch(createdCartItem({
      DateCreated: momentDate().full,
      product: id,
      productCount:1,
      ItemStatus: types.ORDERED_PENDING
    }))

  }
  return (
    <div className={" buy-btns   my-3 flex flex-col items-center gap-2 "}>
      <button onClick={() => handleAddToCart(id)} onSubmit={() => ""} disabled={isOrdered} className={(isOrdered ? "bg-slate-400 " : " bg-blue-600  ") + "buy-now w-10/12 h-max py-4 px-6 max-w-xs flex justify-center rounded-2xl text-white text-lg font-[arial] font-thin cursor-pointer transition-transform"}>
        <span className={" flex"}>
          {isOrdered ? tooltip : mainText}
        </span>
      </button>
      <div className="delivery-type px-2 flex justify-center text-slate-500  text-sm font-[arial] ">
        {subText}
      </div>
    </div>
  )
}
export default BuyBtns;