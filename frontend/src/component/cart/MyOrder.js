import React,{Fragment,useEffect} from 'react'
import {DataGrid} from "@mui/x-data-grid";
import MetaData from "../Layout/metadata"
import {myOrderDetails} from "../../action/orderAction";
import {useDispatch,useSelector} from "react-redux";
import DeleteIcon from '@mui/icons-material/Delete';
import LaunchIcon from '@mui/icons-material/Launch';
import { Button } from '@mui/material';
import { Link } from 'react-router-dom';


const MyOrder = () => {

   const dispatch = useDispatch();
   const {orders,success,error} = useSelector(state=>state.myOrder);
   const {name} = useSelector(state=>state.userLoad);


   useEffect(()=>{
    if(error)
      alert("Orders Could not be fetched");

       dispatch(myOrderDetails());
   },[dispatch,error]);

   // required for columns grid creation...
   const columns = [
    {field:"id", headerName:"Order ID",minWidth:300,flex:1,},
    {field:"status", headerName:"Status",minWidth:150,flex:0.5},
    {field:"quantity", headerName:"Quantity",type:"number",minWidth:150,flex:0.3},
    {field:"amount", headerName:"Amount",type:"number",minWidth:150,flex:0.5},
    {field:"actions", headerName:"Actions",type:"number",minWidth:150,flex:0.3,sortable:false,
    renderCell : (params) =>{
      return (
        <Fragment>
          <Link to={`/order/${params.getValue(params.id,"id")}`}> <LaunchIcon/> </Link>
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
      <MetaData title="My Orders"/>
      <div >
        <div className="productListContainer">
          <h1 id="productListID" style={{padding : "10px", fontFamily:"cursive"}}>{`${name.toUpperCase()}'S ORDERS`} </h1>
          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight />
        </div>
      </div>
    </Fragment>
  )
}

export default MyOrder