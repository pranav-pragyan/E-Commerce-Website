import React, { Fragment,useEffect } from 'react';
import Sidebar from './sidebar.js';
import "./dashboard.css"
import { Link } from 'react-router-dom';
import {useSelector,useDispatch} from "react-redux"
import {getProductAdmin} from "../../action/productAction";

const Dashboard = () => 
{
  const dispatch = useDispatch();
  const {products} = useSelector(state=>state.productsAdmin);
  const {users} = useSelector(state=>state.usersDetail);
  const {orders,totalAmount} = useSelector(state=>state.allOrders);
  
  let outOfStockProducts = 0;
  
  if(products)
  {
    for(let i=0;i<products.length;i++)
    {
      if(products[i].quantity===0)
        outOfStockProducts+=1;
    }
  }
  useEffect(()=>{
    dispatch(getProductAdmin());
  },[dispatch])

  return (   
    <div className='dashboard'>
      <Sidebar/>
      <div className="dashboardContainer">
          <h1 className='heading'> Admin Dashboard</h1>
          <div className="dashboardSummary">
            <div>
              <p>
                Total Amount <br /> {totalAmount}
              </p>
            </div>
            <div className="dashboardsummary2">
              <Link to="/admin/products" >
                <p>Products</p>
                <p>{products && products.length}</p>
                <p id='outOfStock'>{`(out of stock : ${outOfStockProducts})`}</p>
              </Link>

              <Link to="/admin/orders" >
                <p>Orders</p>
                <p>{orders.length}</p>
              </Link>

              <Link to="/admin/users" >
                <p>Users</p>
                <p>{users.length}</p>
              </Link>
            </div>
          </div>
      </div>
    </div>
    
  )
}

export default Dashboard;


{/* <div className="totalAmount commonProperty">
            Total Amount : 200 
          </div>

          <div className="totalUsers commonProperty">
            Total Users : 200 
          </div>

          <div className="totalOrders commonProperty">
            Total Orders : 200 
          </div>

          <div className="totalProducts commonProperty">
            Total Products : 200 
          </div> */}