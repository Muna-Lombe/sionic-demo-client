import React from 'react'


const Card = ({text="Новая коллекция", imgBg}) => {
  return (
    // lg:w-[25.5rem] lg:h-48 md:w-[22rem] md:h-[10rem]
    <div className=" relative m-2 rounded-3xl">
      <img className="w-full h-full rounded-3xl" src={imgBg} alt="" />
      <h2 className="absolute top-[50%] right-[50%] text-xl text-white font-raleway font-bold">
        {text}
      </h2>
    </div>
  )
}

export default Card
