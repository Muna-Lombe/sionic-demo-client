const Courier = ({ delivery = { courier: "Курьером Ozon", date: { day_tag: "завтра", date_text: "6 февраля" }, price: 149 } }) => (
  <span className="courier  p-2 flex flex-col  ">
    <span className="title text-lg ">
      {delivery.courier}
    </span>
    <span className="details text-slate-400 text-sm">
      <span className='date'>
        {delivery.date.day_tag + ", " + delivery.date.date_text}
      </span>
      -
      <span className="courier-price">
        {delivery.price + " ₽"}
      </span>
    </span>
  </span>
)
export default Courier;