import moment from 'moment';
import React from 'react'
import { useEffect } from 'react';
import { useState } from 'react'
import { connect, useSelector } from 'react-redux';
import { createDispatchHook } from 'react-redux';
import { Link } from "react-router-dom";
import { imagepath, imagepaths } from '../assets/images';
import { created, removed } from '../orm/actions/actionTypes';

import { productSession, orderSession, categorySession, imageSession, productVariationSession, productVariationProperrtyListValueSession, productVariationProperrtySession, productVariationProperrtyValueSession, session } from '../orm/reducers/rootOrmReducer';
import { filteredProductsFromModel, filteredCategoriesFromModel, filteredOrdersFromModel, filteredCustomModelSelector } from '../orm/selectors';
import Product from './Product';
import { useDispatch } from 'react-redux';
import { ImageMagnifier } from '.';



const OrmReader = () => {
  const [excludedIds, setExcludedIds] = useState([])
  const [modalContent, setModalContent]= useState({})
  const products = useSelector(filteredProductsFromModel(excludedIds))
  const categories = useSelector(filteredCategoriesFromModel(excludedIds))
  const orders = useSelector(filteredOrdersFromModel())
  const useGet=(model)=> useSelector(filteredCustomModelSelector(model))
  const dispatch = useDispatch();
  const img_root = imagepath;

  // useEffect(() => {
  //   // dispatch(asyncThunk())
  
  //   // return () => {
  //   //   second
  //   // }
  // }, [dispatch])
  
  
  
  console.log("returned products", products, excludedIds)
  const handleFilter = (type,id)=> {
    console.log("click",id)
    if(type ==="add")setExcludedIds(prevState => prevState.includes(id)? prevState : [...prevState, id])
    if (type === "remove") setExcludedIds(prevState => prevState.filter(el => el !== id))
    if (type === "remove" && id === -1) setExcludedIds([])
    // if(id) products = products.filter(p=> p.category_id !== id)
  }
  
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
    // console.log(formName)
    switch (submitType) {
      case "to_product":
        // [...document.forms[formName]].map((i) => { if (i.tagName === "SELECT" && i.value) form["data"] = i.value })
        // productSession.create(form['data'])
        //   && console.log(productSession.all().toRefArray())
          // && setProducts([...productSession.all().toRefArray()])
        break;
      case "to_order":
        const action = {

          // type: 'orm/Order_CREATE',
          // payload: {
            DateCreated: momentDate(),
            product_id: id
          // }
        }
        // [...document.forms[formName]].map((i) => { if (i.tagName === "SELECT" && i.value) form["data"] = i.value })
        // console.log(action)
        // created(action)
        //(action)
        dispatch(created('Order')(action))
        // console.log("dispatching orders",dispatch() )

          
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
  const ProductLoading = () =>{
    const a = new Array(8)
    return(
      <div className="loading_container">
        {
          a.map((i,x)=>{
            return <Product id={x} />
          })
        }
      </div>
    )
  }
  const Carousel = ({ images,hasSubItems }) => {
    const Image = ({ imagepath, hasMaxW }) => (
      <div className={" w-auto "+ hasMaxW+" aspect-square p-1"}>
        <img alt="gallery" className="w-full object-cover h-full object-center block" src={imagepath} />
      </div>

    )
    return (
      <div className="w-full flex flex-row self-end justify-center bg-white overflow-x-scroll scrollbar rounded-t-sm">
        {
          images.map((image, idx) => {
            // console.log(image)
            return <Image key={idx} imagepath={img_root(+image.id)} hasMaxW={(hasSubItems) ? "max-w-[5rem]" : "max-w-[10rem]"} />
          })
        }
      </div>
    )
  }

 
  const ProductItem = ({product, showDetailed})=>{
    // console.log("pro", product)
    return (
      <div id="product_to_show" className={(showDetailed ? "w-[21rem]  " : "w-auto ") +"p-0 flex flex-col bg-white shadow-lg border border-gray-200 rounded-md" + (showDetailed ? " z-50" :"")}>
        <div className="product_header flex flex-col justify-between object-scale-down rounded-md">
          <span slot={""} className={"w-5 h-5 self-end items-center text-sm cursor-pointer"} onClick={(e) => setModalContent({})}> ❎ </span>
            <Carousel images={[product.images[0]]} />
          
          {
            showDetailed ? 
              <Carousel images={product.images.concat(product.images)} hasSubItems />
            :""
          }
          
          
        </div>
        <div className="product_body rounded-md">
          <div className="h-[100%] flex flex-col border border-gray-400 rounded-md">
            <div className="w-full px-1 flex justify-around bg-lime-500 cursor-pointer sticky top-0">
              <span >{product.name.toString().slice(0, 8)}</span>
              <span>
                <button type='text' onClick={()=>setModalContent(product)}>
                  🔎
                </button>
              </span>
              <span>
                <button type='text' onClick={(e) => handleAdd(e, 'to_order', product.id)}>
                  💰
                </button>
              </span>
            </div>
            <span className="w-full h-full p-1 flex flex-col self-end gap-3 rounded-md">
              {
                showDetailed ?
                  <span >{product.description.toString()}</span>
                  : ""
              }
              
              <span className="w-full px-2 flex flex-row justify-between gap-4 border border-gray-400 rounded-md overflow-x-scroll scrollbar">
                <span >
                  {/* {or.DateCreated.toString().slice(0,18)} */}
                  ${product.variations[0]?.price} - ${product.variations?.pop().price}
                  <br />
                  {/* available: {prop.stock} */}
                </span>
                {
                  
                  
                  showDetailed ?
                  (
                    product.variations
                      ?
                      product.variations.map((prop, idx) => {
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
                  )
                  : ""
                }
              </span>
            </span>


          </div>
        </div>
      </div>
    )
  }
  const AccordionStyleProductItem = ({product})=>{
    return (
      <details className="w-56 flex flex-col justify-between border border-gray-400 rounded-md overflow-y-scroll  scrollbar ">
        <summary className="w-full flex justify-between bg-lime-500 cursor-pointer sticky top-0">
          <span >{product.name.toString().slice(0, 8)}</span>
          <span className="cursor-pointer" onClick={(e) => setModalContent(product)}>{modalContent.id === product.id ? '➖' : '➕'}</span>
          <span className="cursor-pointer" onClick={(e) => handleAdd(e, 'to_order', product.id)}>🛒</span>

        </summary>
        <span className="w-52 flex flex self-end justify-around bg-yellow-300">
          <span>
            catId: {product.category_id}
          </span>

          {
            product.variations
              ?
              (

                <span className="w-max pl-6 flex flex-row self-end justify-between gap-8 border border-gray-400 rounded-md ">
                  <span>
                    variations: {product.variations.length}
                    {/* <br />
                            single price: ${prop.price}
                            <br />
                            available: {prop.stock} */}
                  </span>
                </span>
              )

              : null
          }

        </span>

      </details>
    )
  }
  const ShowProduct = () => {
    if (!modalContent.id) return (<div className='hidden'></div>)
    return (
      <div className="modal fixed bottom-0 w-[100vw] h-[100vh] grid place-content-center z-30">
        <div className="modal-backdrop absolute w-[100%] h-[100%] top-0 left-0  bg-gray-700 opacity-70 z-40 scroll">
        </div>
        <ProductItem  product={modalContent} showDetailed />
      </div>
    )
  }
  const ProductField = () => {
    return(
      <div className="mx-2">
          <div>
            
            <p> products: </p>
            <div className="flex flex-wrap gap-2">
            {products?.map((product,idx)=> {
              return (
                <>
                {/* <Product id={idx} product={product}/> */}
                  {/* <AccordionStyleProductItem key={idx} product={product} /> */}
                <ProductItem key={idx} product={product} />
                </>
               
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
            <span className=" flex gap-2">
              <table className=" table w-full">
                <thead className="outline outline-2">
                  <tr >
                    <th className="outline outline-1">
                      Item
                    </th>
                    <th className="outline outline-1">
                      Product Id
                    </th>
                    <th className="outline outline-1">
                      Date ordered
                    </th>
                  </tr>
                </thead>
                <tbody>
                {orders?.map((order,idx)=> {

                  return (
                    
                      <tr key={idx} className="outline outline-1">
                        <td className="outline outline-1">
                          {order.id+1}
                        </td>
                        <td className="outline outline-1">
                          {order.product_id}
                        </td>
                        <td className="outline outline-1">
                          {order.DateCreated}
                        </td>
                      </tr>
                    
                    
                  )
                })}
                <tr  className="h-[26px] outline outline-1">
                  <td className="outline outline-1">
                    
                  </td>
                  <td className="outline outline-1">
                    
                  </td>
                  <td className="outline outline-1">
                    
                  </td>
                </tr>
                </tbody>
              </table>
            </span>
          </div>
        </div>
      )
  }
  const CategoryField = () => {
    const data = useGet("ProductVariationProperty")
    const data1 = useGet("ProductVariationPropertyListValue")
    const data2 = useGet("ProductVariationPropertyValue")
    const data3 = useGet("ProductCategory")
    console.log("data", data2)
    const makeUniq = (k1, k2, k3, k4) => ((k1 + k2 + (k3 * 100)) + 1 + (k4 * 10))
    const getUniq = (v,k2,k3,k4) => (v - (( k2 + (k3 * 100)) + 1 + (k4 * 10)))
    
    const CategoryItem =({item, uniqKey})=>(
      <>
        <span className={" w-max px-[4px] aspect-auto  bg-slate-300 border border-black rounded text-[10px] font-bold font-montserrat"}>
          {item.id}
        </span>
        <span className="flex flex-shrink flex-row flex-wrap">

          {
            Object.entries(item).filter((i) => i[0] !== "id").map((itm, i) => {
              return (
                <span key={i} className={" relative w-max m-[1px] px-[1.2px] justify-center bg-amber-600 border border-black rounded"}  >
                  <span slot={makeUniq(item.id, uniqKey.id, uniqKey.index, i)} className="" onClick={(e) => handleFilter("add", Number.parseInt(getUniq(e.target.slot, uniqKey.id, uniqKey.index, i)))} >
                    {itm[0].length > 10 ? itm?.toString().slice(0, 8) : itm[0]}
                    : 
                    {itm[1].toString().length > 10 ? itm[1]?.toString().slice(0, 8) : itm[1]}
                  </span>
                  <span slot={makeUniq(item.id, uniqKey.id, uniqKey.index, i)} className={"absolute top-1 right-0 w-5 bg-amber-600 aspect-square  justify-center items-center text-sm rounded-lg" + (excludedIds.includes(getUniq(makeUniq(item.id, uniqKey.id, uniqKey.index, i), uniqKey.id, uniqKey.index, i)) ? " selected" : " hidden")} onClick={(e) => handleFilter("remove", Number.parseInt(getUniq(e.target.slot, uniqKey.id, uniqKey.index, i)))}> ❎ </span>
                </span>
              )
            })
          }
        </span>
      </>  
      
    )
    const CategoryTag = ({ uniqKey, data}) =>(
      <span key={uniqKey.index} className="  w-auto p-1 flex flex-col  gap-1 items-baseline bg-teal-400 border border-black rounded-lg cursor-pointer ">
        <CategoryItem item={data} uniqKey={uniqKey}/>
      </span>
    )
    
    const CategoryList = ({title,id,categories}) => (
      <>
        <h2>
          {title}:
        </h2>
        <div id="show_cats" className=" grid grid-flow-row grid-cols-3 grid-rows-2 justify-start gap-2 overflow-x-scroll scrollbar">
          {
            categories?.map((cat, idx) => {
              
              return (
                
                  <CategoryTag key={idx} uniqKey = {{index:idx, id}} data={cat}/>
                  
              )
            })
          }
        </div>
      </>
     
    )
    return (
      <div id="cat" className="max-w-[92%] mx-2 flex flex-col">
        <div className=" w-max p-1 flex bg-amber-600 border border-black  rounded-lg cursor-pointer">
          <span slot={-1} className={"w-5 h-5 self-end items-center text-sm rounded-lg"} onClick={(e) => handleFilter("remove", Number.parseInt(e.target.slot))}> ❎ </span>
        </div>
        <CategoryList title={"Categories"} id={1000} categories={categories.slice(0,6)} />
        <CategoryList title={"Product property"} id={2000} categories={data.slice(0, 6)}/>
        <CategoryList title={"Product property list value"} id={3000} categories={data1.slice(0, 6)}/>
        <CategoryList title={"Product property value"} id={4000} categories={data2.slice(0, 6)} />
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

  return (
    <>
      <Link to={"/"} className="mx-2"> 🏠</Link>
      <p>--- OrmReader ---</p>
      {/* input form for  adding and updating to model */}
      <div className="flex flex-col-reverse gap-2 fields">
        {/* <ProductField/> */}
        <ImageMagnifier img_root={img_root} products={products} />
        <OrderField/>
        {/* <CategoryField /> */}
        {/* <ListingsField/> */}
        <ShowProduct/>
        {/* <Product /> */}
      </div>
    

    </>
    
  )
}

export default OrmReader