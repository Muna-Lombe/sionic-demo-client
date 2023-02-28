import moment from 'moment'
import React,{useRef} from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'


// assets
import { LocationIco } from '../assets'
import { orderHistoryItemAdded } from '../js/slices/orders/ordersSlice'
import { createdOrder } from '../orm/models/OrderModel'
import ProductDescriptor from './ProductDescriptor'
import { getName, useGetName } from '../orm/selectors'
import { momentDate, returnOnReload } from '../orm/utilities'


const CheckoutForm = ({ checkoutText = "Доставка"}) => {
  
  let navigate = useNavigate()
  const location = useLocation()
  const dateRef = useRef()
  const timeRef = useRef()
  const dispatch = useDispatch()
  // returnOnReload()()
  console.log(location)

  const total = Number.parseInt(location.state?.total)
  const id = location.key
  const orderedItems = location.state?.orderedItems
  const deliveryPrice = 200


  const handleSubmit=(e)=>{
    e.preventDefault();
    let formData = new FormData(document.forms['checkout_form']);
    let orderData = {}
    formData.forEach((k,v, idx)=> {
      orderData[v] = k
    })
    
// 

    // let order_date = moment().toObject()
    // let orderId='664-'+(id.toString().length > 1 ? '0' : '00' + id.toString())
    
    let status = ['Оплачен', 'Завершён']

    let finalOrderData = { id, DateCreated: momentDate().shortDate, quantity: orderedItems, status, ...orderData}
    console.log("ord", finalOrderData)
    
    // quantity:4,  status:['Оплачен', 'Завершён']
    dispatch(createdOrder(finalOrderData))
    // setTimeout(() => {
    //   navigate("../history", { replace: true})
    // }, 1000);
  }
 

  const CheckoutForm = ({ orderWhenText = "Когда доставить", orderToWhereText = "Куда доставить", receiverNameText = "Имя", phoneText ="Телефон" })=> (
    <>
      <div id="date_time" className="py-2 font-relaway" >
        <p className="text-md font-semibold ">{orderWhenText}</p> 
      </div>
      <div id="delivery_date_time__wrapper" className="w-max flex justify-around gap-4">
        <div id="date" className="w-[9rem] flex flex-col justify-center border-b-[1px] border-b-gray-300">
          <label htmlFor="delivery_date" className="w-0 h-0"></label>
          <input id="d_date" className=" focus:outline-none" form="checkout_form" type="text" name="delivery_date" placeholder="Выберите дату"  ref={dateRef} onFocus={() => (dateRef.current.type = "date")} onBlur={() => (dateRef.current.type = "text")} required  ></input>
        </div>
        <div id="time" className="w-[8rem] flex flex-col justify-center border-b-[1px] border-b-gray-300 ">
          <label htmlFor="delivery_time" className="w-0 h-0"></label>
          <input id="d_time" className="w-min px-2 focus:outline-none"  form="checkout_form"  type="text" name="delivery_time" placeholder="Выберите время" ref={timeRef} onFocus={() => (timeRef.current.type = "time")} onBlur={() => (timeRef.current.type = "text")} required ></input>
        </div>
      </div>
      <div id="address__wrapper" className="min-w-[15rem] py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="delivery_address" className="text-md font-semibold">{orderToWhereText+"?"}</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <LocationIco />
          <input id="d_addr" className="w-min px-2 focus:outline-none" form="checkout_form" type="text" name="delivery_address"  placeholder="Выберите адрес доставки" required />
        </div>
      </div>
      <div id="name__wrapper" className="min-w-[15rem]  py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="receiver_name" className="text-md font-semibold">{receiverNameText}</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <input id="rcv_name" className="w-min px-2 focus:outline-none" form="checkout_form" type="text" name="receiver" required />
        </div>
      </div>
      <div id="phone__wrapper" className="min-w-[15rem] py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="receiver_phone" className=" text-md font-semibold">{phoneText}</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <input id="rcv_phone" className="w-min px-2 focus:outline-none" form="checkout_form" type="text" name="receiver_phone" required />
        </div>
      </div>
    </>
  )
  const NameQuantTag=({oi})=>(
    <span>{useGetName('Product', oi.productId)+"     x"+oi.quantity}</span>
  )
  const textBg = {backgroundImage:'url("data:image/svg+xml;utf8,<svg xmlns=\'http://www.w3.org/2000/svg\' version=\'1.1\' height=\'20px\' width=\'1px\'><text x=\'0\' y=\'15\' fill=\'black\' font-size=\'12\'>.</text></svg>")'}
  const CheckoutOrder = ({ totalPriceText = "Стоимость товаров", deliveryCostText = "Стоимость доставки", sumTotal = "Итого", checkoutBtnText = "Сделать заказ" }) =>(
    <div className=" mt-14 w-full flex flex-col justify-center gap-6 lg:p-4">
      <div id="order_details" className="w-auto p-2 lg:p-4 flex flex-col justify-start md:justify-center lg:justify-center xl:justify-center items-center gap-4 border-[1px] border-[#F0F4FB] bg-[#F0F4FB] rounded-3xl">
        
        <div id="order_items" className="w-full flex flex-col items-start text-black text-base">
          <p className="p-2 w-full flex flex-start text-lg text-[#727280]">
            {"Ordered Items:"}
          </p>
          {orderedItems.map((oi,x)=>
            <ProductDescriptor  key={x} id={`${oi.id}${x}`} label={<NameQuantTag oi={oi}/>} values={[Number.parseInt(oi.price*oi.quantity)]} />
            )
          }
          <span className={"dotted-div px-2 w-full h-8 text-slate-400 overflow-hidden clear-right text-clip bg-repeat"} style={textBg} >
          </span>
        </div>
        
        
        
        <div id="order_cost__wrapper" className="w-full   py-1 px-2 flex flex-col sm:flex-row  md:flex-row  lg:flex-row xl:flex-row justify-between md:justify-between lg:justify-between xl:justify-between  items-center text-lg text-[#727280]  font-raleway ">
          <label htmlFor="order_cost">
            {totalPriceText+":"}
          </label>
          <input id="o_cost" className="w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end text-xl bg-transparent lining-nums tabular-nums" name="order_cost" form="checkout_form" type="text" value={(total || 0) +"₽"} readOnly required  />
        </div>

        <div id="delivery_cost__wrapper" className="w-full  py-1 px-2 flex flex-col sm:flex-row  md:flex-row  lg:flex-row xl:flex-row justify-between md:justify-between lg:justify-between xl:justify-between items-center text-lg text-[#727280] font-raleway ">
          <label className="" htmlFor="delivery_cost">
            {deliveryCostText+":"}
          </label>
          <input id="d_cost" className="w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end  bg-transparent lining-nums tabular-nums" name="delivery_cost" form="checkout_form" type="text" value={(deliveryPrice || 0) +"₽"} readOnly required />
        </div>

        <div id="total_cost__wrapper" className="w-full  px-2 flex flex-col sm:flex-row  md:flex-row  lg:flex-row xl:flex-row justify-between md:justify-between lg:justify-between xl:justify-between items-center text-xl text-[#727280] font-raleway font-medium ">
          <label className="bg-transparent" htmlFor="total_cost">
            {sumTotal+":"}
          </label>
          <input id="t_cost" className="w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end  bg-transparent text-black font-bold lining-nums tabular-nums" name="total_cost" form="checkout_form" type="text" value={(total 
          + deliveryPrice) +"₽"} readOnly required />
        </div>

      </div>
      
      <input type="submit" form="checkout_form" id="checkout_btn" value={checkoutBtnText} className="w-auto p-3 flex justify-center  items-center border-[1px] border-[#2967FF] bg-[#2967FF] active:bg-green-400 rounded-3xl active: text-2xl text-white font-raleway font-normal" required/>
    </div>
  )
  return (
    <div id="checkout_wrapper" className="w-full mx-2">
      <div id="checkout_header" className="text-xl text-black font-raleway font-bold">
        <p>
        {checkoutText}
        </p>
      </div>
      <form id="checkout_form" name="checkout_form" action="/#" method='POST'  onSubmit={(e)=>handleSubmit(e)} >
        <div id="checkout_content" className="w-auto min-w-[20rem] flex flex-col flex-wrap justify-center items-center sm:flex-col md:flex-row lg:flex lg:flex-row lg:justify-start lg:gap-8">
          
          <div id="checkout_form__wrapper" className="p-4 w-full min-w-[18rem] lg:w-[33%] max-w-[30rem]  flex flex-col justify-center align-middle gap-3 ">
              <CheckoutForm />
            </div>
            <div id="checkout_order__wrapper" className="w-full min-w-[18rem] max-w-[30rem] flex-grow    flex flex-col justify-center items-center gap-2">
              <CheckoutOrder />
            </div>
          
        </div>
      </form>

    </div>
  )
}

export default CheckoutForm
