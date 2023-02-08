import { ArrowRight, PinIco } from "../assets";
import ImageMagnifier from "./ImageMagnifier";
import ProductReviews from "./ProductReviews";


const ShowProduct = ({product, img_root})=>{
  const ProductTitle =({label, value})=>(
    <p className='w-full flex justify-between gap-6'>
      <span className='text-slate-400 text-sm font-[arial] font-medium'>{label} </span> <span className='w-2/5 text-sm font-[arial] font-medium'>{value}</span>
    </p>
  )
  const Logo =({})=>(
    <p> Logo </p>
  )
  const ProductSpecificationDetail = ({label, value})=>(
    <p className='flex flex-col text-slate-700 text-sm font-[arial] font-medium'>
      <span>{label}</span>
      <span>{value}</span>
    </p>
  )
  const ContentViewer= ({children})=>{
    return(
      <div className="content-viewer w-[calc(100%-20px)] max-w-4xl p-2 flex gap-8 ">
        {children}
      </div>

    )
  }
  const ContentDetails = ({ children }) => {
    return (
      <div className="content-details w-1/2 flex flex-col gap-4">
        {children}
      </div>
    )
  }
  const ContentSpecification =({children})=>{
    return(
      <div className="content-specification">
        <p className=' text-blue-500 text-sm font-[arial] font-medium cursor-pointer'>
          Перейти к описанию
        </p>

        <div className="price-decription-details p-3 bg-gray-200 rounded-sm">
          <p className='text-slate-400 text-md font-[arial]  font-medium'>
            Пищевая ценность продукта:
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
      <div className="content-payment  w-1/2 px-2 flex flex-col">
        {children}
      </div>
    )
  }
  const PriceTag = ({}) => {
    return (
      <div className="price-tag my-2">
        <div className="price-details  py-2 flex flex-row-reverse justify-end gap-2 items-baseline">
          <p className="original-price text-xl text font-[arial] font-medium">
            1060 ₽
          </p>
          <p className="discounted-price text-4xl text-red-500 font-[arial] font-medium">
            573 ₽
          </p>
        </div>

        <p className="price-note w-max px-1  flex flex-row items-center  gap-2 bg-green-500 rounded-xl text-white font-[arial] font-medium">
          <span>562 ₽ при оплате Ozon Картой</span>
          <span className='w-max h-max py-[2px] px-[6px] flex  bg-black rounded-lg text-white text-[12px] leading-3 cursor-pointer'>ℹ️</span>
        </p>
      </div>
    )
  }
  const DiscountInfo = ({ children }) => {
    return (
      <div className="discount-information my-4 gap-1 flex flex-col">
        <p className="best-price-note py-3 text-blue-500 font-[arial] text-base cursor-pointer">
          Лучшая цена на Ozon
        </p>
        <p className='line-through border-b-[2px] border-slate-700'></p>
        <p className="learn-more-tag flex flex-row gap-2  text-blue-500 font-[arial] text-base cursor-pointer">
          <span className="text-sm text-blue-500 ">🔔</span>
          <span>Узнать о снижении цены</span>
        </p>
      </div>
    )
  }
  const BuyBtns = ({ children }) => {
    return (
      <div className="buy-btns   my-2  py-3 flex flex-col items-center gap-5">
        <div className="buy-now w-10/12 px-8 flex justify-center bg-blue-600 rounded-2xl text-white text-lg font-[arial] font-thin cursor-pointer">
          Добавить в корзину
        </div>
        <div className="buy-later flex justify-center text-black text-sm font-[arial] cursor-pointer">
          Доставка завтра
        </div>
      </div>
    )
  }
  const PaymentType = ({ children }) => {
    return (
      <div className="payment-type w-full p-3 flex flex-row justify-between gap-8 border-2 rounded-xl">
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
  return(
       <>
          <div className="top w-full border "></div>
          <div className="middle w-full flex flex-wrap border ">
            <div className="image-viewer">
              <ImageMagnifier img_root={img_root} images={product.images} />
            </div>
            <ContentViewer>
              <ContentDetails>
                <div className="content-description">
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
                    
              <ContentPayment>
                <PriceTag/>
                <DiscountInfo/>
                <BuyBtns/>
                <PaymentType/>
                <Faqs/>
                <OrderInfo>
                  <span className="order-pin py-3">
                    <PinIco />
                  </span>
                  <span className="order-pin-points">
                    <PinLocation/>
                    <span className="courier-points flex flex-col font-[arial]">
                      <Courier/>
                      <PickupPoints/>
                    </span>
                  </span>
                </OrderInfo>
              </ContentPayment>    
            </ContentViewer>
            <ProductReviews/>
          </div>
          <div className="bottom w-full border "></div>

       </>   
    )
}
export default ShowProduct;