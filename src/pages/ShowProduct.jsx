import { useEffect, useState } from "react";
import { ArrowLeft, ArrowRight, InfoIco, PinIco } from "../assets";
import ImageMagnifier from "../components/ImageMagnifier";
import ProductReviews from "../components/ProductReviews";
import QAs from "../components/QAs";
import { filteredProductsFromModel } from "../orm/selectors";
import { useSelector } from "react-redux";
import { Link,useParams, useNavigate} from "react-router-dom";
import BellIco from "../assets/BellIco";


const ShowProduct = ()=>{
  const  id = useParams().id || 2001
  const product = useSelector(filteredProductsFromModel([])).find(i=> i.id.toString() === id.toString())
  console.log("show", product)
// navigate()
  const ProductTitle =({label, value})=>(
    <p className='w-full flex justify-between gap-6'>
      <span className='text-slate-400 text-sm font-[arial] font-medium'>{label} </span> <span className='w-2/5 text-sm font-[arial] font-medium'>{value}</span>
    </p>
  )
  

  const BackBtn = () =>(
    <Link to={-1} className="back-btn">
      <ArrowLeft/>
    </Link>
  )

  const ViewImageModal = ({openModal, modalAction}) => {
    
    const handleCloseModal =()=>{
      modalAction(false)
    }
    if (!openModal) return (<div className='hidden'></div>)
    return (
      <div className="modal modal-open fixed bottom-0 w-[100vw] h-[100vh] grid  place-content-center z-30 overflow-y-hidden ">
        <div className="modal-backdrop absolute w-[100%] h-[100%] top-0 left-0  bg-gray-700 opacity-70 z-40 ">
        </div>
        <div className="prd w-[100vw] h-[100vh] z-50 overflow-scroll scrollbar">
          <span slot={""} className={"w-5 h-5 self-end items-center text-sm cursor-pointer z-50"} onClick={(e) => handleCloseModal()}> ❎ </span>
          

        </div>
      </div>
    )
  }
  const ProductImageViewer =()=>{
    const [modalOpen, setModalOpen] = useState(true)
    
    return(
      <div className="image-viewer p-2 w-auto xs:max-w-1/4  max-w-[400px] ">
        <ImageMagnifier images={product?.product.images}  />
        {/* <ViewImageModal openModal={modalOpen} modalAction={setModalOpen}/> */}
      </div>
    )
  }
  const Logo =({})=>(
    <p> {"Logo"}</p>
  )
  const ProductSpecificationDetail = ({label, value})=>(
    <p className='flex flex-col text-slate-700 text-sm font-[arial] font-medium'>
      <span>{label}</span>
      <span>{value}</span>
    </p>
  )
  const ContentViewer= ({children})=>{
    return(
      // grid - rows - [auto_minmax(0, _1fr)]
      // lg: grid xl: grid xl: grid-cols - 1 xl: grid - rows - 2  lg: grid - rows - 2
      <div className="content-viewer w-full sm:flex md:flex flex-wrap justify-around gap-x-2 xs:gap-x-4 sm:gap-x-8 gap-y-4 ">
        {children}
      </div>

    )
  }
  const ContentDetails = ({ children }) => {
    return (
      <div className="content-details p-2 w-auto h-max xs:max-w-1/4 min-w-[372px] max-w-[400px] flex flex-col gap-4 order-2 ">
        {children}
      </div>
    )
  }
  const ContentSpecification =({children})=>{
    return(
      <div className="content-specification w-auto max-w-[342px] ">
        <p className=' text-blue-500 text-sm font-[arial] font-medium cursor-pointer'>
          {"Перейти к описанию"}
        </p>

        <div className="price-decription-details p-3 bg-gray-200 rounded-sm">
          <p className='text-slate-400 text-md font-[arial]  font-medium'>
            {"Пищевая ценность продукта:"}
          </p>
          <div className="details flex gap-6">
            {children}
            
          </div>
        </div>
      </div>
    )
  }
  const ContentPayment = ({ children }) => {
    return (
      <div className="content-payment p-2  w-auto xs:max-w-1/4 min-w-[372px] max-w-[400px]  flex flex-col row-span-2 order-4">
        {children}
      </div>
    )
  }
  const PriceTag = ({}) => {
    return (
      <div className="price-tag my-2">
        <div className="price-details  py-2 flex flex-row-reverse justify-end gap-2 items-baseline">
          <p className="original-price text-xl text font-[arial] font-medium">
            {1060}₽
          </p>
          <p className="discounted-price text-4xl text-red-500 font-[arial] font-medium">
            {573}₽
          </p>
        </div>

        <p className="price-note w-max px-1  flex flex-row items-center  gap-2 bg-green-500 rounded-xl text-white font-[arial] font-medium">
          <span>{562}₽ {"при оплате Ozon Картой"}</span>
          <span className='w-max h-max py-[2px] px-[6px] flex rounded-lg hover:stroke-white hover:fill-green-500 text-white text-[12px] leading-3 cursor-pointer'>
            <InfoIco/>
          </span>
        </p>
      </div>
    )
  }
  const DiscountInfo = ({ children }) => {
    return (
      <div className="discount-information my-4 gap-1 flex flex-col">
        <p className="best-price-note py-3 text-blue-500 font-[arial] text-base cursor-pointer">
          {"Лучшая цена на Ozon"}
        </p>
        <p className='line-through border-b-[2px] border-slate-700'></p>
        <p className="learn-more-tag flex flex-row items-baseline gap-2  text-blue-500 font-[arial] text-base cursor-pointer">
          <span className="text-sm text-blue-500 font-bold stroke-blue-500">
            <BellIco bold />
          </span>
          <span>{"Узнать о снижении цены"}</span>
        </p>
      </div>
    )
  }
  const BuyBtns = ({ children }) => {
    return (
      <div className="buy-btns   my-2  py-3 flex flex-col items-center gap-5">
        <div className="buy-now w-10/12 h-max px-6 max-w-xs flex justify-center bg-blue-600 rounded-2xl text-white text-lg font-[arial] font-thin cursor-pointer">
          Добавить в корзину
        </div>
        <div className="buy-later py-1 px-2 flex justify-center border-2 hover:border-orange-400 hover:bg-slate-100  rounded-xl text-black hover:text-slate-500  text-sm font-[arial] cursor-pointer">
          Доставка завтра
        </div>
      </div>
    )
  }
  const PaymentType = ({ children }) => {
    return (
      <div className="payment-type-wrapper p-2 max-w-[400px]  order-3">
        <div className="payment-type w-full p-3 flex flex-row justify-between gap-3 border-2 rounded-xl">
          <div className="type-description flex flex-col gap-3">
            <p className='text-lg font-[arial]'>
              Ozon Рассрочка
            </p>
            <p className="installment flex gap-2 items-baseline">
              <span className="amount p-1 bg-yellow-400 rounded-md text-base font-[arial]">
                109 ₽
              </span>
              <span className="time-span text-sm font-[arial]">
                × 6 месяцев
              </span>
            </p>
          </div>
          <p className='px-[4px] text-blue-500 cursor-pointer'>Подробнее</p>
        </div>
        <div className="children-wrapper px-2">
          {children}

        </div>
      </div>
    )
  }
  const Faqs = ({ children }) => {
    return (
      <div className="faqs py-4">
        <p className="title text-lg">Часто задаваемые вопросы</p>
        <p className="samples grid grid-cols-2 gap-2 text-base text-blue-500 cursor-pointer">
          <span>
            Условия доставки
          </span>
          <span>
            Возврат товаров
          </span>
          <span>
            Способы оплаты
          </span>
          <span>
            Возврат денег
          </span>
        </p>
      </div>
    )
  }
  const OrderInfo = ({ children }) => {
    return (
      <div className="order-info w-full flex flex-col">
        <p className="order-title text-lg font-[arial]">
          Информация о доставке
        </p>
        <p className="order-details  flex flex-row">

          {children}
        </p>
      </div>
    )
  }
  const PinLocation = ({}) =>(
    <span className="pin-location p-2 flex flex-row gap-4 items-center ">

      <span className="city-region pb-2 flex flex-row gap-6 border-b-2 text-lg  ">
        Казань, Татарстан республика
        <span className="arrow-right w-max flex items-end">
          <ArrowRight />
        </span>
      </span>
    </span>
  )
  const Courier = ({})=>(
    <span className="courier  p-2 flex flex-col  ">
      <span className="title text-lg ">
        Курьером Ozon
      </span>
      <span className="details text-slate-400 text-sm">
        <span className='date'>
          завтра, 6 февраля
        </span>
        -
        <span className="courier-price">
          149 ₽
        </span>
      </span>
    </span>
  )
  const PickupPoints =({})=>(
    <span className="pickup-points p-2 flex flex-row justify-between gap-4 ">
      <span className='flex flex-col'>
        <span className="title">
          Пункты выдачи и постаматы
        </span>
        <span className="details text-slate-400 text-sm">
          <span className='date'>
            завтра, 6 февраля
          </span>
          -
          <span className="courier-price">
            бесплатно
          </span>
        </span>
      </span>

      <span className="arrow-right">
        <ArrowRight />
      </span>
    </span>
  )
  const ReviewsAndQuestions =({})=>{
    const [activeTab, setActiveTab] = useState("PRs")
    return(
      <div className="review-questions-wrapper w-full p-2">
        <p className="title h-max flex gap-1 items-start">
          <span className="text-2xl font-medium">
            Reviews and questions about the product
          </span>
          <span className="reviews-total-count text-gray-400 text-sm font-medium">
            {6298}
          </span>
        </p>
        <div className="review-questions-toggle max-w-max py-2 flex  cursor-pointer  ">
          <p onClick={(e) => handleClassToggle(e, setActiveTab)} className=" PRs active py-1 px-3 border-b-2 border-blue-500 text-sm text-[arial] text-black font-medium hover:text-blue-500 transition ease-linear delay-50 ">PRODUCT REVIEWS</p>
          <p onClick={(e) => handleClassToggle(e, setActiveTab)} className=" QAs py-1 px-3 text-sm text-[arial] text-slate-400 font-medium border-b-[1px]  hover:text-blue-500 transition ease-in delay-100 ">QUESTIONS AND ANSWERS ABOUT THE PRODUCT</p>
        </div>
        {/* {children} */}
        {
          activeTab === "PRs"
          ? <ProductReviews />
          : <QAs />
        }
      </div>
    )
  }
  const handleClassToggle=(e, setActive)=>{
    e.preventDefault()
    const curElem = e.target;
    const nearElem = curElem.previousSibling ? curElem.previousSibling : curElem.nextSibling;
    
    if(!curElem.classList.contains("active")){
      // toggle curElem
      
      // set active tab
      setActive(curElem.classList[0])

      // toggle active
      curElem.classList.toggle("active")
      // toggle in new border base
      curElem.classList.toggle("border-b-2")
      // toggle out old border base
      curElem.classList.toggle("border-b-[1px]")
      // toggle border color
      curElem.classList.toggle("border-blue-500")
      
      // toggle font color
      curElem.classList.toggle("text-slate-400")
      curElem.classList.toggle("text-black")

      // toggle nearby sibling
  
      // toggle active
      nearElem.classList.toggle("active")
      // toggle in new border base
      nearElem.classList.toggle("border-b-[1px]")
      // toggle out old border base
      nearElem.classList.toggle("border-b-2")
      // toggle remove blue border color
      nearElem.classList.toggle("border-blue-500")
      // toggle add gray
      
  
      // toggle font color
      nearElem.classList.toggle("text-slate-400")
      nearElem.classList.toggle("text-black")
      

    }

  }
  const MiddleSection =({children})=>{
    const NoItems = () => (
      <div 
        className="loading-product w-full min-w-[372px] flex flex-col justify-center items-center">
        <div id="no_items_banner__header"
          className="text-base text-black font-raleway font-semibold">
          <h3>
            🙅 looks like no items here 👀
          </h3>
        </div>
        <div id="no_items_banner__footer"
          className="text-lg text-black font-raleway font-bold">
          <h3>
            😃 Waiting for products to load 😃
          </h3>
        </div>
      </div>
    )
    return (
      <div className="middle w-full flex flex-wrap border  ">
        {
          (!product)
          ?  <NoItems/>
            
          : children
        }
      </div>
    )
  }
  return(
       <>
          <div className="top w-full border hide-sidebar ">
            <BackBtn/>
          </div>
            <MiddleSection>
              <ContentViewer>
                {/* <div className="view-left w-full flex justify-between gap-8"> */}
                  <ProductImageViewer/>
                  <ContentDetails>
                    <div className="content-description flex flex-col gap-2">
                      <Logo/>
                      <ProductTitle label={"Тип"} value={"Кофе растворимый" } />
                      <ProductTitle label={"Бренд"} value={"EGOISTE"} />
                      <ProductTitle label={"Технология производства"} value={"Сублимированный"} />
                      <ProductTitle label={"Состав кофе"} value={"Арабика"} />
                      <ProductTitle label={"Интенсивность вкуса"} value={"Средний"} />
                    </div>

                    <ContentSpecification>
                      <ProductSpecificationDetail label={"18"} value={"белки"} />
                      <ProductSpecificationDetail label={"2.7"} value={"жиры"} />
                      <ProductSpecificationDetail label={"42.6"} value={"углеводы"} />
                      <ProductSpecificationDetail label={"317"} value={"ккал"}/>
                    </ContentSpecification>
                  </ContentDetails>
                {/* </div> */}
                {/* <div className="view-right w-full flex justify-between gap-8"> */}
                  <ContentPayment>
                    <PriceTag/>
                    <DiscountInfo/>
                    <BuyBtns/>
                  </ContentPayment> 
                  <PaymentType >
                    <Faqs />
                    <OrderInfo>
                      <span className="order-pin py-3">
                        <PinIco />
                      </span>
                      <span className="order-pin-points">
                        <PinLocation />
                        <span className="courier-points flex flex-col font-[arial]">
                          <Courier />
                          <PickupPoints />
                        </span>
                      </span>
                    </OrderInfo> 
                  </PaymentType>

                {/* </div> */}
                      
                  
              </ContentViewer>
              <ReviewsAndQuestions/>
            </MiddleSection>
          <div className="bottom w-full border "></div>

       </>   
    )
}
export default ShowProduct;