import moment from 'moment'
import React,{useRef} from 'react'
import { useDispatch } from 'react-redux'
import { useLocation, useNavigate } from 'react-router-dom'


// assets
import { LocationIco } from '../assets'
import { orderHistoryItemAdded } from '../js/slices/orders/ordersSlice'


const CheckoutForm = () => {
  
  let navigate = useNavigate()
  const location = useLocation()
  const dateRef = useRef()
  const timeRef = useRef()
  const dispatch = useDispatch()
  
  console.log(location)

  const totalPrice = location.state?.totalPrice
  const id = location.key
  const prCount = location.state?.prCount
  const deliveryPrice = 200


  const handleSubmit=(e)=>{
    e.preventDefault();
    let formData = new FormData(document.forms['checkout_form']);
    let orderData = {}
    formData.forEach((k,v, idx)=> {
      
     
      orderData[v] = k
    })
    let order_date = moment().toObject()
    // let orderId='664-'+(id.toString().length > 1 ? '0' : '00' + id.toString())
    
    let status = ['Оплачен', 'Завершён']
    let finalOrderData = {id, order_date, quantity: prCount, status, ...orderData}
    // quantity:4,  status:['Оплачен', 'Завершён']
    dispatch(orderHistoryItemAdded(finalOrderData))
    setTimeout(() => {
      navigate("../history", { replace: true})
    }, 1000);
  }
 

  const CheckoutForm = ()=> (
    <>
      <div id="date_time" className="py-2 font-relaway" >
        <p className="text-md font-semibold ">Когда доставить</p> 
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
      <div id="address__wrapper" className="w-[15rem] py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="delivery_address" className="text-md font-semibold">Куда доставить?</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <LocationIco />
          <input id="d_addr" className="w-min px-2 focus:outline-none" form="checkout_form" type="text" name="delivery_address"  placeholder="Выберите адрес доставки" required />
        </div>
      </div>
      <div id="name__wrapper" className="w-[15rem]  py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="receiver_name" className="text-md font-semibold">Имя</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <input id="rcv_name" className="w-min px-2 focus:outline-none" form="checkout_form" type="text" name="receiver" required />
        </div>
      </div>
      <div id="phone__wrapper" className="w-[15rem] py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="receiver_phone" className=" text-md font-semibold">Телефон</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <input id="rcv_phone" className="w-min px-2 focus:outline-none" form="checkout_form" type="text" name="receiver_phone" required />
        </div>
      </div>
    </>
  )

  const CheckoutOrder = () =>(
    <div className="w-full flex flex-col justify-center gap-4 lg:p-4">
      <div id="order_details" className="w-auto p-2 lg:p-4 flex flex-col justify-start md:justify-center lg:justify-center xl:justify-center items-center border-[1px] border-[#F0F4FB] bg-[#F0F4FB] rounded-3xl">
        <div id="order_cost__wrapper" className="w-full lg:w-full xl:w-full  py-1 px-2 flex-col md:flex  md:flex-row lg:flex  lg:flex-row xl:flex xl:flex-row justify-start md:justify-between lg:justify-between xl:justify-between  items-center text-xl text-[#727280]  font-raleway">
          <label htmlFor="order_cost">
            Стоимость товаров:
          </label>
          <input id="o_cost" className="w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end text-2xl bg-transparent" name="order_cost" form="checkout_form" type="text" value={(totalPrice || 0) +"₽"} readOnly required  />
            
          
        </div>
        <div id="delivery_cost__wrapper" className="w-full lg:w-full xl:w-full py-1 px-2 flex-col md:flex  md:flex-row lg:flex  lg:flex-row xl:flex xl:flex-row justify-start md:justify-between lg:justify-between xl:justify-between items-center text-xl text-[#727280] font-raleway">
          <label className="" htmlFor="delivery_cost">
            Стоимость доставки:
          </label>
          <input id="d_cost" className="w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end  bg-transparent" name="delivery_cost" form="checkout_form" type="text" value={(deliveryPrice || 0) +"₽"} readOnly required />
            
          
        </div>
        <div id="total_cost__wrapper" className="w-full lg:w-full xl:w-full p-2 flex-col md:flex  md:flex-row lg:flex  lg:flex-row xl:flex xl:flex-row justify-start md:justify-between lg:justify-between xl:justify-between items-center text-2xl text-[#727280] font-raleway font-medium">
          <label className="bg-transparent" htmlFor="total_cost">
            Итого:
          </label>
          <input id="t_cost" className="w-[8rem] flex justify-start  md:justify-end lg:justify-end xl:justify-end  bg-transparent text-black font-bold" name="total_cost" form="checkout_form" type="text" value={(totalPrice 
          + deliveryPrice) +"₽"} readOnly required />
            
          
        </div>

      </div>
      
      <input type="submit" form="checkout_form" id="checkout_btn" value="Сделать заказ" className="w-auto p-3 flex justify-center  items-center border-[1px] border-[#2967FF] bg-[#2967FF] active:bg-green-400 rounded-3xl active: text-2xl text-white font-raleway font-normal" required/>
    </div>
  )
  return (
    <div id="checkout_wrapper" className="w-full mx-2">
      <div id="checkout_header" className="text-xl text-black font-raleway font-bold">
        <p>
        Доставка
        </p>
      </div>
      <form id="checkout_form" name="checkout_form" action="/#" method='POST'  onSubmit={(e)=>handleSubmit(e)} >
        <div id="checkout_content" className="w-auto min-w-[20rem] flex flex-col justify-center items-center md:flex-row lg:flex lg:flex-row lg:justify-start lg:gap-8">
          
            <div id="checkout_form__wrapper" className="w-auto min-w-[18rem] lg:w-[30%] p-4 flex flex-col justify-center align-middle gap-3 ">
              <CheckoutForm />
            </div>
            <div id="checkout_order__wrapper" className="w-auto min-w-[18rem] max-w-[30rem] flex-grow sm:w-auto  md:w-auto lg:w-[45%] xl:w-[45%]   flex flex-col justify-center items-center gap-2">
              <CheckoutOrder />
            </div>
          
        </div>
      </form>

    </div>
  )
}

export default CheckoutForm
