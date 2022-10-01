import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { createDispatchHook } from 'react-redux';
import { Link } from "react-router-dom";
// import db from '../assets/tests/jsonServer/db';

// import Get from '../assets/tests/Get';
// import { session } from '../orm_reducers/rootOrmReducer';
import { productSession, orderSession, categorySession, session } from '../orm/reducers/rootOrmReducer';
// import { productsSelector } from '../orm/selectors/modelSelectors';

// let get = new Get();
const OrmReader = () => {
  const [books, setBooks] = useState([...productSession.all().toRefArray().map(p=> { return {...p, orders: productSession.at(p.id).orders.toRefArray()}})])
  const [orders, setOrders] = useState([...orderSession.all().toRefArray()])
  const [categories, setCategories] = useState([...categorySession.all().toRefArray()])
  console.log("state", session.state)
  // console.log(productSession())
  useEffect(()=>{
    setBooks([...productSession.all().toRefArray().map(p => { return { ...p, orders: productSession.at(p.id).orders.toRefArray() } })])
  },[orders])

  
  const handleAdd=(e, submitType)=>{
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
          && setBooks([...productSession.all().toRefArray()])
        break;
      case "to_order":
        [...document.forms[formName]].map((i) => { if (i.tagName === "SELECT" && i.value) form["data"] = i.value })
        orderSession.create({
          DateCreated: momentDate(),
          product_id: form['data']
        })
          && setOrders([...orderSession.all().toRefArray()])
        break;
      case "to_category":
        if(formName === "add_cat"){
          [...document.forms[formName]].map((i) => { if (i.tagName === "INPUT" && i.type === "text" ) form["data"] = i.value })
          categorySession.create({
            name: form['data']
          })
            && setCategories([...categorySession.all().toRefArray()])
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
        <div className="">
          <div className="flex flex-col">
            <p>product field</p>
            <form  id="add_books" className="w-[12rem] flex flex-col"  onSubmit={(e)=>handleAdd(e, "to_order")} >
                <select name="" id="" className="w-full flex flex-row justify-between border border-gray-400 rounded-md ">
                  {books?.map((book,idx)=> {
                    return (
                        <option key={idx} name={book.name} value={[book.id]}>
                        {book.name} = ${book.description.toString().slice(0, 5)}
                        </option>  
                    )
                  })}
                </select>
              <input type="submit" value="submit" className="border "/>
            </form>
          </div>
          <div>
            
            <p> products: </p>
            <p className="flex flex-wrap gap-2">
            {books?.map((book,idx)=> {
              return (
                <span key={idx}  className="w-56 h-64 flex flex-col justify-between border border-gray-400 rounded-md ">
                  <span className="w-full flex justify-between bg-lime-500">
                    <span >{idx + 1}.{" "}{book.name}</span>
                    <span >${book.description.toString().slice(0,5)}</span>
                  </span>
                  <span className="w-52 flex flex-col self-end justify-around bg-yellow-300">
                    {
                      book.orders
                      ? book.orders.map((or,idx)=>{
                          return(
                            <span key={idx} className="w-full pl-6 flex flex-row self-end justify-between gap-8 border border-gray-400 rounded-md ">
                              
                              <span>
                                {or.DateCreated.toString().slice(0,18)}
                              </span>
                            </span>)
                        })
                      :null
                    }
                  </span>
                  
              </span>
              )
            })}</p>
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
      <div id="cat" className="w-[36rem] flex flex-col">
        <h2>
          Categories
        </h2>
        
        <div id="add_prd_to_cat" className="flex gap-2">
          {/* <form id="add_cat" name="add_cat" action="" onSubmit={(e) => (handleAdd(e,'to_category'))} className=" flex flex-col border border-slate-400">
            <label htmlFor="cat_name">
              Enter category name
            </label>
            <input id="cat_name" type="text" form='add_cat' className="w-max px-2  border border-gray-400 rounded-sm" />
            <input id="cat_type" type="text" form='add_cat' className="w-max px-2  border border-gray-400 rounded-sm"  />
            <input className="w-max px-2 self-end bg-red-500 border border-black rounded-sm cursor-pointer" type="submit" form='add_cat' value="add" />
          </form> */}
          <form id="add_to_cat" name="add_to_cat" className=" flex flex-col" onSubmit={(e) => handleAdd(e, "to_category")} >
            <select form="add_to_cat" name="" id="" className="w-max flex flex-row justify-between border border-gray-400 rounded-md ">
              {books?.map((book, idx) => {
                return (
                  <option key={idx} name={book.name} value={[book.id]}>
                    {book.name} = ${book.description.toString().slice(0, 5)}
                  </option>
                )
              })}
            </select>
            <input form="add_to_cat" type="submit" value="submit" className=" w-max px-2 self-end bg-red-500 border border-black rounded-sm cursor-pointer" />
          </form>
        </div>
        <div id="show_cats" className="w-full flex flex-row justify-start gap-2 overflow-x-scroll ">
          {
            categories?.map((cat,idx)=>{
              return (
                <span key={idx} className="w-auto px-1 flex flex-row flex-nowrap bg-teal-400 border border-black rounded-sm "> <span className="w-full flex flex-row flex-nowrap" >{cat.name}</span> <span className="w-5 h-5 self-end cursor-pointer"> ❎ </span></span>
              )
            })
          }
        </div>
      </div>
    )
  }
  
  return (
    <>
      <Link to={"/"}> 🏠</Link>
      <p>--- OrmReader ---</p>
      {/* input form for  adding and updating to model */}
      <div className="flex flex-col-reverse gap-2 fields">
        {/* <ProductField/> */}
        {/* <OrderField/> */}
        <CategoryField />
      </div>
    

    </>
    
  )
}

export default OrmReader