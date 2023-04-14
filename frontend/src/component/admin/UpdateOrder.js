import React, { Fragment, useEffect } from 'react'
import "./updateOrder.css"
import {useDispatch, useSelector} from "react-redux";
import { Link, useNavigate,useParams } from 'react-router-dom';
import { Typography } from '@material-ui/core';
import Sidebar from './sidebar.js';
import MetaData from "../Layout/metadata"
import { useState } from 'react';
import { Button } from '@mui/material';
import Loading from '../Loading/loading';
import {getOrderDetail,updateORDER} from "../../action/orderAction";

const UpdateOrder = () => {

  const navigate = useNavigate();
  const dispatch = useDispatch();
  const { id } = useParams();
  const {shippingInfo,cartItems} = useSelector(state=>state.cart);
  const {name} = useSelector(state=>state.userLoad);
  const {order} = JSON.parse(localStorage.getItem("orderDetail"));
  const {updateOrderMessage,loading} = useSelector(state=>state.updateOrder);
  let subtotal  = 0;
  for(let i=0;i<cartItems.length;i++)
  {
    subtotal=subtotal + cartItems[i].quantity*cartItems[i].price;
  }

  const statusOption = ["Yet to dispatch","dispatched","delivered"]

  const shippingCharges  = subtotal > 500 ? 0 : 100;
  const Tax = subtotal*0.18; // GST == 18%
  const totalPrice = subtotal + shippingCharges + Tax;

  const address = `${shippingInfo.address},${shippingInfo.city},${shippingInfo.state},${shippingInfo.pincode},${shippingInfo.country}`

  useEffect(()=>{
    dispatch(getOrderDetail(id));

  },[dispatch])

  const [status,setStatus] = useState();
  
  const updateStatusSubmitHandler =()=>{
      updateORDER(id,status);

      // alert(updateOrderMessage);
  }
  return (

    <Fragment>
      {/* {loading ? <MetaData title={"Add New Product"}/>: */}
        <Fragment>
        <MetaData title={"Add New Product"}/>
        <div className="dashboard">
          <Sidebar/>
          <div className="addProductContainer">
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
                  <Typography>Ordered Items : </Typography>
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
                <form className='orderUpdateForm' encType='multipart/form-data' onSubmit={updateStatusSubmitHandler} >
                  <h1 id='addProductHeading'>Update Status</h1>
                  <div>
                    <p>Current Status : {order.orderStatus}</p>
                  </div>
                  <div>
                  <select required value={status} onChange={(e)=>setStatus(e.target.value)} >
                    <option>status</option>
                    {statusOption && statusOption.map((st)=>(
                      <option key={st} value={st}>{st}</option>
                    ))}
                    </select>
                  </div>
                  <Button id="updateOrderBtn" type='submit' disabled={loading ? true : false} > UPDATE STATUS</Button>
              </form>
              </div>
            </div>
          </div>
        </div>
      </Fragment>
    {/* } */}
    </Fragment>
      
  )
}

export default UpdateOrder;