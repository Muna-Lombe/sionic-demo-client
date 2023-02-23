
const ProductDescriptor = ({ id, label = "Some descriptively long", values = ["Textword"] }) => (
  <p id={'prod_desc_' + id} className={'mx-2 min-w-[330px] max-w-[330px] w-auto flex ' + (values.length > 1 ? "flex-col " : " flex-row lg:flex-row xl:flex-row") + ' flex-nowrap items-baseline '}>
    <span className='w-max whitespace-nowrap text-slate-400 text-sm font-[arial] font-medium'>{label} </span>
    <span className={"dotted-div w-full mx-1  " + (values.length > 1 ? "hidden" : "flex") + "  text-slate-400 overflow-hidden clear-right text-clip "}>
      {/* - (label.length + (values.length > 1 ? values.length + 10 :values.length+50)) */}
      {new Array(Number.parseInt((100) / 1)).fill(".").join("")}
    </span>
    <span className={"w-max flex flex-row " + (values.length > 1 ? "justify-start" : "justify-end") + " gap-4 text-sm font-[arial] font-medium "}>
      {
        values.map((i, v) => <span key={v} className="w-max">{i['title'] || i} </span>)

      }
    </span>
  </p>
)
export default ProductDescriptor;