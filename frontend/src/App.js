import './App.css';
import React,{ useState,useEffect }  from 'react';
import Header from './component/Layout/Header'
import Footer from './component/Layout/Footer'
import Home from './component/Home/home'
import { BrowserRouter as Router, Route, Routes} from 'react-router-dom';
import ProductDetail from "./component/ProductDetail/productDetail"
import Products from "./component/Products/Products"
import Login from './component/Home/login';
import Register from './component/Home/register';
import store from "./reduxStore"
import { loadUser } from './action/userAction';
import { useSelector } from 'react-redux';
import Dashboard from "./component/admin/Dashboard"
import Profile from "./component/profile/profile"
import UpdateProfile from "./component/profile/updateProfile"
import Cart from "./component/cart/cart"
import Shipping from "./component/cart/shipping"
import ConfirmOrder from "./component/cart/ConfirmOrder"
import Payment from "./component/cart/Payment"
import axios from 'axios';
// to use stripe functions below modules are required...
import {Elements} from "@stripe/react-stripe-js";
import {loadStripe} from "@stripe/stripe-js"
import AdminProducts from "./component/admin/AdminProducts"
import AddProduct from './component/admin/AddProduct';
import UpdateProduct from "./component/admin/UpdateProduct"
import AllUserDetails from "./component/admin/AllUserDetails";
import UpdateUser from "./component/admin/UpdateUser";
import AllOrderDetail from "./component/admin/AllOrderDetail";
import UpdateOrder from "./component/admin/UpdateOrder";
import MyOrder from "./component/cart/MyOrder";
import OrderDetail from "./component/cart/OrderDetail";
import OrderSuccess from './component/cart/OrderSuccess';
function App()
{
  // const [stripeApiKey, setStripeApiKey] = useState("");
  
  // async function getStripeAPIKey(){
  //   const {data} = await axios.get("/api/stripeapikey");
  //   setStripeApiKey(data.stripeApiKey);
  // }
  const stripeApiKey = "pk_test_51LBQWjSJvj2OLGD61Y9g7ikvIC7OIMiFJYU1MsY3JJg3NZWUwA3dz7wtcEABYCmqq2F7MeCQ0Fo9jxTOEvWrHBDN00w0vzWrMT";
    useEffect(()=>{
      store.dispatch(loadUser());
     // getStripeAPIKey();
  },[])

  const {name,isAuthenticatedUser,user,role} = useSelector(state => state.userLoad);

  const isAdmin = role === "admin" ? true : false;
  // alert(isAdmin);
  return(
    <>
    <Router>
      <Header name={name} role={role} isAuth={isAuthenticatedUser}/>
      {/* {isAuthenticatedUser && <UserOption user={user}/>} */}
      <Routes>
        <Route exact path='/' element={<Home/>}/>
        <Route exact path='/product/:id' element={<ProductDetail/>}/>
        <Route exact path='/products' element={<Products/>}/>
        <Route  path='/products/:keyword' element={<Products/>}/>
        <Route exact path='/login' element={<Login/>}/>
        <Route exact path='/register' element={<Register/>}/>
        {isAuthenticatedUser && <Route exact path='/me' element={<Profile/>}/>}
        {isAuthenticatedUser && <Route exact path='/me/update' element={<UpdateProfile/>}/>}
        {isAuthenticatedUser && <Route exact path='/cart' element={<Cart/>}/>}
        {isAuthenticatedUser && <Route exact path='/shipping' element={<Shipping/>}/>}
        {isAuthenticatedUser && <Route exact path='/order/confirm' element={<ConfirmOrder/>}/>}
        {isAuthenticatedUser && <Route exact path='/order/payment' element={stripeApiKey && 
          <Elements stripe={loadStripe(stripeApiKey)}> <Payment/> </Elements>}/>}
        
        {isAuthenticatedUser && <Route exact path='/success' element={<OrderSuccess/>}/>}
        {isAuthenticatedUser && <Route exact path='/order' element={<MyOrder/>}/>}
        {isAuthenticatedUser && <Route exact path='/order/:id' element={<OrderDetail/>}/>}    
        {isAuthenticatedUser && isAdmin && <Route exact path='/admin/dashboard' element={<Dashboard/>}/>}
        {isAuthenticatedUser && isAdmin && <Route exact path='/admin/products' element={<AdminProducts/>}/>}
        {isAuthenticatedUser && isAdmin && <Route exact path='/admin/addproduct' element={<AddProduct/>}/>}
        {isAuthenticatedUser && isAdmin && <Route exact path='/admin/products/admin/product/:id' element={<UpdateProduct/>}/>}
        {isAuthenticatedUser && isAdmin && <Route exact path='/admin/users' element={<AllUserDetails/>}/>}
        {isAuthenticatedUser && isAdmin && <Route exact path='/admin/users/admin/user/:id' element={<UpdateUser/>}/>}
        {isAuthenticatedUser && isAdmin && <Route exact path='/admin/orders' element={<AllOrderDetail/>}/>}
        {isAuthenticatedUser && isAdmin && <Route exact path='/admin/orders/admin/order/:id' element={<UpdateOrder/>}/>}
      </Routes>
      <Footer/>
    </Router>
    </>
    
  );
}

export default App;
