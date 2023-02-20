const ProductTags = ({ children }) => {
  return (
    <div className="tags-array p-3 w-full max-w-5xl flex flex-col gap-3">
      <p className="title flex flex-wrap text-xl font-[arial] font-bold">
        {"Selections of products in category 'Some Category'"}
      </p>
      <div className="array flex flex-wrap gap-2 child:cursor-pointer child-hover:text-blue-700 child-hover:bg-slate-300 child:w-max child:px-2 child:py-1  child:bg-slate-200 child:rounded-xl child:text-base child:font-[arial] child:font-light">
        <p className="tag">
          {"Some tag here"}
        </p>
        <p className="tag">
          {"Some tag there where yes"}
        </p>
        <p className="tag">
          {"Some tag somewhere"}
        </p>
        <p className="tag">
          {"Some tag everywhere"}
        </p>
        <p className="tag">
          {"Some tag some place where coins go"}
        </p>
        <p className="tag">
          {"Some tag which is a tag"}
        </p>
        <p className="tag">
          {"Some tag here nowhere"}
        </p>
        <p className="tag">
          {"Some tag here why"}
        </p>
      </div>
    </div>
  )
}
export default ProductTags;