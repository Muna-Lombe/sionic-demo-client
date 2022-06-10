
import React from 'react'
import img_path from '../assets/images/avatar.png'

const AvatarIco = ({size="2.1rem"}) => {
  
  
  return (
    <div id="avatar_image" className={"min-w-[1.5rem] w-["+size+"] max-w-[2.5rem] aspect-square  lg:flex  "}>
      <img src={img_path} alt="" /> 
    </div>
  )
}

export default AvatarIco
