const PaymentType = ({ mainText = "Ozon Рассрочка", subText = "Подробнее", plan = { amount: 109, period: { count: 6, type: "месяцев" } }, children }) => {
  return (
    <div className="payment-type-wrapper p-2 max-w-[400px]  order-3">
      <div className="payment-type w-full p-3 flex flex-col justify-between gap-3 border-2 rounded-xl">
        <div className="type-description flex flex-row gap-3">
          <p className='text-lg font-[arial]'>
            {mainText}
          </p>
          <p className='px-[4px] text-blue-500 cursor-pointer'>{subText}</p>
        </div>
        <p className="installment flex gap-2 items-baseline">
          <span className="amount p-1 bg-yellow-400 rounded-md text-base font-[arial]">
            {plan.amount + " ₽"}
          </span>
          <span className="time-span text-sm font-[arial]">
            {"× " + plan.period.count + " " + plan.period.type}
          </span>
        </p>
      </div>
      <div className="children-wrapper px-2">
        {children}

      </div>
    </div>
  )
}
