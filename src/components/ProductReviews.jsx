import { image1_1, imagepath } from "../assets/images"

const ProductReviews=({reviewsArray=[1,2,3,4,5]})=>{
  
  const ReviewImages =({imageArray=[1,2,3,4,5]})=>(
    <div className="review-images flex flex-row gap-2">
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
  const Review =({review})=>{
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
      <div className="review-component w-full flex gap-2 justify-end">
        <div className="reviewer-avtr flex self-start">
          <img src={imagepath(review?.i || 3001)} alt="" className="w-[50px] aspect-square border-2 rounded-3xl" />
        </div>
        <div className="reviewer-details flex flex-col self-start">
          <div className="reviewer-name">
            {"name"}
          </div>
          <div className="purchase-platform-brief">
            <div className="platform">
              {"purchase platform"}
            </div>
            <div className="brief-description">
              {"brief description"}
            </div>
          </div>
          <div className="reviewer-comment">
            {"some long comment"}
          </div>
          <div className="helpful-review-rank w-max flex gap-2 ">
            <div className="rank-yes" role="button">
              👍
              <span className="rank-count">
                {10}
              </span>
            </div>
            <div className="rank-no" role="button">
              👎
              <span className="rank-count">
                {10}
              </span>
            </div>
          </div>
        </div>
        <div className="review-date-rating flex flex-col float-right">
          <div className="review-date">
            {"1 January 2001"}
          </div>
          <div className="review-rating">
            <Stars count={1} />
          </div>
        </div>
      </div>
    )
  }
  return(
    <div className="reviews-container w-full flex-col border">
      <p className="review-title">
        Отзывы и вопросы о товаре
        <span className="reviews-total-count">
          {6298}
        </span>
      </p>
      <ReviewImages />
      <Review />
      {reviewsArray?.map((r,i)=> <Review/>)}
    </div>
  )
}

export default ProductReviews;