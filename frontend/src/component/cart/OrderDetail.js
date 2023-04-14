import React, { Fragment,useEffect,useState } from 'react'
import "./OrderDetail.css";
import {getOrderDetail} from "../../action/orderAction";
import {useSelector,useDispatch} from "react-redux"
import {Link, useParams} from "react-router-dom"
import Metadata from '../Layout/metadata';
import { Typography } from '@mui/material';
const OrderDetail = () => {

  const { id } = useParams();
  const dispatch = useDispatch();
  // const {order,error} = useSelector(state=>state.orderDetail);

  const {order} = JSON.parse(localStorage.getItem("orderDetail"))


  useEffect(()=>{

    
    // if(error)
    //   alert(error);
    dispatch(getOrderDetail(id));
  },[dispatch]);


  return (
    <Fragment>
      <Metadata title="Order Details"/>
        <div className="orderDetailPage">
          <div className="orderDetailContainer">
            <h2>Order #{order && order._id}</h2>
            <Typography>Shipping Info</Typography>
            <div className="orderDetailContainerBox">
              <div>
                <p>Name :</p>
                <span>{order.user.name}</span>
              </div>
              <div>
                <p>Phone :</p>
                <span>{order.shippingInfo.mobileNum}</span>
              </div>
              <div>
                <p>Address :</p>
                <span>{order.shippingInfo.landmark}, {order.shippingInfo.city}, {order.shippingInfo.state}, {order.shippingInfo.pincode}, {order.shippingInfo.country}</span>
              </div>
            </div>
            <Typography>Payment Details</Typography>
            <div className="orderDetailContainerBox2">
              <div>
                <div>
                  <p className={order.paymentInfo.status==="successful"?"greenColor" : "redColor"}>{order.paymentInfo.status==="successful" ? "PAID":"PAID"}</p>
                </div>
                <div>
                  <p>Amount :</p>
                  <span>{order.totalPrice}</span>
              </div>
              </div>
            </div>
            <Typography>Order Status</Typography>
            <div className="orderDetailContainerBox2">
              <div>
                  <p className={order.orderStatus==="delivered"?"greenColor" : "redColor"}>{order.orderStatus}</p>
              </div>
            </div>
          </div>
          <div className="orderDetailsCartItems">
            <Typography>Order Items:</Typography>
            <div className='orderDetailsCartItemsContainer'>
                  {order.orderItems && order.orderItems.map((item)=>(
                    <div key={item.productId}>
                        <img src={item.image} alt="image" />
                        <Link to={`/product/${item.productId}`} >{item.productName}</Link>
                        {item.quantity} X ₹{item.price} = <b>₹{item.quantity*item.price}</b>
                    </div>
                  ))}
            </div>
          </div>
        </div>
    </Fragment>
  )
}

export default OrderDetail