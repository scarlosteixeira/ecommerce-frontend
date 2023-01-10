import axios from 'axios'
import React, { SyntheticEvent, useState } from 'react'
import { useParams } from 'react-router-dom'
import ICart, { ICartProduct } from '../interfaces/cart'
import { IProduct } from '../interfaces/product'
import Product from './Product'

type TCart = null | Array<ICart>

function Cart() {
  const [Carts, updateCarts] = React.useState<TCart>(null)
  const [errorMessage, setErrorMessage] = useState('')

  React.useEffect(() => {
    async function updateCart() {
      try {
        const token = localStorage.getItem('token')
        const { data } = await axios.get(`/api/cart`, {
          headers: { Authorization: `Bearer ${token}` }
        })
        console.log(data)
        updateCarts(data)
        // .then(function(response) {
        // console.log(response)
        // })
      } catch (err: any) {
        setErrorMessage(err.response.data.message)
      }
    }

    updateCart()
  }, [])

  if (!Carts) {
    return <p> Loading Cart</p>
  }

  return (
    <section className="hero is-link is-fullheight-with-navbar is-link">
      <div className="hero-body has-text-centered">
        <div className="container">
          <p className="title">Your Cart</p>
        </div>
      </div>
      <div className="is-flex-direction-row">
        <div className="is-flex-direction-row">
          {Carts[0].products?.map(product => {
            console.log(product)

            return (
              <div className="card">
                <div className="card-header">
                  <div className="card-header-title">
                    {product.product[0].name}
                  </div>
                </div>

                <div className="card-content">
                  <img src={product.product[0].image} alt="" />
                </div>

                <div className="card-content">
                  <div>Price: {product.product[0].price}</div>
                </div>

                <div className="card-content">
                  <div>Quantity: {product.quantity}</div>
                </div>
                <div>
                  <button className='button' onClick={()=>handleRemoveProduct}>Remove</button>
                </div>
              </div>
            )
          })}
        </div>
      </div>
    </section>
  )
}

export default Cart
