import { useDispatch, useSelector } from "react-redux";
import types from "../orm/actions/actionTypes";
import { createdOrder } from "../orm/models/OrderModel";
import { momentDate } from "../orm/utilities";
import { isAlreadyOrdered, isInCart } from "../orm/selectors";
import { createdCartItem } from "../orm/models/CartModel";
import { titleTagTypes as tags } from "../assets";

const BuyBtns = ({ id, }) => {
  const isOrdered = useSelector(isInCart(id))

  const dispatch = useDispatch()
  const handleAddToCart = (id) => {
    dispatch(createdCartItem({
      DateCreated: momentDate().full,
      product: id,
      productCount:1,
      ItemStatus: types.IN_CART
    }))

  }
  return (
    <div className={" buy-btns   my-3 flex flex-col items-center gap-2 "}>
      <button onClick={() => handleAddToCart(id)} onSubmit={() => ""} disabled={isOrdered} className={(isOrdered ? "bg-slate-400 " : " bg-blue-600  ") + "buy-now w-10/12 h-max py-4 px-6 max-w-xs flex justify-center rounded-2xl text-white text-lg font-[arial] font-thin cursor-pointer transition-transform"}>
        <span className={" flex"}>
          {isOrdered ? tags.buyBtn.tooltip : tags.buyBtn.mainText}
        </span>
      </button>
      <div className="delivery-type px-2 flex justify-center text-slate-500  text-sm font-[arial] ">
        {tags.buyBtn.subText}
      </div>
    </div>
  )
}
export default BuyBtns;