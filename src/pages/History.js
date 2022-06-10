import React from 'react'
import { useSelector } from 'react-redux'
import { OrderHistory } from '../components'


const History = () => {
  const orderHistory = useSelector(state=>state.orderHistory.entities)
  const itemsOrdered = Object.values(orderHistory)
  return (
    <OrderHistory itemsOrdered={itemsOrdered} />
  )
}

export default History