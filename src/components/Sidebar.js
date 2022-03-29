import React from 'react'
import { SidebarBanner, DiscountIco } from '../assets'
import Card from './Card'
import imgBg1 from '../assets/images/image14.png'
import imgBg2 from '../assets/images/image15.png'

const Sidebar = () => {
  return (
    <div id="sidebar" className=" hidden xl:w-full xl:h-full xl:flex xl:flex-col gap-4 justify-between items-center">
      <div id="sidebar_hero_banner" className=" w-full h-[30%] mt-2 p-2  relative flex justify-center ">
      {/* This is an svg icon */}
        {/* <SidebarBanner />  */}
        <DiscountIco />

        {/* the content below sits inside the transparent area of the svg */}
        {/* <div className=" mx-[5rem] my-[2.7rem]  pl-[3.9rem] flex flex-col justify-center gap-2 items-center">
          <div className="   flex justify-center items-center">
            <h2 className=" text-3xl text-[#2967FF] font-raleway font-bold">Получай товары БЕСПЛАТНО!</h2>
          </div>
          <button className=" w-[250px] h-[60px] border-2 rounded-[50px] py-[0.4rem] px-6 bg-[#2967FF] text-xl text-white ">Узнать подробнее</button>
        </div> */}
      </div>
      <div id="sidebar_content" className="w-full h-[60%] m-0 flex flex-col items-center overflow-y-scroll scroll-m-0 " >
        <Card imgBg={imgBg1}/>
        <Card imgBg={imgBg2}/>
        <Card imgBg={imgBg1}/>
        <Card imgBg={imgBg1}/>
        <Card imgBg={imgBg2}/>
        <Card imgBg={imgBg1}/>
      </div>
    </div>
  )
}

export default Sidebar