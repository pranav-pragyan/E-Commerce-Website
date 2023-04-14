import React, { Fragment } from 'react'
import "./confirmOrder.css"
import CheckoutSteps from './checkoutSteps'
import {useSelector} from "react-redux";
import Metadata from '../Layout/metadata';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@material-ui/core';


const ConfirmOrder = () => {

  const navigate = useNavigate();
  const {shippingInfo,cartItems} = useSelector(state=>state.cart);
  const {name} = useSelector(state=>state.userLoad);

  let subtotal  = 0;
  for(let i=0;i<cartItems.length;i++)
  {
    subtotal=subtotal + cartItems[i].quantity*cartItems[i].price;
  }

  const shippingCharges  = subtotal > 500 ? 0 : 100;
  const Tax = subtotal*0.18; // GST == 18%
  const totalPrice = subtotal + shippingCharges + Tax;

  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pincode},${shippingInfo.country}`

  const proceedPaymentHandler = () =>{
    const data = {subtotal, shippingCharges,Tax,totalPrice};
    sessionStorage.setItem("orderInfo",JSON.stringify(data));
    navigate("/order/payment");
  }
  
  return (
      <Fragment>
        <Metadata title="Confirm Order"/>
        <CheckoutSteps activeStep={1}/>
        <div className="confirmOrderPage">
          <div>
            <div className="confirmShippingAdd">
              <Typography>Shipping Information</Typography>
              <div className='confirmShippingAddBox'>
                  <div>
                    <p>Name :</p>
                    <span>{name}</span>
                  </div>
                  <div>
                    <p>Phone No :</p>
                    <span>{shippingInfo.phoneno}</span>
                  </div>
                  <div>
                    <p>Address :</p>
                    <span>{address}</span>
                  </div>
              </div>
            </div>
            <div className="confirmCartItem">
              <Typography>Your Cart Item : </Typography>
              <div className="confirmCartItemsContainer">
                {cartItems && cartItems.map((item)=>(
                  <div key={item.product_id}> 
                      <img src={item.image} alt="Product Image" />
                      <Link to={`/product/${item.product_id}`}>{item.name}</Link>
                      <span>
                        {item.quantity} X ₹{item.price} = <b>₹{item.quantity*item.price}</b>
                      </span>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          
          <div>
            <div className="orderSummery">
              <Typography>Order Summary</Typography>
              <div>
                <div>
                  <p>Subtotal :</p>
                  <span>₹{subtotal}</span>
                </div>
                <div>
                  <p>Shipping Charge :</p>
                  <span>₹{shippingCharges}</span>
                </div>
                <div>
                  <p>GST :</p>
                  <span>₹{Tax}</span>
                </div>
              </div>
              <div className="orderSummaryTotal">
                <p> <b>Total :</b> </p>
                <span>₹{totalPrice}</span>
              </div>
              <button onClick={proceedPaymentHandler}>Proceed To Payment</button>
            </div>
          </div>
        </div>
    </Fragment>
  )
}

export default ConfirmOrder