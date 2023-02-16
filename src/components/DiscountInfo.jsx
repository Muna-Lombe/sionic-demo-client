const DiscountInfo = ({ titleText = "Лучшая цена на Ozon", moreText = "Узнать о снижении цены", children }) => {
    return (
      <div className="discount-information my-4 gap-1 flex flex-col">
        <p className="best-price-note py-3 text-blue-500 font-[arial] text-base cursor-pointer">
          {titleText}
        </p>
        <p className='line-through border-b-[2px] border-slate-700'></p>
        <p className="learn-more-tag flex flex-row items-baseline gap-2  text-blue-500 font-[arial] text-base cursor-pointer">
          <span className="text-sm text-blue-500 font-bold stroke-blue-500">
            <BellIco bold />
          </span>
          <span>{moreText}</span>
        </p>
      </div>
    )
  }
  