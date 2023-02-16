const ContentPayment = ({ children }) => {
  return (
    <div className="content-payment-wrapper p-2 xs:w-max sm:w-max md:w-max mid-md-lg:w-min lg:w-[-webkit-fill-available] order-4">
      <div className="content-payment p-2  w-auto xs:max-w-1/4 min-w-[350px] max-w-[400px]  flex flex-col  row-span-2 order-4">
        {children}
      </div>

    </div>
  )
}
