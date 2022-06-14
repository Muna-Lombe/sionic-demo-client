import React from 'react'
import { FbIco, InstaIco, VkIco } from '../assets'
import Google_Play_Link from '../assets/images/Google_Play_Lnk.png'
import Apple_Store_Link from '../assets/images/App_Store_Lnk.png'
const Footer = () => {
  return (
    <div id="footer_wrapper" className="w-full h-full flex flex-col justify-around">
      <div id="footer_top" className="w-auto flex flex-wrap justify-between items-center">
        <div id='footer_logo' className="mx-4">
          <h3 className=" text-3xl md:text-5xl lg:text-5xl xl:text-5xl font-mono font-bold">
            React
          </h3>
        </div>
        <div id="footer_links" className="w-auto max-w-[400px] mx-4 flex flex-wrap gap-2">
          <div id="footer_socials" className="w-max flex flex-wrap flex-col gap-2 text-xs  md:text-base lg:text-base xl:text-base">
            <p>Присоединяйтесь к нам</p>
            <span className="flex gap-2">
              <span className=" w-[16px] max-w-[28px] md:w-full lg:w-full xl:w-full  aspect-square">
                <FbIco />
              </span>
              <span className=" w-[16px] max-w-[28px] md:w-full lg:w-full xl:w-full aspect-square">
                <InstaIco />

              </span>
              <span className=" w-[16px] max-w-[28px] md:w-full lg:w-full xl:w-full aspect-square">
                <VkIco />

              </span>
              
            </span>
          </div>
          <div id="footer_app_links" className="w-max flex flex-wrap flex-col gap-2 text-xs md:text-base lg:text-base xl:text-base">
            <p>Устанавливайте приложение</p>
            <span className="flex gap-2 contrast-150">
              <img src={Google_Play_Link} className="w-[4rem] max-w-[7rem] h-[1rem] md:w-full lg:w-full xl:w-full md:h-full lg:h-full xl:h-full" alt="" />
              <img src={Apple_Store_Link} className="w-[4rem] max-w-[7rem] h-[1rem] md:w-full lg:w-full xl:w-full md:h-full lg:h-full xl:h-full" alt="" />
            </span>
            
          </div>
        </div>
        
      </div>
      <div id="footer_bottom" className=" flex flex-row flex-nowrap justify-center gap-3 text-[8px] md:text-base lg:text-base xl:text-base text-gray-500 font-raleway font-light">
        <p>© Sionic</p>
        <p>Правовая информация</p>
        <p>Политика конфиденциальности</p>
      </div>
    </div>

  )
}

export default Footer