
import React, { useState } from 'react'

const CopyIco = () => {
  const [isCopied, setIsCopied] = useState(false)
  let color = "#727280"
 
  const copyToClipboard= (e)=>{
    // console.log(e.target.previousElementSibling.innerText)
    let text = e.target.previousElementSibling.innerText
  
    navigator.clipboard.writeText(text)
            .then(() => {
              alert(`Text copied to clipboard:${text}`);
            })
            .catch(err => {
              alert('Error in copying text: ', err);
            });
    setIsCopied((prevState) => !prevState)   
  }
  return (
    <svg className={"cursor-pointer  "+(isCopied ? "stroke-[#2967FF]" : "stroke-[#727280]"+" hover:stroke-[#2967FF]")} onClick={(e)=>copyToClipboard(e)} width="13" height="13" viewBox="0 0 13 13" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path fillRule="evenodd" clipRule="evenodd" d="M8.375 12.1251H2.125C1.43437 12.1251 0.875 11.5657 0.875 10.8751V4.62506C0.875 3.93444 1.43437 3.37506 2.125 3.37506H8.375C9.06563 3.37506 9.625 3.93444 9.625 4.62506V10.8751C9.625 11.5657 9.06563 12.1251 8.375 12.1251Z" strokeLinecap="round" strokeLinejoin="round"/>
      <path d="M3.37512 3.375V2.125C3.37512 1.43437 3.9345 0.875 4.62512 0.875H10.8751C11.5657 0.875 12.1251 1.43437 12.1251 2.125V8.375C12.1251 9.06563 11.5657 9.625 10.8751 9.625H9.62512" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>

  )
}

export default CopyIco
