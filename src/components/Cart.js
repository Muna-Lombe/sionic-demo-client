import React, { useEffect, useState } from 'react'
import { Link } from "react-router-dom";

// assets
import cartImg from '../assets/images/cart_item.png'
import { DeleteIco } from '../assets'
import { selectProductIds, selectProducts } from '../js/slices/products/productsSlice';
import { useDispatch, useSelector } from 'react-redux';
import IMG from '../assets/images';
import { cartItemDeleted, cartItemOrdered, selectCartItems } from '../js/slices/cart/cartSlice';



const Cart = () => {
  const [orderedItems, setOrderedItems] = useState([])
  const items = useSelector(state => state.cart.entities)
  const dispatch = useDispatch()
  const products  = useSelector(selectProducts)
  
  // logs
  console.log('orders', orderedItems)

  
  // CREATE IMAGE INSTANCE
  var img = new IMG()

  const unorderedItems = Object.keys(items).filter((item) => items[item].isOrdered === false)
  const ids = unorderedItems
  const filteredCartItems = products.filter((pr) => ids.includes(pr.id.toString()))

  const filteredCartItemsByStore = Object.create(null)
  filteredCartItems.forEach((fp)=>{
    if(filteredCartItemsByStore[fp.product.store.name]){

      filteredCartItemsByStore[fp.product.store.name].push({id:fp.id, ...fp.product, isOrdered: false}) 
    }else{
        filteredCartItemsByStore[fp.product.store.name] = [{id:fp.id, ...fp.product, isOrdered: false}]
    }
    
  })
  
  const handleDelete = (id) => {
    dispatch(cartItemDeleted(id))
  }

  const handleItemOrdered = (e, item) => {
    // const item = products.filter((pr) => cartItemProductsIds.includes(pr.id))
    // const item = filteredCartItemsByStore
    e.preventDefault()
    const cartItemProductsIds = item[1].map((pr) => Object.assign({id:pr.id, changes: {isOrdered: true}}) )
    console.log('dispatching', cartItemProductsIds)
    
    dispatch(cartItemOrdered(cartItemProductsIds))
    
    const nos = Object.keys(items).filter((item) => items[item].isOrdered === true)
    console.log('new orders', nos)
    // setOrderedItems([item[0], nos.map((i)=> products[i].product)])

    
  }
  const hasBeenOrdered = (el, idx, arr) => {
    return el.isOrdered === true
  }
  const CartItemProduct = ({isOrdered, product}) => {
    const Line = () => (
      <div className="absolute w-full line h-[0px] my-[40px] z-0 border-[1px] border-gray-500">

      </div>
    )
    return (
      <div id="product_wrapper" 
        className="relative w-auto h-[10rem] py-6 mx-8  p-1 flex justify-between gap-1 border-b-[1px] border-b-gray-300 ">
        <div id="product_details" 
          className="w-max lg:w-[40rem] xl:w-[40rem] flex justify-start">
          <div id="product_image" 
            className=" h-[5rem] px-2 flex justify-center items-center">
            <img 
              className="w-full h-full object-contain" src={img[product.img_path_id]} alt="IGM" />
          </div>
          <div id="product_description" 
            className="w-[15rem] md:w-[20rem] lg:w-max xl:w-max flex flex-col justify-between">
            <p 
              className=" h-[5rem] overflow-y-hidden">
              {product.name.toString().length > 12 ? product.name.slice(0,90) + "..." : product.name}
            </p>
            <div id="product_tags" 
              className="w-max  flex flex-col lg:flex-row xl:flex-row justify-between ">
              <div 
                className="w-max flex ">
                <div 
                  className="w-max h-[2rem] p-2 flex justify-center items-center border-[1px] border-[#2967FF] rounded-r-3xl rounded-bl-xl text-md text-[#2967FF] font-raleway font-semibold" >
                  <p> 120 шт. </p>
                </div>
                <div 
                  className="w-max h-[2rem] p-2 flex justify-center items-center -z-10 border-t-[1px] border-r-[1px] border-b-[1px] border-[#FF2D87] rounded-r-3xl ext-md text-[#FF2D87] font-raleway font-semibold ">
                  <p>за 12:48:35</p> 
                </div>
              </div>
              <div id="purchased_count" 
                className=" w-max flex justify-between items-center gap-1 font-raleway">
                <p>
                  Куплено:
                </p>
                <p 
                  className="font-semibold">
                  150 шт.
                </p>
              </div>
            </div>  
          </div>
        </div>
        
        <div id="product_quantity" 
          className="w-max md:w-max flex flex-col-reverse md:flex-col-reverse lg:w-[20rem] lg:flex lg:flex-row xl:flex xl:flex-row justify-between gap-4">
          <div id="product_count" 
            className=" w-max md:w-[8rem] lg:w-[8rem] h-[2.5rem] p-2 flex justify-around gap-4 border-[1px] items-center border-gray-300 rounded-3xl">
            <p 
              className="px-3">-</p>
            <input  
              className="w-[1.4rem] flex justify-center items-center  decoration-transparent bg-transparent " type="text" value="25" disabled="disabled" />
            <p 
              className="px-3">+</p>
          </div>
          <div id="product_price" 
            className="w-max md:w-full lg:w-[60%] xl:w-full">
            <h2 id="new_price" 
              className=" text-[#2967FF] text-[1.3rem] font-semibold">
            {'от ' + (product.isDiscounted[0] ? product.isDiscounted[2] : product.price) +' ₽'}
            </h2>
            <div id="discounted_price" 
              className="w-[70%] flex pr-2 justify-between ">
              <h4 id="old_price" 
                className="text-[#8D8D8E] text-s line-through font-extralight">
              {product.isDiscounted[0] ? product.price +' ₽' : ''}
              </h4>
            </div>
          </div>
        </div>
        <button id="delete_btn" 
          className=" py-2 flex flex-col  justify-start" onClick={()=>handleDelete(product.id)}>
            <DeleteIco />
        </button>
        {isOrdered && <Line></Line>}
      </div>
    )
  }

  const CartItem = ({store,isOrdered,products})=> { 
   let totalPrice = 0
   
    // console.log(isOrdered && )
    products.forEach((pr) => {
      totalPrice += (pr.isDiscounted[0] ? pr.isDiscounted[2] : pr.price)
    })
    const disableItem = "filter grayscale contrast-50"
    
    return (
        <div id={"cart_item__wrapper"+(isOrdered ? disableItem : "" ) }
          className="w-full flex flex-col mb-2">
          <div id="cart_item__header" 
            className="p-2 flex justify-around items-center  border-[1px] border-gray-300 rounded-lg text-xl font-raleway">
            <div id="item_name" 
              className="font-bold">
              <h4>{store}</h4>           
            </div>
            <div id="cart_item__total_price" 
              className="">
              <p 
                className=" ">
                Стоимость корзины:
              </p>
              <p 
                className=" text-black text-xl font-bold">
                {totalPrice+' ₽'} 
              </p>
            </div>
            <div id="Checkout_btn"  
              className="w-[10rem] h-[2.5rem] px-8 py-5 bg-[#2967FF] border-[1px] border-[#2967FF] flex justify-center items-center rounded-3xl text-white font-medium " onClick={(e)=>handleItemOrdered(e,[store, products])}>
              {/* <Link to={{pathname: "/checkout"}} state={{totalPrice, prCount:products.length}}  > Оформить </Link> */}
            </div>
            <div id="item_ico">
            
            </div>
          </div>
          {
            products.map((pr) => <CartItemProduct key= {pr.id} isOrdered={isOrdered}  product = {pr}  /> )
          }
          
          
        </div>
      )
  }

  const NoItems = ()=>(
    <div id="no_items" 
      className="w-full flex flex-col justify-center items-center">
      <div id="no_items_banner__header" 
        className="text-base text-black font-raleway font-semibold">
        <h3>
          🙅 looks like no items here 👀
        </h3>
      </div>
      <div id="no_items_banner__footer" 
        className="text-lg text-black font-raleway font-bold">
        <h3>
          😃 Try adding a product first 😃
        </h3>
      </div>
    </div>
  )

  const OrderedItems = () =>(
    <>
      {orderedItems.map((item,idx) => {return <CartItem key={idx} isOrdered={item[1].some(hasBeenOrdered)} store={item[0]}  products={item[1]}/> })}
    </>
  )
  return (
    <div id="cart_container" 
      className="w-full flex flex-col justify-center ">
      <div id="cart_header" 
        className=" flex justify-start gap-6 items-baseline">
        <div 
          className="text-lg text-black font-raleway font-[800]">Корзина</div>
        <div 
          className="text-md text-[#FF2D87] font-raleway font-semibold">Очистить корзину</div>
      </div>
      <div id="cart_content" 
        className="w-[98%] mx-4 flex flex-col pb-1 border-[1px] border-gray-300 rounded-lg ">
        
        { ids.length > 0
          
          ? Object.keys(filteredCartItemsByStore).map((store,idx) => {return <CartItem key={idx} store={store}  products={filteredCartItemsByStore[store]}/> })
            
          // ? <CartItem productIds={ids}/> 
          : <NoItems/>
        }
        { orderedItems.length > 0
          
          ? <OrderedItems/>
            
          // ? <CartItem productIds={ids}/> 
          : null
        }
        
      </div>
    </div>
  )
}

export default Cart
