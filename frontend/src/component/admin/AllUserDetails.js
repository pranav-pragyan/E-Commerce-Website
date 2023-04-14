import React, { Fragment,useEffect } from 'react';
import "./adminProducts.css";
import Sidebar from './sidebar.js';
import {useDispatch,useSelector} from "react-redux";
import {allUsersDetails,deleteUSER} from "../../action/userAction";
import {Link, useNavigate,useParams} from "react-router-dom";
import MetaData from "../Layout/metadata";
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Button } from '@mui/material';
import {DataGrid} from "@mui/x-data-grid";
import { DELETE_USER_RESET } from '../../constants/userConstant';

const AllUserDetails = () => {

  const dispatch = useDispatch();
  const navigate = useNavigate();
  // const {id}  = useParams();
  // const {error,products,} = useSelector(state=>state.productsAdmin);
  const {delError,delMessage,delSuccess} = useSelector(state=>state.deleteUser);
  const {error,users} = useSelector(state=>state.usersDetail);
  
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
      dispatch({type:DELETE_USER_RESET});
    }
      
    dispatch(allUsersDetails());
  },[dispatch,error]);

  // alert(JSON.stringify(products));

  const deleteUserHandler  = (id) =>{
      dispatch(deleteUSER(id));
  }


  // required for columns grid creation...
  const columns = [
    {field:"id", headerName:"User ID",minWidth:40,flex:0.2},
    {field:"name", headerName:"Name",minWidth:250,flex:1},
    {field:"email", headerName:"Email",minWidth:250,flex:0.3},
    {field:"role", headerName:" Role",minWidth:270,flex:0.5},
    {field:"actions", headerName:"Actions",type:"number",minWidth:155,flex:0.3,sortable:false,
    renderCell : (params) =>{
      return (
        <Fragment>
          <Link to={`admin/user/${params.getValue(params.id,"id")}`}>
            <EditIcon/>
          </Link>
          <Button onClick={()=>deleteUserHandler(params.getValue(params.id,"id"))}>
            <DeleteIcon/>
          </Button>
        </Fragment>
      )
    }}
  ]
  const rows  =[];

  if(users)
  {
    for(let i=0;i<users.length;i++)
    {
      rows.push({
        id : users[i]._id,
        name  : users[i].name,
        email : users[i].email,
        role : users[i].role,
      })
    }
  }

  return (
    <Fragment>
      <MetaData title="Admin Users List"/>
      <div className="dashboard">
        <Sidebar/>
        <div className="productListContainer">
          <h1 id="productListID">All users</h1>
          <DataGrid rows={rows} columns={columns} pageSize={10} disableSelectionOnClick className="productListTable" autoHeight />
        </div>
      </div>
    </Fragment>
  )
}

export default AllUserDetails;