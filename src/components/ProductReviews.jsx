import { image1_1, imagepath } from "../assets/images"

const ProductReviews=({reviewsArray=[1,2,3,4,5]})=>{
  
  const ReviewImages =({imageArray=[1,2,3,4,5]})=>(
    <div className="review-images min-w-[370px] max-w-max flex flex-row gap-2 border-b-2 overflow-x-scroll scrollbar">
      {
        imageArray?.map((i,x)=>{
          return (
          <img key={x} src={imagepath(i.id||3001)} alt={"review-img-"+x}
          className="w-[80px] aspect-square "
           />
           )
        })
      }
    </div>
  )

  const OverallRating = ({})=> {
    const GradeCount =({grade=2, maxCount=10, total=100})=>(
      <div className="rating-count flex flex-row gap-4">
        <div className="star-grade flex flex-row gap-1 text-slate-300 text-sm font-raleway font-semibold align-bottom text-end">
          <span className="grade-value text-[20px] leading-6">
            {grade}
          </span>
          <span className="grade-text h-8 flex items-baseline leading-[30px] align-bottom">
            {" star" + (grade > 1 ? "s" : "")}
          </span>
        </div>
        <div className="progress-visual mx-2 ">
          <progress value={maxCount} max={total} color="yellow" className="[&]:appearance-none [&]:w-52 [&]:h-2 [&]:rounded-xl [&::-webkit-progress-bar]:bg-slate-300 [&::-webkit-progress-bar]:rounded-xl [&::-webkit-progress-value]:bg-yellow-300 [&::-webkit-progress-value]:rounded-xl  "></progress>
        </div>
        <div className="grade-count">
          {maxCount}
        </div>
      </div>
    )

    const RatingTotal =()=>(
      <div className="rating-total py-2 flex flex-row justify-between items-baseline gap-4 border-b-2 text-xl">
        <div className="star-count">
          {"⭐⭐⭐⭐⭐"}
        </div>
        <div className="number-count font-[arial] font-semibold leading-snug">
          {"5/5"}
        </div>
      </div>
    )

    const VariedTotals=()=>(
      <div className="varied-rating-grade-totals my-5">
        <GradeCount />
      </div>
    )
    const ReviewBtn=()=>(
      <input type="button" value="Review" className="p-2 w-full bg-blue-400 rounded-xl text-white text-lg font-[arial] font-semibold"/>
    )
    return (
      <div className="overall-rating px-2 min-w-[340px] hidden lg:flex lg:flex-col">
        <RatingTotal/>
        <VariedTotals/>
        <ReviewBtn/>
      </div>
    )
  }
  const Review =({review, k=1})=>{
    const Stars =({count})=>(
        <p>
          {
            new Array(count).fill("").map((i,x)=>{
              return <span key={x}>⭐</span>
            })
          }
        </p>
      )
    return(
      <div key={k} className="review-component w-full p-2 flex gap-2 justify-between">
        <div className="reviewer flex gap-3">
          <div className="reviewer-avtr justify-self-start">
            <img src={imagepath(review?.i || 3001)} alt="" className="w-[50px] min-w-[50px] aspect-square border-2 rounded-3xl" />
          </div>
          <div className="reviewer-details my-2 px-2 flex flex-col gap-8">
            <div className="reviewer-name-date-ranking min-w-max sm:w-full sm:max-w-full xs:max-w-xs flex xs:flex-col sm:flex-row justify-between ">
              <p className="name text-lg font-medium ">
                {"name"}
              </p>
              <div className="review-date-rating min-w-max  flex flex-col float-left">
                <div className="review-date text-slate-400 text-base font-[arial]">
                  {"1 January 2001"}
                </div>
                <div className="review-rating">
                  <Stars count={1} />
                </div>
              </div>
            </div>
            <div className="purchase-platform-brief  flex flex-col gap-2 font-[arial] font-medium">
              <div className="platform w-max px-3 py-1 flex justify-around gap-2 bg-[#F2F5F9] border-1 rounded-xl text-[#5d5d5d] text-sm">
                <p>✔️</p>
                <p>{"purchase platform"}</p>
              </div>
              <div className="brief-outline">
                <p>{"brief description"}</p>
                <p className="flex flex-row gap-1">
                  <span className="quantifier-name text-slate-400 text-base">{"some quatifier name"}:</span>
                  <span className="quantifier-value text-base">{"some quantifier value"}</span>
                </p>
                <p className="flex flex-row gap-1">
                  <span className="quantifier-name text-slate-400 text-base">{"some quatifier name"}:</span>
                  <span className="quantifier-value text-base">{"some quantifier value"}</span>
                </p>
                <p className="flex flex-row gap-1">
                  <span className="quantifier-name text-slate-400 text-base">{"some quatifier name"}:</span>
                  <span className="quantifier-value text-base">{"some quantifier value"}</span>
                </p>
                <p className=" my-3 flex flex-col gap-1 ">
                  <span className="quantifier-name text-lg font-medium">{"Some emphasised quatifier name"}</span>
                  <span className="quantifier-value text-base font-[arial] font-[470]">{"some emphasised quantifier value"}</span>
                </p>
              </div>
            </div>
            <div className="reviewer-comment">
              <p className=" my-3 flex flex-col gap-1 ">
                <span className="comment-title text-slate-400 text-lg">{"Comment"}</span>
                <span className="comment-text text-base">{"some long comment with space for adding images or videos can it go longer than "}</span>
              </p>
              
            </div>
            <div className="helpful-review-rank w-max flex flex-col gap-2 ">
              <p className="title text-slate-400 text-sm ">{"Was this review helpful?"}</p>
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
        
      </div>
    )
  }
  return(

    <div className="reviews-container w-full py-1 px-2 flex flex-row justify-between gap-3">
      <div className="reviews-wrapper w-full flex flex-col">
        <ReviewImages />
        <Review />
      </div>
      <OverallRating/>
      {/* {reviewsArray?.map((r,i)=> <Review review={r} k={i}/>)} */}

    </div>
  )
}

export default ProductReviews;