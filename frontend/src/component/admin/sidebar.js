import React from 'react'
import "./sidebar.css"
import { Link } from 'react-router-dom'
// import {TreeView, TreeItem} from "react-treeview"
import HomeIcon from '@mui/icons-material/Home';
import AddIcon from '@mui/icons-material/Add';
import Inventory2Icon from '@mui/icons-material/Inventory2';
import ImportExportIcon from '@mui/icons-material/ImportExport';
import ListAltIcon from '@mui/icons-material/ListAlt';
import DashboardIcon from '@mui/icons-material/Dashboard';
import PeopleIcon from '@mui/icons-material/People';
import RateReviewIcon from '@mui/icons-material/RateReview';

export default function sidebar() {
  return (
    <div className='sidebar'>
      <Link to="/">
        <HomeIcon/>
      </Link>
      <Link to="/admin/dashboard">
        <p> <DashboardIcon/> dashboard</p>      
      </Link>
      <Link to="/admin/products"> 
        <p> <Inventory2Icon/> Products</p>
      </Link>
      <Link to="/admin/addproduct">
       <p> <AddIcon/> Add Product </p> 
      </Link>
      <Link to="/admin/orders"> 
        <p> <ListAltIcon/> Order </p> 
      </Link>
      <Link to="/admin/users"> 
         <p> <PeopleIcon/> User</p> 
      </Link>
      <Link to="/admin/Review"> 
        <p> <RateReviewIcon/> Review</p> 
      </Link>
    </div>
  )
}