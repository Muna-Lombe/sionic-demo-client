import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { NoItems, OrderHistory } from '../components'
import { Outlet } from 'react-router-dom'
import { filteredOrdersFromModel } from '../orm/selectors'


const History = () => {
  const itemsOrdered = useSelector(filteredOrdersFromModel())
  // console.log(itemsOrdered)
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <OrderHistory itemsOrdered={itemsOrdered}  />
        {/* <Outlet /> */}
      </Suspense>
    </>
  )
}

export default History