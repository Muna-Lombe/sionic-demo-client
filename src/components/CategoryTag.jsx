import React from 'react'
import { useDispatch, useSelector } from 'react-redux'

import { CancelIco, colorTags } from '../assets'
import {updatedAllCatActive, updatedCatActive } from '../orm/models/ProductCategoryModel'
import { categories } from '../orm/selectors'
const CategoryTag = ({borderId=1,id,text='tag'})=>{

 let cat = useSelector(categories).find(c=> c.id === id)

  const dispatch = useDispatch()
  

  const handleScroll = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    })
  }

  const handleFilter = (catId, action) => {
    // console.log("filter our",catId)
    switch (action) {
      case "remove":
        // console.log(action)
        dispatch(updatedCatActive({ id: catId, set: { active: false} }))
        break;
      case "remove_all" :
        // console.log(action)
        dispatch(updatedAllCatActive({set:{active:false}}))
        break;
    
      case "add":
        // console.log(action)
        dispatch(updatedCatActive({ id: catId, set: { active: true } }))
        break;
    }
    // dispatch(setCurrCatId(catId))
    // setCatId(catId)
  }

  if (borderId === 'type_clear'){
    return(
      <div 
        id={`tag tag-${text}`} 
        className={`
          w-max 
          h-[1.6rem] 
          whitespace-nowrap 
          flex 
          justify-center 
          items-center 
          rounded-2xl 
          py-[0.2rem] 
          mx-1 
          px-4 
          border-2 
          border-gray-200 
          text-red-600
          text-[0.9rem] 
          font-sans 
          font-semibold
          cursor-pointer

        `}
        onMouseDown={(e)=>handleScroll(e)}
        
      >
        <h2 onClick={()=> handleFilter(0, "remove_all")}>
        {text}
        </h2>
      </div>
    )
  }
  if(text === 'День Рождения Гриши') {
    return(
      <div 
        id={`tag tag-${text}`} 
        className={`
          w-max 
          h-[1.6rem] 
          whitespace-nowrap 
          flex 
          justify-center 
          items-center 
          rounded-2xl 
          py-[0.2rem] 
          mx-1 
          px-4 
          border-2 
          border-[#FF2D87] 
          text-black 
          text-[0.9rem] 
          font-sans 
          font-semibold
          cursor-pointer

        `}
        onMouseDown={(e)=>handleScroll(e)}
        
      >
        <h2 onClick={()=> handleFilter(id||borderId)}>
        {text}
        </h2>
      </div>
    )
  }
  return(
    <div 
      id={`tag tag-${text}`} 
      className={`
        mx-1 
        py-[0.2rem] 
        px-2 
        w-max 
        h-[1.6rem] 
        flex 
        justify-center 
        items-center
        gap-2
        
        whitespace-nowrap 
        rounded-2xl 
        text-white 
        text-[0.9rem] 
        font-sans 
        font-semibold 
        cursor-pointer
        ${colorTags[borderId]}
      `}
      onMouseDown={(e)=>handleScroll(e)}

    >
      <h2 className="px-1" onClick={()=> handleFilter(id||borderId, "add")}>
      {text}
      </h2>
      {
        cat.active
        ?  <samp onClick={() => handleFilter(id||borderId,"remove" )}>
            <CancelIco/>
          </samp>
         
        : ''
      }
    </div>
  )
  }

export default CategoryTag;
