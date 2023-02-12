import React from 'react'
import { image1_1, imagepath } from '../assets/images'
import { ArrowDown } from '../assets'
import { CopyIco } from '../assets'

const QAs = ({}) => {

  const QuestionInput=({})=>{
    return(
      <div className="question-input p-6 flex flex-col gap-2 bg-slate-200 border rounded-lg">
        <p className="main-title text-lg font-[arial] font-medium">
          {"Some main title"}
        </p>
        <p className="sub-title text-sm font-[arial] font-normal">
          {"Some sub title"}
        </p>
        <input type="text" name="question-input" placeholder='Write your question' id="" className="p-1 border-2 border-slate-400 rounded-lg" />
      </div>
    )
  }
  const AnswerSorter =({})=>{
    
    const optgrp =()=> document.querySelector(".sort-options")

    const handleRotateIco =(e)=>{
      const elem = e.target || e
      // console.log(elem)
      if(e.type==="click") e.preventDefault()
      if(e.type === "click") e.stopPropagation()
      const clickedSvg = () => elem.tagName === "svg"
      const clickedP = () => elem.tagName === "p"
      let child;
      if(clickedSvg()) child = elem
      if(clickedP()) child = elem.firstChild

      if(child.classList.contains("-rotate-90")){
        child.classList.replace("-rotate-90", "rotate-90")
        optgrp().classList.replace("hidden", "visible")
      }else{
        child.classList.replace("rotate-90", "-rotate-90")
        optgrp().classList.replace("visible", "hidden")

      }
      
    }

    const handleBlur=(e)=>{
      // console.log("triggered blur")
      return optgrp().classList.contains("visible") 
        ? handleRotateIco(document.querySelector(".arrow-down"))//optgrp().classList.replace("visible", "hidden")
        : "" 
    }

    const handleSetValue = (e)=>{
      e.preventDefault()
      document.querySelector("#sort-selector").value = e.target.value
    }
    return(
      <div className="sorter-wrapper  py-1 w-full h-14">
        <div onClick={()=>handleBlur()} className="answer-sorter  max-w-min flex flex-col justify-between gap-1  border-2 border-slate-400 rounded-lg">
          <div className=" sorter-input my-1 px-1 w-max flex gap-10">
            <input disabled type="text" name="sort-selector" id="sort-selector" value={"one"} className="w-max flex flex-row bg-white" />
            <p  className="w-full p-1 flex items-center cursor-pointer opacity-50 bg-transparent z-30 ">
              <ArrowDown handleClick={handleRotateIco} />
            </p>
          </div>
          <optgroup onClick={(e) => handleSetValue(e)} className="sort-options top-full left-0 w-full bg-white border opacity-90 rounded-xl child:cursor-pointer child-hover:bg-slate-400  hidden ">
            <option value="one" >one</option>
            <option value="two" >two</option>
            <option value="three" >three</option>
            <option value="four" >four</option>
          </optgroup>
        </div>
      </div>
      
    )
  }
  
  const MoreActions = ()=>{
    const Option =()=>(
       <div className="more-options-wrapper absolute -bottom-2 py-1 px-2 min-w-max gap-1 items-baseline border rounded-xl shadow-sm text-sm hidden  group-hover:flex">
          <CopyIco/>
          <span>{"Copy to clipboard"}</span>
       </div>
    )
     return(
       <div className="more-actions relative py-4 flex flex-col items-center text-xl text-slate-400 font-semibold cursor-pointer group ">
         <p className="px-2 aspect-square  hover:text-blue-500 ">{"..."}</p>
         <Option />
       </div>
     )
  }
  const Question =({children})=>{
    return(
      <div className="question-wrapper flex gap-3">
        <div className="product-img my-2 h-max justify-self-start border-[0.6px] shadow-sm">
          <img src={image1_1} alt="" className="w-[80px] aspect-square" />
        </div>
          <div className="question-answer-details w-full flex flex-col gap-1">
            <div className="product-name min-w-max py-1 px-6 text-base font-medium">
              {"Some product with a long name"}
            </div>
            <div className="question-content my-2 px-2 flex flex-col gap-6 ">
              <div className="question-details px-4 w-full flex flex-row justify-between gap-2 font-[arial] font-medium">
                <div className="question-details-content">
                  <p className="question-text text-lg font-semibold">
                    {"Some question text?"}
                  </p>
                  <div className="user-data text-slate-400 text-sm">{"The user chose to hide his data"}</div>
                  <div className="vote flex items-baseline gap-1 bg- border-1 rounded-lg cursor-pointer">
                    <p className="rank-yes w-max py-1 px-2 bg-slate-300 rounded-3xl text-slate-600 font-[arial]" role="button">
                      👍
                      <span className="vote-count">
                        {10}
                      </span>
                    </p>
                  </div>
                </div>

                <div className="question-timestamp flex flex-col justify-between items-center ">
                  <div className="question-date text-base font-[arial]">
                    {"1 January 2001"}
                  </div>
                  <MoreActions/>
                </div>
              </div>
              
            <div className="children-wrapper">
              {children}
              <div className="has-more-responses p-4">
                {
                  "123".toString().length
                  // ? <div className="response-count flex ">
                    
                      // {/* <p className="plus-ico w-max">➕</p> */}
                      
                    ? <p className="response-count text-sm text-blue-500 font-[arial] font-semibold cursor-pointer">
                        {"+ 1000 more answer"}
                      </p>
                    // </div>
                  : ""

                }
              </div>
            </div>
          </div>

          </div>
      </div>
    )
  }
  const Answer =({})=>{
    return (
      <div className="answer-wrapper px-4 w-full flex flex-col gap-2 border-l border-green-400">
        <div className="best-answer-tag w-max py-1 px-2 flex bg-green-500 rounded-2xl text-xs text-white font[arial] font-semibold ">
          <span>{"🎗️ Best Answer"}</span>
        </div>
        <div className="answer-content w-full flex flex-row justify-between gap-2 ">
          <div className="answer-details my-2 flex flex-row items-start gap-2 ">
            <div className="answerer-avtr">
              <img src={imagepath(3001)} lazy="true" alt="" className="w-[40px] min-w-[40px] aspect-square flex justify-center border rounded-3xl" />
            </div>
            <div className="answerer-details-content flex flex-col gap-2 ">
              <div className="answerer-name py-2 flex items-center gap-2">
                <span className="text-base font-[arial] font-semibold">
                  {"Some answerer name"}
                </span>
                <span className="verified-tag rounded-3xl text-xs ">
                  ☑️
                </span>
              </div>
              <div className="answerer-text">
                <p className="answer-text">{"Some answer text Some answer text Some answer text Some answer text Some answer text Some answer text Some answer text Some answer text Some answer text Some answer text Some answer text Some answer text  "}</p>
              </div>
              <div className="helpful-answer-rank w-max flex flex-col gap-2 ">
                <p className="title text-slate-400 text-sm ">{"Was this answer helpful?"}</p>
                <div className="ranking flex flex-row gap-2">
                  <p className="rank-yes w-max py-1 px-2 bg-slate-300 rounded-3xl text-slate-600 font-[arial]" role="button">
                    👍
                    <span className="rank-count">
                      {10}
                    </span>
                  </p>
                  <p className="rank-no w-max py-1 px-2 bg-slate-300 rounded-3xl text-slate-600 font-[arial]" role="button">
                    👎
                    <span className="rank-count">
                      {10}
                    </span>
                  </p>
                </div>
              </div>

            </div>
          </div>
          <div className="answer-timestamp min-w-max flex flex-col justify-between items-center font-[arial]">
            <div className="question-date text-base font-[arial]">
              {"1 January 2001"}
            </div>
            <MoreActions/>
          </div>
        </div>
      </div>
    )
  }
  return (
    <div className="QA-wrapper flex flex-col gap-4">
      <QuestionInput/>
      <AnswerSorter/>
      <Question>
        <Answer/>
      </Question>
    </div>
  )
}

export default QAs