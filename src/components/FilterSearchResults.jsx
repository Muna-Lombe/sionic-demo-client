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
            <div className="category-type">
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
      <div className="toggle-wrapper flex justify-between child:w-max whitespace-nowrap font-semibold ">
        <label htmlFor="toggleBtn" >{data.label}</label>
        <ToggleIco inputName="toggleBtn" type={type}/>
  
      </div>
    )
    const SelectOpt = ({data}) => (
      <div className="select-wrapper flex flex-col whitespace-nowrap ">
        <div className="h4 selector-title font-semibold">{data.label}</div>
        <div className="selectors-wrapper flex flex-col font-medium">
          {
            data.options.map((opt,x)=>
              <div key={x} className="select-option-item  flex flex-row gap-2">
                <input type="checkbox" name="toggleBtn" id="" className="border-1 border-slate-300 " />
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
    // [&>input[type=\"range\"]: appearance-none
    const inputStyling = ""//" [&>input[type=\"range\"]:-webkit-appearance-none  [&]:rounded-xl [&>input[type=\"range\"]::-webkit-slider-thumb]:bg-blue-300 [&>input[type=\"range\"]::-webkit-slider-thumb]:rounded-xl [&>input[type=\"range\"]::-webkit-slider-runnable-track]:h-[8px] [&>input[type=\"range\"]::-webkit-slider-runnable-track]:accent-yellow-300 [&>input[type=\"range\"]::-webkit-slider-runnable-track]:rounded-xl"  
    const RangeSelect =({data})=>{
      const [minVal, setMinVal] = useState(data.prices.min||0);
      const [maxVal, setMaxVal] = useState(data.prices.max||110);
      
      // const maxVal = useMemo(() => first, [second])
      return(
        <div className="range-selector-wrapper flex flex-col  whitespace-nowrap font-semibold">
          <h4>{data?.label}</h4>
          <div className="range-wrapper font-medium ">
            <RangeSelector min={0} max={110} stateUpdaters={{ min: { val: minVal, setMinVal }, max: { val: maxVal, setMaxVal } }} onChange={({ min, max }) => { } }/>
            <div className="current-range-values flex flex-row justify-between">
              <div className="min-value px-2 min-w-[3.5rem] flex justify-center border-2 border-blue-500 rounded-lg ">
                <span className="w-max" >
                  {minVal}
                </span>
              </div>
              <div className="max-value px-2 min-w-[3.5rem] flex justify-center border-2 border-blue-500 rounded-lg ">
                <span className="w-max">
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
        return <RangeSelect data={{ label: d.label, prices:{min:0, max:110} }} />
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
    <div className="filter-search-results p-2 w-52 child:w-full font-[arial] " >
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