import moment from 'moment';
import React from 'react'
import { useState } from 'react'
// import { session } from '../orm_models/ProductModel'
import { Link } from "react-router-dom";
import { session } from '../orm_reducers/rootOrmReducer';

const OrmReader = () => {
  const [books, setBooks] = useState([...session.Product.all().toRefArray()])
  const [orders, setOrders] = useState()
  let productSession = session.Product;
  let orderSession = session.Order;
  

  
  const handleAdd=(e, submitType)=>{
    e.preventDefault()
    let form = new FormData();
    [...document.forms['add_books']].map((i)=> { if(i.labels.length> 0 && i.type !== 'submit') form[i.name] =i.value })

    console.log(form)
    submitType === "new product"
    ? (
      productSession.create(form) 
      && console.log(session.Product.all().toRefArray())
      && setBooks([...session.Product.all().toRefArray()])
    )
    : submitType === "order"
    ? (
      orderSession.create({
        DateCreated: moment().toDate().getDate(),
        productId: books[books.length-1].id
      })
      && console.log(orderSession.all().toRefArray())
      && setOrders([session.Product.count()])
    )
    : console.error("TypeError: submitType not found.")
    
    
  
  }
 

  const ProductField = () => {
    return(
        <div className="">
          <div className="flex flex-col">

            <form  id="add_books" className="w-[12rem] flex flex-col"  onSubmit={(e)=>handleAdd(e, "new product")} >
              <label htmlFor="book_name">
                name
              </label>
              <input id='book_name' name='name' type="text" className="border " />
              <label htmlFor="book_price">
                price
              </label>
              <input id='book_price' name='price' type="text" className="border " />
              
              <input type="submit" value="submit" className="border "/>
            </form>
          </div>
          <div>
            
            <p> products: </p>
            <p className="flex flex-col">
            {books?.map((book,idx)=> {
              return <span key={idx}>{book.title}</span>
            })}</p>
          </div>
        </div>
      )
      }
  const OrderField = () => {
    return (
        <div >
          <div className="flex flex-col">
            <form action=""onSubmit={(e)=>handleAdd(e, "order")}>
              <input type="submit" value="order" className="border "/>
              
            </form>
          </div>
          <div>
            <p> orders: </p>
            <p className="flex flex-col">
            {orders?.map((order,idx)=> {
              return <span key={idx}>{order}</span>
            })}</p>
          </div>
        </div>
      )
  }
  
  return (
    <>
    <Link to={"/"}> 🏠</Link>
    <p>--- OrmReader ---</p>
    {/* input form for  adding and updating to model */}
    <div className="flex gap-2 fields">
      <ProductField/>
      <OrderField/>
    </div>
    

    </>
    
  )
}

export default OrmReader