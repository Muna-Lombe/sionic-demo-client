import React, { Suspense } from 'react'
import { useSelector } from 'react-redux'
import { NoItems, OrderHistory } from '../components'
import { Outlet } from 'react-router-dom'


const History = () => {
  const orderHistory = useSelector(state=>state.orderHistory.entities)
  const itemsOrdered = Object.values(orderHistory)
  return (
    <>
      <Suspense fallback={<NoItems />}>
        <OrderHistory itemsOrdered={itemsOrdered} />
        {/* <Outlet /> */}
      </Suspense>
    </>
  )
}

export default History