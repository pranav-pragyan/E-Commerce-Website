import React, {useRef, useState} from 'react'
import "./login.css"
import Loading from '../Loading/loading'
import EmailIcon from '@mui/icons-material/Email';
import LockIcon from '@mui/icons-material/Lock';
import AccountCircleIcon from '@mui/icons-material/AccountCircle';
import {useDispatch,useSelector} from "react-redux"
import { registration } from '../../action/userAction';

const Register = () => {

  const dispatch = useDispatch();

  const [name, setName] = useState("")
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  
  // const [user,setUser] = useState({name : "",email : "", password : ""});
  // const {name, email,password} = user;
  //  const [avatar,setAvatar] = useState();
  //  const [avatarPreview,setAvatarPreview] = useState("/profile.png");


  const registerSubmit = (e) =>{
    e.preventDefault();
    dispatch(registration(name,email,password));
    }


    // const registerDataChange = (e) =>
    // {
      
    //     setUser({...user, [e.target.name] : e.target.value});
    // }

    const {loading, message,regUser} = useSelector(state => state.userReg);

    if(message)
      alert(message)
    

  return (
    <>
      <div className="loginContainer">

        <div className="loginBox">
            <p>Register</p>
        </div>
        <form className='loginForm' onSubmit={registerSubmit} >

            <div className="loginName">
                <AccountCircleIcon/>
                <input type="text" placeholder='Name' required value={name} onChange={(e)=>setName(e.target.value)} />
             </div>
             <div className="loginEmail">
               <EmailIcon/>
               <input type="email" placeholder='Email' required value={email} onChange={(e)=>setEmail(e.target.value)} />
             </div>

             <div className="loginPassword">
               <LockIcon/>
               <input type="password" placeholder='Password' required value={password} autoComplete="false" onChange={(e)=>setPassword(e.target.value)} />
             </div>
            <input type="submit" value="Register" className="loginButton" /> 
        </form>
        
      </div>
    </>
  )
}

export default Register


//disabled={Loading  ? true : false}