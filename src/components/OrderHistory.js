import React from 'react'

// assets 
import logo from '../assets/images/item_logo.png'
import { OpenIco, CopyIco } from '../assets'
import { useLocation } from 'react-router-dom'
import { selectorderHistoryItems } from '../js/slices/orders/ordersSlice'
import { useSelector } from 'react-redux'


const OrderHistory = () => {

  const { state } = useLocation()
  const orderedItems = useSelector(selectorderHistoryItems)
  
  console.log('state in history:', state)
  console.log('order history:', orderedItems)
  const Item = ()=>(
    <div id="item" className="  px-2 pt-2 pb-9  border-[1px] border-gray-300 rounded-2xl">
      <div id="item_wrapper" className="w-full p-2 flex flex-col justify-center gap-2">
        <div id="item_header" className="w-full  flex justify-between gap-2">
          <div id="item_img" className="w-max border-[1px] border-transparent rounded-2xl">
            <img className="border-[1px] border-transparent rounded-[25px]" src={logo} alt="" />
          </div>
          <div id="item_description" className="w-[21rem] flex flex-col justify-center gap-2 font-raleway">
            <div id="item_name" className="text-xl text-black font-semibold ">
              <p> Xiaomi </p>
            </div>
            <div id="item_details" className="h-[1rem] flex justify-start gap-10">
              <div id="order_date" className="flex items-center text-[15px] text-[#727280] font-semibold">
                <p> 21.12.2020 </p>
              </div>
              <div id="show_more" className="flex items-baseline text-[12.2px] text-[#2967FF] font-semibold">
                <p className="flex items-end"> Подробнее </p>
              </div>
            </div>
            
          </div>
          <div>
            <OpenIco />
          </div>
        </div>
        <div id="item_content" className="w-full flex flex-col justify-center gap-2 font-raleway ">
          <div id="order_header" className="flex justify-start items-center gap-8">
            <div id="order_status">
              <p className="text-xs text-[#727280] font-medium"> Статус заказа </p>
              <p className="text-xs text-black font-semibold"> Оплачен/Завершён </p>
            </div>
            <div id="order_number">
              <p className="text-xs text-[#727280] font-medium"> Номер заказа </p>
              <p className="flex justify-around text-xs text-[#2967FF] font-semibold"> #664-333 <CopyIco /></p>
              

            </div>
            
          </div>
          <div id="order_details" className=" flex justify-between items-center">
            <div id="quatity_ordered">
              <p className="text-xs text-[#727280] font-medium">Кол-во товаров</p>
              <p className="text-xs text-black font-semibold">4 шт.</p>
            </div>
            <div id="order_cost">
              <p className="text-xs text-[#727280] font-medium"> Стоимость заказа</p>
              <p className="text-xs text-black font-semibold"> 250 000₽</p>
            </div>
            <div id="delivery_address">
              <p className="text-xs text-[#727280] font-medium"> Адрес доставки </p>
              <p className="text-xs text-black font-semibold"> ул. Коммунистич...д.1, стр.1 </p>
            </div>
          </div>
        </div>
      </div>
      
    </div>
  )
  return (
    <div id="order_history__container" className="container flex flex-col justify-center gap-2  ">
      <div id="order_history__header" className="text-xl text-black font-raleway font-semibold">
        <p>
          История заказов
        </p>
        
      </div>
      <div id="order_history__content" className="w-full">
        <div id="content_wrapper" className="w-full px-2 grid  grid-flow-rows grid-cols-[repeat(auto-fit,minmax(19rem,1fr))] gap-6">
          <Item />
          <Item />
          <Item />
        </div>
      </div>

    </div>
  )
}

export default OrderHistory