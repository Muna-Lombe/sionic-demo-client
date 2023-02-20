import { useState } from "react";
import ProductReviews from "./ProductReviews";
import QAs from "./QAs";

const ReviewsAndQuestions = ({ reviewCount = 6298, handleClassToggle }) => {
  const [activeTab, setActiveTab] = useState("PRs")
  return (
    <div className="review-questions-wrapper w-full p-2">
      <p className="title h-max flex gap-1 items-start">
        <span className="text-2xl font-medium">
          Reviews and questions about the product
        </span>
        <span className="reviews-total-count text-gray-400 text-sm font-medium">
          {reviewCount}
        </span>
      </p>
      <div className="review-questions-toggle max-w-max py-2 flex  cursor-pointer  ">
        <p onClick={(e) => handleClassToggle(e, setActiveTab)} className=" PRs active py-1 px-3 border-b-2 border-blue-500 text-sm text-[arial] text-black font-medium hover:text-blue-500 transition ease-linear delay-50 ">PRODUCT REVIEWS</p>
        <p onClick={(e) => handleClassToggle(e, setActiveTab)} className=" QAs py-1 px-3 text-sm text-[arial] text-slate-400 font-medium border-b-[1px]  hover:text-blue-500 transition ease-in delay-100 ">QUESTIONS AND ANSWERS ABOUT THE PRODUCT</p>
      </div>
      {/* {children} */}
      {
        activeTab === "PRs"
          ? <ProductReviews />
          : <QAs />
      }
    </div>
  )
}
export default ReviewsAndQuestions;