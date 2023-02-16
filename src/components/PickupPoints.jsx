const PickupPoints = ({ titleText = "Пункты выдачи и постаматы", points = { date: { day_tag: "завтра", date_text: "6 февраля" }, price: 0 } }) => (
  <span className="pickup-points p-2 flex flex-row justify-between gap-4 ">
    <span className='flex flex-col'>
      <span className="title">
        {titleText}
      </span>
      <span className="details text-slate-400 text-sm">
        <span className='date'>
          {points.date.day_tag + ", " + points.date.date_text}
        </span>
        -
        <span className="courier-price">
          {points.price > 0 ? points.price + " ₽" : "бесплатно"}
        </span>
      </span>
    </span>

    <span className="arrow-right">
      <ArrowRight />
    </span>
  </span>
)
