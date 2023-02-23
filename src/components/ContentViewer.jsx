const ContentViewer = ({ children }) => {
  return (
    // grid - rows - [auto_minmax(0, _1fr)]
    // lg: grid xl: grid xl: grid-cols - 1 xl: grid - rows - 2  lg: grid - rows - 2
    <div className="content-viewer py-6 w-full  xs:grid sm:grid md:flex lg:flex xl:grid 2xl:flex grid-flow-row grid-row-1 xs:grid-cols-1 sm:grid-cols-2 md:grid-cols-2 flex-row flex-shrink flex-wrap md:justify-between xl:justify-start  gap-x-2 xs:gap-x-2 sm:gap-x-4 gap-y-4 ">
      {children}
    </div>

  )
}
export default ContentViewer;