import React, { Fragment,useEffect } from 'react';
import "./adminProducts.css";
import Sidebar from './sidebar.js';
import {useDispatch,useSelector} from "react-redux";
import {getAllOrderDetails,deleteORDER} from "../../action/orderAction";
import {Link, useNavigate} from "react-router-dom";
import MetaData from "../Layout/metadata";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import {DataGrid} from "@mui/x-data-grid";
import { DELETE_ORDER_RESET } from '../../constants/orderConstant';

const AllOrderDetails = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {orders} = useSelector(state=>state.allOrders);
  const {delError,delMessage,delSuccess} = useSelector(state=>state.deleteOrder);
  
  useEffect(()=>{
    if(delError)
      alert(delError);
    if(delMessage)
      alert(delMessage);
    if(delSuccess)
    {
      navigate("/admin/dashboard");
      dispatch({type:DELETE_ORDER_RESET});
    }
      
    dispatch(getAllOrderDetails());
  },[dispatch,navigate,delError,delMessage,delSuccess]);

  // alert(JSON.stringify(products));

  const deleteOrderHandler = (id) =>{
      dispatch(deleteORDER(id));
  }
  

  // required for columns grid creation...
  const columns = [
    {field:"id", headerName:"Order ID",minWidth:250,flex:1},
    {field:"status", headerName:"Status",minWidth:150,flex:0.5},
    {field:"quantity", headerName:"Quantity",type:"number",minWidth:150,flex:0.3},
    {field:"amount", headerName:"Amount",type:"number",minWidth:270,flex:0.5},
    {field:"actions", headerName:"Actions",type:"number",minWidth:150,flex:0.3,sortable:false,
    renderCell : (params) =>{
      return (
        <Fragment>
          <Link to={`admin/order/${params.getValue(params.id,"id")}`}>
            <EditIcon/>
          </Link>
          <Button onClick={()=>deleteOrderHandler(params.getValue(params.id,"id"))}>
            <DeleteIcon/>
          </Button>
        </Fragment>
      )
    }}
  ]
  const rows  =[];

  if(orders)
  {
    for(let i=0;i<orders.length;i++)
    {
      rows.push({
        id : orders[i]._id,
        status : orders[i].orderStatus,
        quantity : orders[i].orderItems.length,
        amount : orders[i].totalPrice,
      })
    }
  }

  return (
    <Fragment>
      <MetaData title="Admin Order List"/>
      <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
          <h1 id="productListID">All Orders</h1>
          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight />
        </div>
      </div>
    </Fragment>
  )
}

export default AllOrderDetails;