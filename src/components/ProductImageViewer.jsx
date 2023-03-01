import React from 'react'
import ImageMagnifier from './ImageMagnifier'

const ProductImageViewer = ({images}) => {
  // const [modalOpen, setModalOpen] = useState(true)

  return (
    <div className="image-viewer p-2 min-w-[300px] w-auto xs:max-w-1/4  max-w-[700px] order-1 ">
      <ImageMagnifier images={images} />
      {/* <ViewImageModal openModal={modalOpen} modalAction={setModalOpen}/> */}
    </div>
  )
}

export default ProductImageViewer