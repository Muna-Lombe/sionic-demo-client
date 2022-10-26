import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { useSelector } from 'react-redux';
import { useDispatch } from 'react-redux';
import { createDispatchHook } from 'react-redux';
import { Link } from "react-router-dom";
import { imagepath, imagepaths } from '../assets/images';
import { cartItemAdded } from '../js/slices/cart/cartSlice';



import { productSession, orderSession, categorySession, imageSession, productVariationSession, productVariationProperrtyListValueSession, productVariationProperrtySession, productVariationProperrtyValueSession, session } from '../orm/reducers/rootOrmReducer';
// import { selectProducts, selectProduct } from '../orm/reducers/slices/ormProductSlice';
import { filteredProductsFromModel, filteredCategoriesFromModel, filteredOrdersFromModel } from '../orm/selectors';

import Product from './Product';

const OrmReader = () => {
  // console.log(imageSession.all().toModelArray() )
  // const [products, setProducts] = useState([
  //   ...productSession.all().toRefArray().map((p,idx)=> { 
  //     return {
  //       ...p, 
  //       orders: productSession.at(idx).orders.toRefArray(),
  //       images: productSession.at(idx).productImages.toRefArray(),
  //       variations: productSession.at(idx).productVariations.toRefArray().map((prop,idx)=>{
  //         return {
  //           ...prop,
  //           properties: productVariationSession.at(idx).properties.toRefArray(),

  //         }
  //       })},

  //     }
  //   })
  // ])
  // const [orders, setOrders] = useState([...orderSession.all().toRefArray()])
  // const [categories, setCategories] = useState([...categorySession.all().toRefArray()])
  // console.log("state", session.state)
  // // console.log(productSession())
  // useEffect(()=>{
  //   setProducts([
  //     ...productSession.all().toRefArray().map((p,idx) => { 
  //       return { 
  //         ...p, 
  //         orders: productSession.at(idx).orders.toRefArray(),
  //         images: productSession.at(idx).productImages.toRefArray()
  //       } 
  //     })
  //   ])
  // },[orders])
  const [excludedIds, setExcludedIds] = useState([])
  const [modalContent, setModalContent]= useState({})
  const products = useSelector(filteredProductsFromModel(excludedIds))
  const categories = useSelector(filteredCategoriesFromModel(excludedIds))
  const orders = useSelector(filteredOrdersFromModel())
  const handleFilter = (type,id)=> {
    console.log("lick",id)
    if(type ==="add")setExcludedIds(prevState => prevState.includes(id)? prevState : [...prevState, id])
    if (type === "remove") setExcludedIds(prevState => prevState.filter(el=>el!==id))
    // if(id) products = products.filter(p=> p.category_id !== id)
  }
  console.log("products", products)
  // console.log("state", session.state)
  console.log("categories", categories)
  console.log("state", session.state)
  const dispatch = useDispatch;
  const img_root = imagepath//"/home/muna/code/Muna-Lombe/tutorials/React/sionic-test/sionic/src/assets/tests/jsonServer/images/";
  const handleAdd=(e, submitType,id)=>{
    e.preventDefault()
    console.log(e)
    let form = [new FormData()];
    let formName = e.target.name;
    

    let momentDate = () => {
      let time = moment().toDate().toTimeString()
      let date = moment().toDate().getDate()
      let month = moment().toDate().getMonth()
      let year = moment().toDate().getFullYear()
      return year+"-"+month+"-"+date+","+time
    }
    console.log(formName)
    switch (submitType) {
      case "to_product":
        [...document.forms[formName]].map((i) => { if (i.tagName === "SELECT" && i.value) form["data"] = i.value })
        productSession.create(form['data'])
          && console.log(productSession.all().toRefArray())
          // && setProducts([...productSession.all().toRefArray()])
        break;
      case "to_order":
        const action = {
          type: 'orm/Order_CREATE',
          payload: {
            DateCreated: momentDate(),
            product_id: id
          }
        }
        // [...document.forms[formName]].map((i) => { if (i.tagName === "SELECT" && i.value) form["data"] = i.value })
        // dispatch(action)
        
        console.log("dispatching orders")

          // && setOrders([...orderSession.all().toRefArray()])
        break;
      case "to_category":
        if(formName === "add_cat"){
          [...document.forms[formName]].map((i) => { if (i.tagName === "INPUT" && i.type === "text" ) form["data"] = i.value })
          categorySession.create({
            name: form['data']
          })
            // && setCategories([...categorySession.all().toRefArray()])
        }
        if(formName === "add_to_cat"){ 
          [...document.forms[formName]].map((i) => { if (i.tagName === "SELECT" && i.value) form["data"] = i.value })
          console.log("prod", productSession.withId(form['data']))
          //   categorySession.products().add({
          //   name: form['data']
          // })
          // && setCategories([...categorySession.all().toRefArray()])
        }
        break;
    
      default:
        break;
    }
    
    
  
  }
 

  const ProductField = () => {
    return(
      <div className="mx-2">
          {/* <div className="flex flex-col">
            <p>product field</p>
            <form  id="add_products" className="w-[12rem] flex flex-col"  onSubmit={(e)=>handleAdd(e, "to_order")} >
                <select name="" id="" className="w-full flex flex-row justify-between border border-gray-400 rounded-md ">
                  {products?.map((product,idx)=> {
                    return (
                        <option key={idx} name={product.name} value={[product.id]}>
                        {product.name} = ${product.description.toString().slice(0, 5)}
                        </option>  
                    )
                  })}
                </select>
              <input type="submit" value="submit" className="border "/>
            </form>
          </div> */}
          <div>
            
            <p> products: </p>
            <div className="flex flex-wrap gap-2">
            {products?.map((product,idx)=> {
              return (
                <details key={idx}  className="w-56 flex flex-col justify-between border border-gray-400 rounded-md overflow-y-scroll  scrollbar ">
                  <summary className="w-full flex justify-between bg-lime-500 cursor-pointer sticky top-0">
                    <span >{idx + 1}.{" "}{product.name.toString().slice(0, 8)}</span>
                    <span className="cursor-pointer" onClick={(e) => setModalContent(product)}>{modalContent.id === product.id ? '➖' : '➕'}</span>
                    <span className="cursor-pointer" onClick={(e) => handleAdd(e,'to_order',product.id)}>🛒</span>
                    
                  </summary>
                  <span className="w-52 flex flex-col self-end justify-around bg-yellow-300">
                    {
                      product.variations
                      ? 
                      (
                          <span className="w-full pl-6 flex flex-row self-end justify-between gap-8 border border-gray-400 rounded-md ">

                            <span>
                              variations: {product.variations.length}
                              {/* <br />
                            single price: ${prop.price}
                            <br />
                            available: {prop.stock} */}
                            </span>
                          </span>
                      )
                      
                      :null
                    }
                  </span>
                
                </details>
              )
            })}</div>
          </div>
        </div>
      )
      }
  const OrderField = () => {
    return (
        <div >
          <div className="flex flex-col">
            {/* <form action=""onSubmit={(e)=>handleAdd(e, "to_order")}>
              <input type="submit" value="order" className="border "/>
            </form> */}
          </div>
          <div>
            <p> orders: </p>
            <p className="flex flex gap-2">
            {orders?.map((order,idx)=> {
              return <span key={idx}>{order.productId}</span>
            })}</p>
          </div>
        </div>
      )
  }
  const CategoryField = () => {
    return (
      <div id="cat" className="max-w-[92%] mx-2 flex flex-col">
        <h2>
          Categories
        </h2>
        <div id="show_cats" className=" flex flex-row justify-start gap-2 overflow-x-scroll scrollbar">
          {
            categories?.map((cat,idx)=>{
              return (
                <span key={idx} className="w-auto px-1 flex gap-1 items-baseline bg-teal-400 border border-black rounded-lg cursor-pointer "> 
                  <span slot={cat.id} className="" onClick={(e)=>handleFilter("add", Number.parseInt(e.target.slot))} >
                    {cat.name.toString().slice(0,3)}
                  </span> 
                  <span slot={cat.id}  className={"w-5 h-5 self-end items-center text-sm" + (excludedIds.includes(cat.id) ? " selected" : " hidden")} onClick={(e)=>handleFilter("remove", Number.parseInt(e.target.slot))}> ❎ </span>
                </span>
              )
            })
          }
        </div>
      </div>
    )
  }
  const ListingsField = () => {
    return (
      <div id="listings" className="max-w-[92%] mx-2 flex flex-col">
        <h2>
          Listings
        </h2>
        <div id="show_listings" className=" flex flex-row justify-start gap-2 overflow-x-scroll scrollbar">
          {
            categories?.map((cat, idx) => {
              return (
                <span key={idx} className="w-auto px-1 flex gap-1 items-baseline bg-teal-400 border border-black rounded-lg cursor-pointer ">
                  <span slot={cat.id} className="" onClick={(e) => handleFilter("add", Number.parseInt(e.target.slot))} >
                    {cat.name.toString().slice(0, 3)}
                  </span>
                  <span slot={cat.id} className={"w-5 h-5 self-end items-center text-sm" + (excludedIds.includes(cat.id) ? " selected" : " hidden")} onClick={(e) => handleFilter("remove", Number.parseInt(e.target.slot))}> ❎ </span>
                </span>
              )
            })
          }
        </div>
      </div>
    )
  }
  const Carousel =({images})=>{
    const Image = ({imagepath})=>(
        <div className=" w-[100px] p-1">
          <img alt="gallery" className="w-full object-cover h-full object-center block" src={imagepath} />
        </div>
      
    )
    return(
      <div className="w-full flex flex-row self-end justify-center bg-yellow-300 overflow-x-scroll scrollbar rounded-t-sm">
            {
              images.map(image =>{
                console.log(image)
                return <Image imagepath={img_root(+image.id)} />
              })
            }
          </div>
    )
  }
  const ShowProduct= () => {
    if(!modalContent.id) return(<div className='hidden'></div>)
    return (
      <div className="modal fixed bottom-0 w-[100vw] h-[100vh] grid place-content-center z-30">
        <div className="modal-backdrop absolute w-[100%] h-[100%] top-0 left-0  bg-gray-700 opacity-70 z-31 scroll">
        </div>
        <div id="product_to_show" className="w-[18rem] p-0 flex flex-col bg-slate-100 rounded-md z-40">
          <div className="product_header flex flex-col justify-between bg-card-backdrop object-scale-down rounded-md">
              <span slot={""} className={"w-5 h-5 self-end items-center text-sm cursor-pointer"} onClick={(e) => setModalContent({})}> ❎ </span>
              <Carousel images={modalContent.images}/>
          </div>
          <div className="product_body rounded-md">
            <div  className="h-[100%] flex flex-col border border-gray-400 rounded-md">
              <div className="w-full px-1 bg-lime-500 cursor-pointer sticky top-0">
                <span >{modalContent.name.toString().slice(0, 8)}</span>
              </div>
              <span className="w-full h-full p-1 flex flex-col self-end gap-3 bg-yellow-300 rounded-md">
                <span >{modalContent.description.toString()}</span>
                <span  className="w-full px-2 flex flex-row justify-between gap-4 border border-gray-400 rounded-md overflow-x-scroll scrollbar">

                {
                  modalContent.variations
                    ? 
                    modalContent.variations.map((prop, idx) => {
                      return (

                        <span key={idx}>
                            {/* {or.DateCreated.toString().slice(0,18)} */}
                            ${prop.price}
                            <br />
                            available: {prop.stock}
                          </span>
                        )
                    })
                    
                    : null
                }
                </span>
              </span>
              

            </div>
          </div>
        </div>
      </div>
    )
  }
  return (
    <>
      <Link to={"/"} className="mx-2"> 🏠</Link>
      <p>--- OrmReader ---</p>
      {/* input form for  adding and updating to model */}
      <div className="flex flex-col-reverse gap-2 fields">
        <ProductField/>
        <OrderField/>
        <CategoryField />
        {/* <ListingsField/> */}
        <ShowProduct/>
        {/* <Product /> */}
      </div>
    

    </>
    
  )
}

export default OrmReader