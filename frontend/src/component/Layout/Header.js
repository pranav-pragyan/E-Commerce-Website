import React,{ useState }  from 'react';
import './Header.css';
import SearchIcon from "@material-ui/icons/Search"
import ShoppingCartIcon from '@material-ui/icons/ShoppingCart';
import logo from '../../../src/image/Enigmaticomm-logos_white.png'
import { useNavigate} from "react-router-dom";
import { logout } from '../../action/userAction';
import {useDispatch,useSelector} from "react-redux";

const Header = (props) => {

  const dispatch = useDispatch();
  const [keyword,setKeyword] = useState("");
  const navigate = useNavigate();  // to get data from link

  
  const searchSubmitHandler = (event) =>{
      event.preventDefault() ; // to avoid reload during form submission

      if(keyword.trim())
      {
        navigate(`/products/${keyword}`);
      }
      else{
        navigate("/products");
      }
  };


  const userLogout = (e) =>{
    e.preventDefault();
    dispatch(logout());
  }

  const {message} = useSelector(state=>state.userLogout)

  if(message)
    alert(message);

  return (
    <div className='header'>
      <a href="/"> <img className='header_logo' src={logo} alt="company_logo" /> </a>
      {/* <h3 className='headerLogo'>Enignmaticomm</h3> */}

      <form className="headerSearh" action="/search" onSubmit={searchSubmitHandler} >
          <input className='headerSearchBar' type="text" placeholder='Search Product...' onChange={(event)=>setKeyword(event.target.value)}/>
          <input type="submit" className='searchIcon' value="search"/>
      </form>
      <div className="headerNav">
          <div className="signin">
            <span className='option1'>{props.name ? props.name : "Hello Guest"}</span>
            <span className='option2'>  
                <div className="dropdown">
                    <p className="dropP">Account</p>
                      <div className="dropdown-content">
                        <a href="/login">Sign In</a>
                        <a href="/register">Sign Up</a>
                        <a href="/me">Profile</a>
                        {props.isAuth && <a href="#" onClick={userLogout}>Log Out</a>}
                        {props.role && <a href="/admin/dashboard">Dashboard</a> }
                        {/* {props.role==="admin" ? <a href="/admin/dashboard">Dashboard</a> : <a href="#">Dashboard</a> } */}
                      </div>
                  </div> 
              </span>
          </div>

          <div className="Cart">
            <span className='option1'>Return</span>
            <span className='option2'><a className='order' href="/order">& Order</a></span>
          </div>

          <div className="Cart"> 
            <a className='order' href="/cart"> <ShoppingCartIcon className='cartIcon'/> </a>
          </div>

      </div>
    </div>
    
    
        
  )
}

export default Header


//<a className='login' href="/login">Sign In</a>