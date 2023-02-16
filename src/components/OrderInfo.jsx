const OrderInfo = ({ titleText = "Информация о доставке", children }) => {
  return (
    <div className="order-info w-full flex flex-col">
      <p className="order-title text-lg font-[arial]">
        {titleText}
      </p>
      <p className="order-details  flex flex-row">

        {children}
      </p>
    </div>
  )
}
