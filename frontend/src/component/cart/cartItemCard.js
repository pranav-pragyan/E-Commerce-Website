import React from 'react'
import "./cartItemCard.css"
import {Link} from "react-router-dom"

const CartItemCard = ({item,deleteCartItem}) => {
  return (
    <div className='cartItemCard'>
      <img src={item.image} alt="yha pe image hai" />
      <div>
        <Link to={`/product/${item.product_id}`}>{item.name}</Link>
        <span>{`Price : ₹${item.price}`}</span>
        <p onClick={()=>deleteCartItem(item.product_id)}>Remove</p>
      </div>
    </div>
  )
}

export default CartItemCard