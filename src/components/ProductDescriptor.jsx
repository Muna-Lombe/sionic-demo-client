import { setTextBg, textBg } from "../assets";

const ProductDescriptor = ({ id, label = "Some descriptively long", values = ["Textword"] }) => (
  <p id={'prod_desc_' + id} className={'px-2   w-full flex flex-wrap ' + (values.length > 1 ? "flex-col " : " flex-row lg:flex-row xl:flex-row") + ' flex-nowrap items-baseline '}>
    <span className='w-max whitespace-nowrap font-[arial] font-medium'>{label} </span>
    
    <span className={"dotted-div less-than-xs:hidden px-2 w-full h-[1px] " + (values.length > 1 ? "hidden" : "flex") + " text-slate-400 overflow-hidden clear-right text-clip bg-repeat-x"} style={setTextBg(".")} >
    </span>
    <span className={"w-max flex less-than-xs:flex-wrap flex-row " + (values.length > 1 ? "justify-start" : "justify-end") + " gap-4  text-slate-500 font-[arial] font-medium "}>
      {
        values.map((i, v) => <span key={v} className="w-max">{i['title'] || i} </span>)

      }
    </span>
  </p>
)
export default ProductDescriptor;