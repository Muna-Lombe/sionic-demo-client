import React,{useRef} from 'react'
import { useNavigate } from 'react-router-dom'

// assets
import { LocationIco } from '../assets'

const CheckoutForm = () => {
  let navigate = useNavigate()
  const dateRef = useRef()
  const timeRef = useRef()

  const handleSubmit=(e)=>{
    e.preventDefault();
    console.log(e)

    setTimeout(() => {
      navigate("../history", { replace: true })
    }, 1000);
  }

  const CheckoutForm = ()=> (
    <>
      <div id="date_time" className="py-2 font-relaway">
        <p className="text-md font-semibold ">Когда доставить</p> 
      </div>
      <div id="delivery_date_time" className="w-max flex justify-around gap-4">
        <div id="date" className="w-[9rem] flex flex-col justify-center border-b-[1px] border-b-gray-300">
          <label htmlFor="delivery_date" className="w-0 h-0"></label>
          <input className=" focus:outline-none" form="checkout_form" type="text" name="delivery_date" placeholder="Выберите дату"  ref={dateRef} onFocus={() => (dateRef.current.type = "date")} onBlur={() => (dateRef.current.type = "text")}  ></input>
        </div>
        <div id="time" className="w-[8rem] flex flex-col justify-center border-b-[1px] border-b-gray-300 ">
          <label htmlFor="delivery_time" className="w-0 h-0"></label>
          <input className="w-min px-2 focus:outline-none"  form="checkout_form"  type="text" name="delivery_time" placeholder="Выберите время" ref={timeRef} onFocus={() => (timeRef.current.type = "time")} onBlur={() => (timeRef.current.type = "text")}  ></input>
        </div>
      </div>
      <div id="address" className="w-[15rem] py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="delivery_address" className="text-md font-semibold">Куда доставить?</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <LocationIco />
          <input className="w-min px-2 focus:outline-none" form="checkout_form" type="text" name="delivery_address"  placeholder="Выберите адрес доставки" />
        </div>
      </div>
      <div id="name" className="w-[15rem]  py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="receiver_name" className="text-md font-semibold">Имя</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <input className="w-min px-2 focus:outline-none" form="checkout_form" type="text" name="receiver"  />
        </div>
      </div>
      <div id="phone" className="w-[15rem] py-2 flex flex-col justify-center font-raleway">
        <label htmlFor="receiver_phone" className=" text-md font-semibold">Телефон</label>
        <div className="h-[2.5rem] px-2 flex items-center gap-1 border-[1px] border-gray-300 rounded-3xl">
          <input className="w-min px-2 focus:outline-none" form="checkout_form" type="text" name="receiver_phone"  />
        </div>
      </div>
    </>
  )

  const CheckoutOrder = () =>(
    <>
      <div id="order_details" className="w-[25rem] p-2 flex flex-col justify-center items-center border-[1px] border-[#F0F4FB] bg-[#F0F4FB] rounded-3xl">
        <div id="order_cost" className="w-full py-1 px-4 flex justify-between items-center text-xl text-[#727280]  font-raleway">
          <label htmlFor="o_cost">
            Стоимость товаров:
          </label>
          <input className="w-[8rem] flex justify-end text-2xl bg-transparent" name="o_cost" form="checkout_form" type="text" value={"200 584₽"} readOnly />
            
          
        </div>
        <div id="delivery_cost" className="w-full py-1 px-4 flex justify-between items-center text-xl text-[#727280] font-raleway">
          <label className="" htmlFor="d_cost">
            Стоимость доставки:
          </label>
          <input className="w-[8rem] flex justify-end  bg-transparent" name="d_cost" form="checkout_form" type="text" value={"200₽"} readOnly/>
            
          
        </div>
        <div id="total_cost" className="w-full p-4 flex justify-between items-center text-2xl text-[#727280] font-raleway font-medium">
          <label className="bg-transparent" htmlFor="t_cost">
            Итого:
          </label>
          <input className="w-[8rem] flex justify-end  bg-transparent text-black font-bold" name="t_cost" form="checkout_form" type="text" value={"200 784₽"} readOnly/>
            
          
        </div>

      </div>
      <button form="checkout_form" id="checkout_btn" onClick={(e)=>handleSubmit(e)} className="w-[25rem] p-3 flex justify-center  items-center border-[1px] border-[#2967FF] bg-[#2967FF] active:bg-green-400 rounded-[1.9rem] active: text-2xl text-white font-raleway font-normal">
        Сделать заказ
      </button>
    </>
  )
  return (
    <div id="checkout_wrapper" className="w-full">
      <div id="checkout_header" className="text-xl text-black font-raleway font-bold">
        <p>
        Доставка
        </p>
      </div>
      <form id="checkout_form" action="/#" method='POST' >
        <div id="checkout_content" className="w-full flex-auto justify-between  sm:flex sm:flex-col sm:justify-center sm:gap-2  md:flex md:flex-row md:justify-center md:items-center lg:flex lg:flex-row lg:justify-around">
          
            <div id="checkout_form__wrapper" className="w-full sm:w-auto sm:flex sm:flex-col sm:justify-center md:w-max md:flex md:flex-col md:justify-center p-4 flex flex-col justify-center gap-3 ">
              <CheckoutForm />
            </div>
            <div id="checkout_order__wrapper" className="w-full sm:w-auto sm:flex sm:flex-col sm:justify-center md:w-auto md:flex md:flex-col md:justify-center flex flex-col justify-center items-center gap-2">
              <CheckoutOrder />
            </div>
          
        </div>
      </form>

    </div>
  )
}

export default CheckoutForm
