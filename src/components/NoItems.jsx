import React from 'react'

const NoItems = ({ mainText = "😃 Waiting for products to load 😃", subText ="🙅 looks like no items here 👀"}) => {
  return (
    <div
      className="loading-product w-full min-w-[372px] flex flex-col justify-center items-center">
      <div id="no_items_banner__header"
        className="text-lg text-black font-raleway font-semibold">
        <h4>
          {subText}
        </h4>
      </div>
      <div id="no_items_banner__footer"
        className="text-base text-black font-raleway font-bold">
        <h3>
          {mainText}
        </h3>
      </div>
    </div>
  )
}

export default NoItems