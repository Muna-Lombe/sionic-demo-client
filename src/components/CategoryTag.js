import React from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { selectcategories } from '../js/slices/filters/categoriesSlice'
import {setCurrCatId } from '../js/slices/products/productsSlice'

const CategoryTag = ({id=1,text='tag'})=>{
  const bearTag = 'bg-[#FFA601] '
  const toyTag = 'bg-[#2967FF]'
  const marmosetTag = 'bg-[#58CF18]'
  const giftTag = 'bg-[#FF7CB4]'
  const colleaguesTag = 'bg-[#FFA601]"'
  const birthdayTag = 'bg-[#FF2D87]'
  
  const tags = useSelector(state => state.categories.entities)
  const dispatch = useDispatch()
  

  const handleScroll = (e) =>{
    e.preventDefault();
    e.stopPropagation();
    console.log('drag to scroll')
    console.log(e)
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    })
  }
  const handleFilter = (catId) => {
    console.log(catId)
    dispatch(setCurrCatId(catId))
    // setCatId(catId)
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
        <h2 onClick={()=> handleFilter(id)}>
        {text}
        </h2>
      </div>
    )
  }
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
        text-white 
        text-[0.9rem] 
        font-sans 
        font-semibold 
        cursor-pointer
        ${tags[id]}
      `}
      onMouseDown={(e)=>handleScroll(e)}

    >
      <h2 onClick={()=> handleFilter(id)}>
      {text}
      </h2>
    </div>
  )
  }

export default CategoryTag;
