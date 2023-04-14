import React, { Fragment,useEffect } from 'react';
import "./adminProducts.css";
import Sidebar from './sidebar.js';
import {useDispatch,useSelector} from "react-redux";
import {getProductAdmin,deleteProduct} from "../../action/productAction";
import {Link, useNavigate} from "react-router-dom";
import MetaData from "../Layout/metadata";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import {DataGrid} from "@mui/x-data-grid";
import { DELETE_PRODUCT_RESET } from '../../constants/productConstants';

const AdminProducts = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const {error,products,} = useSelector(state=>state.productsAdmin);
  const {delError,delMessage,delSuccess} = useSelector(state=>state.deleteProduct);
  
  useEffect(()=>{
    if(error)
      alert(error);
    if(delError)
      alert(delError);
    if(delMessage)
      alert(delMessage);
    if(delSuccess)
    {
      navigate("/admin/dashboard");
      dispatch({type:DELETE_PRODUCT_RESET});
    }
      
    dispatch(getProductAdmin());
  },[dispatch,error,delError,delMessage,delSuccess,navigate]);

  // alert(JSON.stringify(products));

  const deleteProductHandler  = (id) =>{
      dispatch(deleteProduct(id));
  }
  

  // required for columns grid creation...
  const columns = [
    {field:"id", headerName:"Product ID",minWidth:220,flex:0.5},
    {field:"name", headerName:"Name",minWidth:350,flex:1},
    {field:"quantity", headerName:"Quantity",type:"number",minWidth:150,flex:0.3},
    {field:"price", headerName:"Price",type:"number",minWidth:270,flex:0.5},
    {field:"actions", headerName:"Actions",type:"number",minWidth:155,flex:0.3,sortable:false,
    renderCell : (params) =>{
      return (
        <Fragment>
          <Link to={`admin/product/${params.getValue(params.id,"id")}`}>
            <EditIcon/>
          </Link>
          <Button onClick={()=>deleteProductHandler(params.getValue(params.id,"id"))}>
            <DeleteIcon/>
          </Button>
        </Fragment>
      )
    }}
  ]
  const rows  =[];

  if(products)
  {
    for(let i=0;i<products.length;i++)
    {
      rows.push({
        id : products[i]._id,
        quantity : products[i].quantity,
        price : products[i].price,
        name  : products[i].name,
      })
    }
  }

  return (
    <Fragment>
      <MetaData title="Admin Products List"/>
      <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
          <h1 id="productListID">All Products</h1>
          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight />
        </div>
      </div>
    </Fragment>
  )
}

export default AdminProducts