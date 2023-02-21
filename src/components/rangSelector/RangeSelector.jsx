// import React from 'react'


import React, { useCallback, useEffect, useState, useRef } from "react";
import PropTypes from "prop-types";
import "./rangeSelector.css";

const RangeSelector = ({ min, max, stateUpdaters, onChange }) => {
 
  const minValRef = useRef(null);
  const maxValRef = useRef(null);
  const range = useRef(null);
  
  // Convert to percentage
  const getPercent = useCallback(
    (value) => Math.round(((value - min) / (max - min)) * 100),
    [min, max]
  );

  // Set width of the range to decrease from the left side
  useEffect(() => {
    if (maxValRef.current) {
      const minPercent = getPercent(stateUpdaters.min.val);
      const maxPercent = getPercent(+maxValRef.current.value); // Preceding with '+' converts the value from type string to type number
      console.log("min---", maxPercent, minPercent)

      if (range.current) {
        range.current.style.left = `${minPercent}%`;
        range.current.style.width = `${(maxPercent - minPercent) > 250 ? 100 : (maxPercent - minPercent) }%`;
      }
    }
  }, [stateUpdaters.min.val, getPercent]);

  // Set width of the range to decrease from the right side
  useEffect(() => {
    if (minValRef.current) {
      const minPercent = getPercent(+minValRef.current.value);
      const maxPercent = getPercent(stateUpdaters.max.val);
      console.log("max---", maxPercent, minPercent)
      if (range.current) {
        range.current.style.width = `${(maxPercent - minPercent) > 250 ? 100 : (maxPercent - minPercent) }%`;
      }
    }
  }, [stateUpdaters.max.val, getPercent]);

  // Get min and max values when their state changes
  useEffect(() => {
    onChange({ min: stateUpdaters.min.val, max: stateUpdaters.max.val });
  }, [stateUpdaters.min.val, stateUpdaters.max.val, onChange]);

  return (
    <div className="container">
      <input
        type="range"
        min={min}
        max={max}
        value={stateUpdaters.min.val}
        step={(1)}
        ref={minValRef}
        name="range-left"
        onChange={(event) => {
          const value = Math.min(+event.target.value, stateUpdaters.max.val - 1);
          console.log("minv---", value)
          
          stateUpdaters.min.setMinVal(value);
          event.target.value = value.toString();
        }}
        className={(stateUpdaters.min.val > max - 100 ? "thumb thumb-left thumb--zindex-3" :"thumb thumb--zindex-5")}
      />
      <input
        type="range"
        min={min}
        max={max}
        value={stateUpdaters.max.val}
        step={(1)}
        ref={maxValRef}
        name="range-right"
        onChange={(event) => {
          const value = Math.max(+event.target.value, stateUpdaters.min.val + 1);
          console.log("maxv---",value)
          
          stateUpdaters.max.setMaxVal(value);
          event.target.value = value.toString();
        }}
        className="thumb thumb-right thumb--zindex-4"
      />

      <div className="slider">
        <div className="slider__track" />
        <div ref={range} className="slider__range" />
        {/* <div className="slider__left-value">{minVal}</div>
        <div className="slider__right-value">{maxVal}</div> */}
      </div>
    </div>
  );
};

RangeSelector.propTypes = {
  min: PropTypes.number.isRequired,
  max: PropTypes.number.isRequired,
  onChange: PropTypes.func.isRequired
};

export default RangeSelector;
// const RangeSelector = () => {

//   const handleInput =(e)=>{
//     // const style = e.parentNode.style
//     // e.parentNode.style = JSON.parse(`{{--text-value-a: ${JSON.stringify(e.value)}} , {--value-a: ${ e.value} }}`)
//     const inpR = document.getElementById("range-to-left")
//     const inpL = document.getElementById("range-to-right")
//     const findNearElemAndSetMax = (elem)=>{
//       const near = elem.previousSibling || elem.nextSibling
//       const isNeg = elem.value > 0
//       const abs = Math.abs
//       if(abs(elem.value) >= abs(near.value)){
//         elem.max =  near.value
//       }
//       // elem.max= isNeg ? 0 : 9
//     }
//     console.log("firing")
//     switch (e.target.id) {
//       case "range-to-left":
//         findNearElemAndSetMax(e.target)
//         console.log("to left value", e.target.value)
//         break;
//       case "range-to-right":
//         findNearElemAndSetMax(e.target)
//         console.log("to right value", e.target.value )
//         break;
//       default:
//         break;
//     }
//   }
//   return (
//     // < !--Double range slider(flat design)-- >
//     // <div class="range-slider flat" data-ticks-position='top' style='--min:-500; --max:500; --value-a:-220; --value-b:400; --suffix:"%"; --text-value-a:"-220"; --text-value-b:"400";'>
//     //   <input type="range" min="-500" max="500" value="-220" onInput={(e)=>handleInput(e)}/>
//     //   <output></output>
//     //   <input type="range" min="-500" max="500" value="400" onInput={(e) => handleInput(e)}/>
//     //   <output></output>
//     //   <div class='range-slider__progress'></div>
//     // </div>
//     <div className="range-wrapper">
//       <div className={"range-inputs relative py-2 w-[140px] child:top-1/2  h-[80px]"}>
//         <input type="range" min={0} defaultValue={0} max={9} name="range-start-left" id="range-to-right" onInput={(e)=> handleInput(e)} className="range-to-right absolute left-0 mr-2 max-w-[130px]  accent-blue-500 hover:accent-blue-600 [" />
//         <input type="range" min={0} defaultValue={0} max={9} name="range-start-right" id="range-to-left" onInput={(e) => handleInput(e)} className="range-to-left absolute right-0 ml-2 max-w-[130px]  accent-blue-500 hover:accent-blue-600" />
//       </div>
//       <div className="range-labels">
//         <label defaultValue={"0"} htmlFor="range-start-left"></label>
//         <label defaultValue={"999"} htmlFor="range-start-right"></label>
//       </div>
//     </div>

//   )
// }

// export default RangeSelector;
