const ContentDescription = ({ id, first, children }) => {


  // <p onClick={(e) => handleClassToggle(e, setActiveTab)} className=" PRs active py-1 px-3 border-b-2 border-blue-500 text-sm text-[arial] text-black font-medium hover:text-blue-500 transition ease-linear delay-50 ">PRODUCT REVIEWS</p>
  // <p onClick={(e) => handleClassToggle(e, setActiveTab)} className=" QAs py-1 px-3 text-sm text-[arial] text-slate-400 font-medium border-b-[1px]  hover:text-blue-500 transition ease-in delay-100 ">QUESTIONS AND ANSWERS ABOUT THE PRODUCT</p>

  return (
    <div id={'content_desc_' + id} className={"content-description " + (first ? "flex" : "hidden") + " flex-col gap-3"}>
      {/* {
              activeTab === "PRs"
                ? <ProductReviews />
                : <QAs />
            } */}

      {children}

    </div>
  )
}
