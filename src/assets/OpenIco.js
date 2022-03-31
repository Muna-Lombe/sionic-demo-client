
import React, { useState } from 'react'
import BasketIco from './BasketIco'

const OpenIco = () => {
  const [isRotated, setIsRotated] = useState(false)
  

  return (
    <svg className={"cursor-pointer "+(isRotated ? "rotate-180":"")} onClick={()=>(setIsRotated((prevState)=> !prevState))} width="14" height="8" viewBox="0 0 14 8" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path d="M1 7L7 1L13 7" stroke="#AEC2EA" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  )
}

export default OpenIco
