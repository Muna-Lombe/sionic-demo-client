import { useMemo, useRef, useState } from "react"
import { ToggleIco } from "../assets"
import RangeSelector from "./rangSelector/RangeSelector"

const FilterSearchResults = ({ children }) => {


  
  const Categories =({categories={mainTitle:"Category", categoryTypes:[1,2,3,4]},children})=>{
    return(
      <div className="categories-wrapper   flex flex-col gap-1   ">
        <h4 className="category-main-title font-semibold">
          {categories.mainTitle}
        </h4>
        <div className="category-types-wrapper font-medium">
          {
            categories.categoryTypes.map((i,x)=>
            <div className="category-type hover:text-blue-500 cursor-pointer">
              {"Cate"}
            </div>
            )
          }
        </div>
      </div>
    )
  }
  const FilterInput = ({ inputType = "toggle", inputData = { label: "Super Sale", options: [{ type: "regular", text: "opt1" }, { type: "sameDay", text: "opt2", hasIco: true }, { type: "express", text: "opt3", hasIco: true }, { type: "regular", text: "opt4" }]}, children})=>{
    const TogleOpt=({data, type="checkbox"})=>(
      <div className="toggle-wrapper flex justify-between whitespace-nowrap font-semibold ">
        <label htmlFor="toggleBtn" >{data.label}</label>
          <ToggleIco inputName="toggleBtn" type={type}/>
      </div>
    )
    // checkbox: appearance-none
    const SelectOpt = ({data}) => (
      <div className="select-wrapper flex flex-col whitespace-nowrap ">
        <div className="h4 selector-title font-semibold">{data.label}</div>
        <div className="selectors-wrapper flex flex-col font-medium">
          {
            data.options.map((opt,x)=>
              <div key={x} className="select-option-item  flex flex-row items-baseline gap-2">
                <input type="checkbox" name="toggleBtn" id="" className={"appearance-none w-[16px] aspect-square border border-slate-300 hover:border-blue-500  checked:w-[14px] checked:mx-[0.999px] checked:bg-blue-500 checked:outline checked:outline-1 checked:outline-blue-500  checked:outline-offset-2  rounded-[4px] cursor-pointer" } />
                <label htmlFor="toggleBtn">
                  {opt.hasIco? addIcon():""}
                  {opt.text}
                </label>
              </div>
            )
          }
          
        </div>
      </div>
    )
    const RangeSelect =({data})=>{
      const [minVal, setMinVal] = useState(data.prices.min||0);
      const [maxVal, setMaxVal] = useState(data.prices.max||110);
      
      // const maxVal = useMemo(() => first, [second])
      const handleEdit =(e)=>{
        e.preventDefault();
        if(e.key === "enter") setMaxVal(e.target.value) 
      }
      return(
        <div className="range-selector-wrapper flex flex-col  whitespace-nowrap font-semibold">
          <h4>{data?.label}</h4>
          <div className="range-wrapper font-medium ">
            <div className="range-input">

              <RangeSelector min={data.prices.min} max={data.prices.max} stateUpdaters={{ min: { val: minVal, setMinVal }, max: { val: maxVal, setMaxVal } }} onChange={({ min, max }) => { } }/>
            </div>
            <div className="current-range-values mx-2 flex flex-row justify-between">
              <div className="min-value px-2 min-w-[3.5rem] flex justify-center border-2 border-blue-500 rounded-lg ">
                <span slot={minVal} className="w-max" >
                  {minVal}
                </span>
              </div>
              <div className="max-value px-2 min-w-[3.5rem] flex justify-center border-2 border-blue-500 rounded-lg ">
                
                <span slot={maxVal}  className="w-max focus:outline-none">
                  {maxVal}
                </span>
              </div>
            </div>
          </div>
          
        </div>
      )
    }

    const addIcon =(iconName="InfoIco")=>{
      const icon = require("../assets/"+iconName+".jsx")
      return <icon/>
    }
    const selectType=(d,t)=>{
    switch (t) {
      case "toggle":
        return <TogleOpt data={{label: d.label}}/>; 
      
      case "selector":

        return <SelectOpt data={{label:d.label, options:d.options}}/>;
      case "rangeSelector":
        return <RangeSelect data={{ label: d.label, prices:{min:500, max:3210} }} />
      default:
        break;
    }

    }
    return(
      <div className="user-option-wrapper w-full">
        {
          selectType(inputData, inputType)
        }
      </div>
    )
  }
  // const DeliveryTimeSelector
  return (
    <div className="filter-search-results py-2 mx-4 w-52 flex flex-col gap-4 font-[arial]  " >
      <Categories/>
      <FilterInput inputType={ "toggle" } />
      <FilterInput inputType={ "selector" } />
      <FilterInput inputType={ "rangeSelector" } />
      <FilterInput inputType={ "selector" } />
      <FilterInput inputType={ "toggle" } />
      <FilterInput inputType={ "toggle" } />
      <FilterInput inputType={ "selector" } />
      <FilterInput inputType={ "toggle" } />
      <FilterInput inputType={ "toggle" } />
      <FilterInput inputType={"toggle"}/>
    </div>
  )
}
export default FilterSearchResults;