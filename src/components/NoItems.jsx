import React from 'react'

const NoItems = () => {
  return (
    <div
      className="loading-product w-full min-w-[372px] flex flex-col justify-center items-center">
      <div id="no_items_banner__header"
        className="text-base text-black font-raleway font-semibold">
        <h3>
          🙅 looks like no items here 👀
        </h3>
      </div>
      <div id="no_items_banner__footer"
        className="text-lg text-black font-raleway font-bold">
        <h3>
          😃 Waiting for products to load 😃
        </h3>
      </div>
    </div>
  )
}

export default NoItems