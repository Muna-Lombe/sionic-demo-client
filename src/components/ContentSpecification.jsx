const ContentSpecification = ({ mainText = "Перейти к описанию", subText ="Пищевая ценность продукта",children})=>{
    return(
      <div className="content-specification w-auto max-w-[342px] ">
        <p className=' text-blue-500 text-sm font-[arial] font-medium cursor-pointer'>
          {mainText}
        </p>

        <div className="price-decription-details p-3 bg-gray-200 rounded-sm">
          <p className='text-slate-400 text-md font-[arial]  font-medium'>
            {subText+":"}
          </p>
          <div className="details flex gap-6">
            {children}
            
          </div>
        </div>
      </div>
    )
  }
  