const FullProductCharacteristics = ({ children }) => {
  return (
    <div className="characteristics my-2 p-3  w-full flex flex-wrap gap-4">
      <p className="title py-2 text-2xl font-[arial font-bold ">{"Characteristics"}</p>
      <div className="main-characteristics w-full flex flex-col gap-4">
        <div className="title text-lg font-[arial] font-semibold">
          {"Main"}
        </div>
        <div className="characteristics-content w-full md:max-w-3xl lg:max-w-5xl flex flex-col md:flex-row flex-wrap justify-between gap-4">
          <div className="main-left p-1">
            <ProductDescriptor />
            <ProductDescriptor />
          </div>
          <div className="main-right p-1">
            <ProductDescriptor />
            <ProductDescriptor />
          </div>
        </div>
      </div>

      <div className="additional-characteristics w-full flex flex-col gap-4">
        <div className="title font-[arial] font-semibold">
          {"Additional"}
        </div>
        <div className="characteristics-content w-full md:max-w-3xl lg:max-w-5xl flex flex-col md:flex-row flex-wrap justify-between gap-4">
          <div className="additional-left p-1">
            <ProductDescriptor />
            <ProductDescriptor />
          </div>
          <div className="additional-right p-1">
            <ProductDescriptor />
            <ProductDescriptor />
          </div>
        </div>
      </div>
    </div>
  )
}
