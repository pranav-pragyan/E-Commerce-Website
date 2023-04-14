import React, {useEffect, useRef, useState} from 'react'
import "./login.css"
import Loading from '../Loading/loading'
import {Link} from "react-router-dom"
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import {login, clearError} from "../../action/userAction"
import {useDispatch,useSelector} from "react-redux";
const Login = () => {


  const dispatch = useDispatch();

  const [loginEmail, setLoginEmail] = useState("");
  const [loginPassword, setLoginPassword] = useState("");

  const loginSubmit = (e) =>{
    e.preventDefault();
    dispatch(login(loginEmail,loginPassword));
  }

  const {loading, test} = useSelector(state => state.user)
  // alert("hii");
  useEffect(() =>{

    if(test)
    {
      alert("Invalid Username or Password");
      dispatch(clearError);
    }
  },[dispatch,test,alert])
  

  return (
    <>
     <div>
     {loading ? <Loading/> :
        <div className="loginContainer">

        <div className="loginBox">
            <p>Login</p>
        </div>
        <form className='loginForm' onSubmit={loginSubmit}>
             <div className="loginEmail">
               <EmailIcon/>
               <input type="email" placeholder='Email' required value={loginEmail} onChange={(e)=>setLoginEmail(e.target.value)} />
             </div>

             <div className="loginPassword">
               <LockIcon/>
               <input type="password" placeholder='Password' required value={loginPassword} onChange={(e)=>setLoginPassword(e.target.value)} />
             </div>
            <Link className='forgotPassword' to="/password/forgot">Forgot Password</Link>
            <Link className='register' to="/register">Register Yourself</Link>
            <input type="submit" value="login" className="loginButton" /> 
        </form>
        
        
      </div>}
     </div>
    </>
  )
}

export default Login