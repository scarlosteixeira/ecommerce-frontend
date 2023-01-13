import axios from "axios"
import React, { useState } from "react"
import { IOrder } from "../interfaces/order"



function Order() {
  const [Orders, updateOrders] = useState<IOrder | null>(null)
  const [errorMessage, setErrorMessage] = useState('')

  async function updateOrder() {
    try {
      const token = localStorage.getItem('token')
      const { data } = await axios.get(`/api/order`, {
        headers: { Authorization: `Bearer ${token}` }
      })
      updateOrders(data)
    } catch (err: any) {
      setErrorMessage(err.response.data.message)
    }
  }
  React.useEffect(() => {
    updateOrder()
  }, [])
  console.log(Orders);

  if (!Orders) {
    return <p> Loading Your Items</p>
  }


  return (

    <div>
      <h2>Thank you for your order!</h2>
      <h3>Order summary:</h3>
    </div>

  )



}

export default Order()