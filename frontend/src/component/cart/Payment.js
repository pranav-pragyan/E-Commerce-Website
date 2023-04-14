import React, { Fragment,useEffect,useRef } from 'react'
import "./payment.css"
import CheckoutSteps from './checkoutSteps'
import {useSelector,useDispatch} from "react-redux";
import Metadata from '../Layout/metadata';
import { Link, useNavigate } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import {CardNumberElement,CardCvcElement,CardExpiryElement,useStripe,useElements} from "@stripe/react-stripe-js"
import axios from "axios";
import CreditCardIcon from '@mui/icons-material/CreditCard';
import EventIcon from '@mui/icons-material/Event';
import VpnKeyIcon from '@mui/icons-material/VpnKey';
import {createNewOrder,clearErrors} from "../../action/orderAction";

const Payment = () => {

  const orderInfo = JSON.parse(sessionStorage.getItem("orderInfo"));

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const stripe = useStripe();
  const elements = useElements();
  const paymentBtn = useRef(null);
  const {shippingInfo,cartItems} = useSelector(state=>state.cart);
  const {user} = useSelector(state=>state.userLoad);
  const {error} = useSelector(state=>state.newOrder);

  const paymentData = {
    amount : Math.round(orderInfo.totalPrice*100), // stripe take amount in paisa. So amount is multiplied by 100.
  }

  const orderData = {shippingInfo,
                     orderItems : cartItems,
                     totalProductPrice : orderInfo.subtotal,
                     totalTax:orderInfo.Tax,
                     shippingTax:orderInfo.shippingCharges, 
                     totalPrice:orderInfo.totalPrice, }
  const submitHandler = async (e) =>
  {
    e.preventDefault();
    paymentBtn.current.disabled = true; 

    // try
    // {
      // const {data} = await axios.post("/api/login", {email, password}, config);
      const config = {headers : {"Content-Type" : "application/json"}};    
      const {data} = await axios.post("/api/payment/proccess",paymentData,config);
      const client_secret = data.client_secret;

      if(data.success)
      {
            // alert(data.client_secret);
            // check condition payment process is working properly
          if(!stripe || !elements) return;

          const result = await stripe.confirmCardPayment(client_secret,{
            payment_method :{ 
              card : elements.getElement(CardNumberElement), 
              billing_details : {
                name : user.name,
                email : user.email,
                address :{
                  line1 : shippingInfo.address,
                  city : shippingInfo.city,
                  state : shippingInfo.state,
                  postal_code : shippingInfo.pincode,
                  country : shippingInfo.country
                },

              }
            }
          });

          if(result.error)
          {
            paymentBtn.current.disabled = false;
            alert(result.error.message);
          }
          else
          {
              if(result.paymentIntent.status === "succeeded")
              {
                orderData.paymentInfo={
                  id : result.paymentIntent.id,
                  status : result.paymentIntent.status,
                }
                dispatch(createNewOrder(orderData));
                // alert(JSON.stringify(orderData));
                
                navigate("/success");
              }
              else
              {
                alert("There is some issue while processing the payment");
              }
          }
      }  
      else
      {
        paymentBtn.current.disabled = false; 
        alert("Something Went Wrong");
      }
      
    // } 
    // catch (error)
    // {
    //     paymentBtn.current.disabled = false; 
    //     alert(error.reponse.data.message); 
    // }
  };

  useEffect(()=>{
      if(error)
      {
        alert("Order creation falied");
        dispatch(clearErrors());
      }
       
  },[dispatch,error,alert])

  return (
    <Fragment>
      <Metadata title="Payment"/>
      <CheckoutSteps activeStep={2}/>
      <div className="paymentContainer">
        <form className='paymentForm' onSubmit={(e)=>submitHandler(e)} >
          <Typography>Card Info</Typography>
          <div>
            <CreditCardIcon/>
            <CardNumberElement className='paymentInput'/>
          </div>

          <div>
            <EventIcon/>
            <CardExpiryElement className='paymentInput'/>
          </div>  

          <div>
            <VpnKeyIcon/>
            <CardCvcElement className='paymentInput'/>
          </div>

          <input type="submit" value={`Pay  ₹${orderInfo && orderInfo.totalPrice}`} ref={paymentBtn} className="paymentFormBtn"/>
        </form>
      </div>
    </Fragment>
  )
}

export default Payment;