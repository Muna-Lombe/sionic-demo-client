import React from 'react'

const Logo = ({ logo = "Logo Store" }) => (
  <p className=" -py-1 w-max text-[#8f8f91] flex items-baseline gap-2 child-hover:text-blue-500 child-hover:cursor-pointer ">
    <span className="px-1 text-lg font-[700] stroke-black stroke-1 border rounded-lg">
      {logo.split(" ").map((i, x) => i[0]).join("").toString().toLocaleUpperCase()}
    </span>
    <span>
      {logo}
    </span>
  </p>
)

export default Logo