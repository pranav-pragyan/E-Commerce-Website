import React, { Fragment } from 'react';
import "./cart.css";
import CartItemCard from "./cartItemCard";
import {useDispatch,useSelector} from "react-redux"
import { addItemsToCart,removeFromCart } from '../../action/cartAction';
import RemoveShoppingCartIcon from '@mui/icons-material/RemoveShoppingCart'; 
import { Typography } from '@mui/material';
import {Link, useNavigate} from "react-router-dom";

const Cart = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {cartItems} = useSelector(state => state.cart)
  const {name} = useSelector(state => state.user);

  let grossTotal  = 0;
  for(let i=0;i<cartItems.length;i++)
  {
    grossTotal=grossTotal + cartItems[i].quantity*cartItems[i].price;
  }

  // static data just for test
  // const item ={
  //   product_id:"ALLU",
  //   price : 20,
  //   name : "HAlla BOl",
  //   quantity : 7,
  //   image : `https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg`
  // }

  const increaseQuantity = (id,quantity,stock) =>
  {
        const newQty = quantity + 1;
        if(stock <= quantity)
          return;
        dispatch(addItemsToCart(id,newQty))
  }

  const decreaseQuantity = (id,quantity,stock) =>
  {
        const newQty = quantity - 1;
        if(quantity <= 1)
          return;
        dispatch(addItemsToCart(id,newQty))
  }

  const deleteCartItem = (id) =>{
      dispatch(removeFromCart(id));
  }

  const checkOutHandler = () =>{
      navigate("/shipping");
  }

  return (
    <Fragment>
      {cartItems.length === 0 ? 
      
        <div className="emptyCart">
            <RemoveShoppingCartIcon/>
            <Typography>No Product In Your Cart</Typography>
            <Link to="/products"> Go To Product Page</Link>
        </div>
      :<Fragment>  
        <div className="cartContainer">
          <div className="cartHeader">
            <p>Product</p>
            <p>Quantity</p>
            <p>Subtotal</p>
          </div>

          {cartItems && cartItems.map((item)=>
          (
            <div className="cartData" key={item.product_id}>
              <CartItemCard item={item} deleteCartItem={deleteCartItem} />
              <div className="cardInput">
                <button onClick={()=>decreaseQuantity(item.product_id,item.quantity,item.quantityFromDB)}>-</button>
                <input readOnly type="number" value={item.quantity}/>
                <button onClick={()=>increaseQuantity(item.product_id,item.quantity,item.quantityFromDB)}>+</button>
              </div>
              <p className='CartSubtotal' >{`₹${item.price*item.quantity}`}</p>
          </div>
          ))}

          <div className="totalPrice">
            <div></div>
            <div className='totalPriceBox'>
                <p>Gross Total</p>
                <p>{`₹${grossTotal}`}</p>
            </div>
            <div></div>
            <div className="checkOutBtn">
              <button onClick={checkOutHandler} >Check Out</button>
            </div>
          </div>
        </div>
        </Fragment>

      }
    </Fragment>
  )
}

export default Cart 