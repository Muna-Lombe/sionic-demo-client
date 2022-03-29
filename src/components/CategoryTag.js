import React from 'react'

const CategoryTag = ({color='#2967FF',tag='tag'})=>{
  const bearTag = 'bg-[#FFA601] '
  const toyTag = 'bg-[#2967FF]'
  const marmosetTag = 'bg-[#58CF18]'
  const giftTag = 'bg-[#FF7CB4]'
  const colleaguesTag = 'bg-[#FFA601]"'
  const birthdayTag = 'bg-[#FF2D87]'
  

  const handleScroll = (e) =>{
    e.preventDefault();
    console.log('drag to scroll')
    console.log(e)
    e.target.scrollIntoView({
      behavior: "smooth",
      block: "nearest",
      inline: "center"
    })
  }

  if(tag === 'День Рождения Гриши') {
    return(
      <div 
        id={`tag ${tag}`} 
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
        `}
        onMouseDown={(e)=>handleScroll(e)}
      >
        <h2>
        {tag}
        </h2>
      </div>
    )
  }
  return(
    <div 
      id={`tag ${tag}`} 
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
        bg-[${color}]
      `}
      onMouseDown={(e)=>handleScroll(e)}
    >
      <h2>
      {tag}
      </h2>
    </div>
  )
  }

export default CategoryTag;
